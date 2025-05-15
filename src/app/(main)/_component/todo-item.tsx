import React from "react";
import { Todo } from "../../../../prisma/app/generated/prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

function TodoItem({ todo }: { todo: Todo }) {
  return (
    <li className="flex items-center gap-4 px-4 py-4 relative group">
      <Checkbox checked={todo.completed} className="size-8" />
      <span className="text-lg">{todo.title}</span>
      <X className="absolute right-4 top-4 size-8 opacity-0 group-hover:opacity-100 pointer-events-none cursor-pointer transition-all group-hover:pointer-events-auto" />
    </li>
  );
}

export default TodoItem;
