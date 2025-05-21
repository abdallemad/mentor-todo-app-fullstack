import CreateTodo from "../_component/create-todo"; 
import TodosContainer from "../_component/todos-container"; 
import { redirect } from "next/navigation";
import { getAuth } from "@/actions/user";
import { Metadata } from "next";
export default async function Home() {
  const user = await getAuth();
  if (!user) redirect("/sign-in");
  return (
    <main>
      <CreateTodo />
      <TodosContainer />
      <p className="my-8 text-muted-foreground text-sm text-center">Drag and drop to reorder list</p>
    </main>
  );
}
export const metadata: Metadata = {
  title: "Your Todos",
  description: "Manage your tasks and stay productive",
  keywords: ["todos", "todo", "tasks", "productivity"],
};

