"use server";
import { client } from "@/lib/db";
import { getAuth } from "./user";
import { Prisma } from "../../prisma/app/generated/prisma/client";



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
  const where:Prisma.TodoWhereInput = {
    userId: user.id,
  };
  if(filter === "active") {
    where.completed = false;
  } else if (filter === "completed") {
    where.completed = true;
  }
  const todos = await client.todo.findMany({
    where,
  });
  return {
    status: 200,
    message: "Todos fetched successfully",
    todos,
  };
}
export const updateTodoStateAction = async({id,completed}: {id: string, completed: boolean}) => {
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
    todo,
  };
}
export const deleteTodoAction = async({id}: {id: string}) => {
  const user = await getAuth();
  if (!user) throw new Error("Unauthorized");
  const todo = await client.todo.delete({
    where: {
      id,
    },
  });
  return {
    status: 200,
    message: "Todo deleted successfully",
    todo,
  };
}