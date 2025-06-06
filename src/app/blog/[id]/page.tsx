"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BlogPost } from "../../types/blog";
import { User } from "../../types/user";
import { Category } from "@/app/types/category";

export default function BlogDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((posts: BlogPost[]) => {
        const found = posts.find((p) => p.id === id);
        if (found) setPost(found);
      });

    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers);

    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, [id]);

  const authorName =
    users.find((u) => u.id === post?.authorId)?.name || "Unknown";

  const categoryName =
    categories.find((c) => c.id === post?.categoryId)?.name || "Unknown";

  if (!post) return <p className="p-6">Post not found.</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-600 mb-2">
        By {authorName} in {categoryName} on{" "}
        {new Date(post.date).toLocaleDateString()}
      </p>
      <p className="mt-4 text-gray-800 whitespace-pre-line">{post.content}</p>
    </div>
  );
}