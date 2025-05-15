"use server";
import { client } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

const getAuth = async () => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");
  const dbUser = await client.user.findUnique({
    where: { externalId: user.id },
  });
  if (!dbUser) throw new Error("User not found");
  return dbUser;
};

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
export const getTodosAction = async () => {
  const user = await getAuth();
  if (!user) throw new Error("Unauthorized");
  const todos = await client.todo.findMany({
    where: {
      userId: user.id,
    },
  });

  return {
    status: 200,
    message: "Todos fetched successfully",
    todos,
  };
}