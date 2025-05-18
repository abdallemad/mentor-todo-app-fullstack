"use client";
import { useQuery } from "@tanstack/react-query";
import { getTodosAction } from "@/actions/todos";
import { ScrollArea } from "@/components/ui/scroll-area";
import TodoItem from "./todo-item";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
function TodosContainer() {
  const {
    data: todosData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodosAction,
  });
  return (
    <ScrollArea className="max-h-[calc(100vh-16rem)] rounded-md border bg-background">
      {isLoading && (
        <div className="min-h-32 flex items-center justify-center">
          <Loader2 className="animate-spin text-primary size-8" />
        </div>
      )}
      {isError && (
        <p className="text-red-500 text-center min-h-32 flex items-center justify-center">
          Error fetching todos
        </p>
      )}
      {todosData?.todos.length === 0 && (
        <div className="min-h-32 flex items-center justify-center">
          <p className="text-center text-muted-foreground">
            No todos found
          </p>
        </div>
      )}
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
  );
}

export default TodosContainer;
