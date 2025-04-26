import { mongooseConnect } from "../../../../lib/mongoose";
import Todo from "../../../../models/Todo";

export async function GET(req) {
  await mongooseConnect();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return new Response("Missing userId", { status: 400 });
  }

  const todos = await Todo.find({ userId });
  return Response.json(todos);
}

export async function POST(req) {
  await mongooseConnect();
  const { text, completed = false, userId } = await req.json();

  if (!userId) {
    return new Response("Missing userId", { status: 400 });
  }

  const newTodo = await Todo.create({ text, completed, userId });
  return Response.json(newTodo);
}
