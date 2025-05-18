import CreateTodo from "./_component/create-todo";
import TodosContainer from "./_component/todos-container";
import { redirect } from "next/navigation";
import { getAuth } from "@/actions/user";
export default async function Home() {
  const user = await getAuth();
  if (!user) redirect("/sign-in");
  return (
    <main>
      <CreateTodo />
      <TodosContainer />
    </main>
  );
}

