"use client";
import { useQuery } from "@tanstack/react-query";
import { getTodosAction } from "@/actions/todos";
import { ScrollArea } from "@/components/ui/scroll-area";
import TodoItem from "./todo-item";
import { Separator } from "@/components/ui/separator";
function TodosContainer() {
  const { data: todosData } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodosAction,
  });
  return (
    <ScrollArea className="max-h-[calc(100vh-16rem)] rounded-md border bg-background">
      <ul className="">
        {(todosData && todosData.todos.length > 0) && todosData.todos.map((todo, index) => (
          <>
            <TodoItem key={todo.id} todo={todo} />
            {index !== todosData.todos.length - 1 && <Separator/>}
          </>
        ))}
      </ul>
    </ScrollArea>
  );
}

export default TodosContainer;
