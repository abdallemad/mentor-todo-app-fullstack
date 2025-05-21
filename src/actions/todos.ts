"use server";
import { client } from "@/lib/db";
import { getAuth } from "./user";
import { Prisma } from "@prisma/client";

export const createTodoAction = async ({
  title,
  completed,
}: {
  title: string;
  completed: boolean;
}) => {
  const user = await getAuth();
  const todo = await client.todo.create({
    data: {
      title,
      completed,
      userId: user.id,
    },
  });
  return {
    status: 201,
    message: "Todo created successfully",
    todo,
  };
};
export const getTodosAction = async (filter: TodoFilter) => {
  const user = await getAuth();
  if (!user) throw new Error("Unauthorized");
  const where: Prisma.TodoWhereInput = {
    userId: user.id,
  };
  if (filter === "active") {
    where.completed = false;
  } else if (filter === "completed") {
    where.completed = true;
  }
  const todos = await client.todo.findMany({
    where,
  });
  const items_left = await client.todo.count({
    where: {
      userId: user.id,
      completed: false,
    },
  });
  return {
    status: 200,
    message: "Todos fetched successfully",
    todos,
    items_left,
  };
};
export const updateTodoStateAction = async ({
  id,
  completed,
}: {
  id: string;
  completed: boolean;
}) => {
  const user = await getAuth();
  if (!user) throw new Error("Unauthorized");
  const todo = await client.todo.update({
    where: {
      id,
    },
    data: {
      completed,
    },
  });
  return {
    status: 200,
    message: "Todo updated successfully",
    new_status: todo.completed
  };
};
export const deleteTodoAction = async ({ id }: { id: string }) => {
  const user = await getAuth();
  if (!user) throw new Error("Unauthorized");
  await client.todo.delete({
    where: {
      id,
    },
  });
  return {
    status: 200,
    message: "Todo deleted successfully",
  };
};
export const clearCompletedAction = async () => {
  const user = await getAuth();
  await client.todo.deleteMany({
    where: {
      userId: user.id,
      completed: true,
    },
  });
  return {
    status: 200,
    message: "Todos cleared successfully",
  };
};
