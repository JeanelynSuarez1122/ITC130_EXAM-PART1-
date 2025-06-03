"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Category } from "../types/category";

export default function CategoryListPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <Link
        href="/categories/add"
        className="text-blue-600 underline mb-4 block"
      >
        Add Category
      </Link>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id} className="border p-2 rounded">
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}