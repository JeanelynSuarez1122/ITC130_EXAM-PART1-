import { NextResponse } from "next/server";
import { User } from "../../types/user";

const users: User[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", age: 22 },
  { id: "2", name: "Bob Smith", email: "bob@example.com", age: 23 },
  { id: "3", name: "Charlie Brown", email: "charlie@example.com", age: 24 },
];

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newUser: User = {
    id: Date.now().toString(),
    name: body.name,
    email: body.email,
    age: body.age,
  };
  users.push(newUser);
  return NextResponse.json(newUser, { status: 201 });
}
