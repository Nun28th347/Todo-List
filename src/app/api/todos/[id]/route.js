// app/api/todos/[id]/route.js
import { mongooseConnect } from "../../../../../lib/mongoose";
import Todo from "../../../../../models/Todo";
import mongoose from 'mongoose';


export async function GET(req, { params }) {
  const { id } = context.params; 

  await mongooseConnect();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new Response("Invalid ID", { status: 400 });
  }

  const todo = await Todo.findById(params.id);
  return todo
    ? Response.json(todo)
    : new Response("Not found", { status: 404 });
}


export async function PUT(req, context) {
  const { id } = context.params; 

  await mongooseConnect();

  const updatedData = await req.json();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new Response("Invalid ID", { status: 400 });
  }

  const updatedTodo = await Todo.findByIdAndUpdate(id, updatedData, { new: true });

  return updatedTodo
    ? Response.json(updatedTodo)
    : new Response("Not found", { status: 404 });
}




export async function DELETE(req, { params }) {
  const { id } = params; 

  await mongooseConnect();

  //await
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new Response("Invalid ID", { status: 400 });
  }

  const deleted = await Todo.findByIdAndDelete(params.id);

  return deleted 
    ? new Response(null, { status: 204 }) 
    : new Response("Not found", { status: 404 });
}