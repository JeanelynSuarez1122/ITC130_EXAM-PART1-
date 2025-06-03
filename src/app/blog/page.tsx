"use client";

import { useEffect, useState } from "react";
import { BlogPost } from "../types/blog";
import { User } from "../types/user";
import Link from "next/link";

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then(setPosts);
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  const getAuthorName = (id: string) =>
    users.find((u) => u.id === id)?.name || "Unknown";

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      <Link href="/blog/add" className="text-blue-500 underline mb-4 block">
        Add New Post
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="border rounded p-4 shadow hover:shadow-md"
          >
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-600">
              By {getAuthorName(post.authorId)} on{" "}
              {new Date(post.date).toLocaleDateString()}
            </p>
            <p className="mt-2 text-gray-800 line-clamp-3">{post.content}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
