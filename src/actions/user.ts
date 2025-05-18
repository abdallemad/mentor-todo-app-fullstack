"use server";
import { client } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const syncUserAction = async () => {
  const user = await currentUser();
  if (!user) throw new Error("User not found");
  const dbUser = await client.user.findUnique({
    where: {
      externalId: user.id,
    },
  });
  if (dbUser) return { isSynced: true };
  await client.user.create({
    data: {
      externalId: user.id,
      name: user.fullName || "User",
    },
  });
  return { isSynced: true };
};
export const getAuth = async () => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");
  const dbUser = await client.user.findUnique({
    where: { externalId: user.id },
  });
  if (!dbUser) throw new Error("User not found");
  return dbUser;
};