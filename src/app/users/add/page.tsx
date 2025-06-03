"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { User } from "../../types/user";

export default function AddUserPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !age || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter valid name, email, and age.");
      return;
    }

    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email, age: Number(age) }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/users");
    } else {
      setError("Failed to add user.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Add New User</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email Address"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          className="w-full border px-3 py-2 rounded"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add User
        </button>
      </form>
    </div>
  );
}
