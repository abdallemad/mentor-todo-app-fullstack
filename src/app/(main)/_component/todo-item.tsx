
"use client";import React from "react";
import { Todo } from "../../../../prisma/app/generated/prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { updateTodoStateAction, deleteTodoAction } from "@/actions/todos";
import { useMutation } from "@tanstack/react-query";

function TodoItem({ todo }: { todo: Todo }) {
  const searchparams = useSearchParams();
  const filter = (searchparams.get("filter") as TodoFilter) || "all";
  const {mutate: updateTodoState, isPending: updateTodoStateLoading} = useMutation({
    mutationFn: updateTodoStateAction,
    onSuccess: () => {
      
    },
    onError: () => {
      
    }
  })
  const {mutate: deleteTodo, isPending: deleteTodoLoading} = useMutation({
    mutationFn: deleteTodoAction,
    onSuccess: () => {
      
    },
    onError: () => {
      
    }
  })
  return (
    <div className="flex items-center gap-4 px-4 py-4 relative group">
      <Checkbox checked={todo.completed} className="size-8" />
      <span className="text-lg">{todo.title}</span>
      <X className="absolute right-4 top-4 size-8 opacity-0 group-hover:opacity-100 pointer-events-none cursor-pointer transition-all group-hover:pointer-events-auto" />
    </div>
  );
}

export default TodoItem;
