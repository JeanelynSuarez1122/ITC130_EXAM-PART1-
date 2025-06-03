"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { User } from "../../types/user";

export default function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data: User[]) => {
        const found = data.find((u) => u.id === id);
        if (found) setUser(found);
      });
  }, [id]);

  if (!user) return <p className="p-6">User not found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-2">{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Age: {user.age}</p>
    </div>
  );
}
