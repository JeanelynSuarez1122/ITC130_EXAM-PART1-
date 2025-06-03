import { NextResponse } from "next/server";
import { Category } from "../../types/category";

const categories: Category[] = [
  { id: "1", name: "Programming" },
  { id: "2", name: "Web Development" },
  { id: "3", name: "Design" },
];

export async function GET() {
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newCategory: Category = {
    id: Date.now().toString(),
    name: body.name,
  };
  categories.push(newCategory);
  return NextResponse.json(newCategory, { status: 201 });
}
