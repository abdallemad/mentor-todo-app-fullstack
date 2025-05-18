"use client";
import { useQuery } from "@tanstack/react-query";
import { getTodosAction } from "@/actions/todos";
import { ScrollArea } from "@/components/ui/scroll-area";
import TodoItem from "./todo-item";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import TodosFilters from "./todo-filters";
import { useSearchParams } from "next/navigation";
function TodosContainer() {
  const searchparams = useSearchParams();
  const filter = searchparams.get("filter") as TodoFilter || "all";
  const {
    data: todosData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos", filter],
    queryFn: () => getTodosAction(filter),
  });
  return (
    <>
      <ScrollArea className="rounded-t-md border h-96 bg-background">
        {isLoading && <TodosStates state="loading"/>}
        {isError && <TodosStates state="error"/>}
        {todosData?.todos.length === 0 && <TodosStates state="empty"/>}

        <ul className="">
          {todosData?.todos &&
            todosData.todos.length > 0 &&
            todosData.todos.map((todo, index) => (
              <li key={todo.id}>
                <TodoItem todo={todo} />
                {index !== todosData.todos.length - 1 && <Separator />}
              </li>
            ))}
        </ul>
      </ScrollArea>
      <TodosFilters itemsLeft={todosData?.todos?.filter((todo) => !todo.completed).length || 0}/>
    </>
  );
}

function TodosStates({
  state,
}: {
  state: "loading" | "error" | "empty";
}) {
  switch (state) {
    case "loading":
      return (
        <div className="min-h-32 flex items-center justify-center">
          <Loader2 className="animate-spin text-primary size-8" />
        </div>
      );
    case "error":
      return (
        <p className="text-red-500 text-center min-h-32 flex items-center justify-center">
        Error fetching todos
      </p>
      )
    case "empty":
      return (
        <div className="min-h-32 flex items-center justify-center">
          <p className="text-center text-muted-foreground">No todos found</p>
        </div>
      )
    default:
      return null;
  }
}

export default TodosContainer;
