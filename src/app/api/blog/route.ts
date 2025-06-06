import { NextResponse } from "next/server";
import { BlogPost } from "../../types/blog";

const blogPosts: BlogPost[] = [
  {
    id: "101",
    title: "Getting Started with React",
    content:
      "React is a JavaScript library for building user interfaces. It makes creating interactive UIs painless. To get started with React, you first need to understand components, JSX, and props. Once you have the basics, you can build reusable UI blocks that dynamically update and render efficiently.",
    authorId: "1",
    categoryId: "1",
    date: "2024-06-01T10:30:00Z",
  },
  {
    id: "102",
    title: "Understanding TypeScript in Next.js",
    content:
      "TypeScript is a powerful way to catch errors and ensure code quality in your Next.js projects. With built-in support, you can easily create typed props, API routes, and components. This post explores how TypeScript integrates with the Next.js App Router and helps you maintain scalable and reliable apps.",
    authorId: "2",
    categoryId: "2",
    date: "2024-06-01T15:45:00Z",
  },
];

export async function GET() {
  return NextResponse.json(blogPosts);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newPost: BlogPost = {
    id: Date.now().toString(),
    title: body.title,
    content: body.content,
    authorId: body.authorId,
    categoryId: body.categoryId,
    date: new Date().toISOString(),
  };

  blogPosts.push(newPost);
  return NextResponse.json(newPost, { status: 201 });
}