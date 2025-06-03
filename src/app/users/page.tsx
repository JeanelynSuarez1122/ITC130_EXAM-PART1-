"use client";

import { useEffect, useState } from "react";
import { User } from "../types/user";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <Link href="/users/add" className="text-blue-500 underline mb-4 block">
        Add New User
      </Link>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`} className="text-lg text-blue-600">
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
