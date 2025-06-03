"use client";

import { useEffect, useState } from "react";
import { User } from "../../types/user";
import { useRouter } from "next/navigation";
import { Category } from "@/app/types/category";

export default function AddBlogPage() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [authorId, setAuthorId] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers);
    fetch("/api/category")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || content.length < 50 || !authorId || !categoryId) {
      setError(
        "Please fill in all fields. Content must be at least 50 characters."
      );
      return;
    }

    const res = await fetch("/api/blog", {
      method: "POST",
      body: JSON.stringify({ title, content, authorId, categoryId }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/blog");
    } else {
      setError("Failed to add post.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Add New Blog Post</h1>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <input
          type="text"
          placeholder="Post Title"
          className="w-full border px-3 py-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content (min 50 chars)"
          className="w-full border px-3 py-2 rounded min-h-[120px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <select
          className="w-full border px-3 py-2 rounded"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
        >
          <option value="">Select Author</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <select
          className="w-full border px-3 py-2 rounded"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Post
        </button>
      </form>
    </div>
  );
}