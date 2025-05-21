"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useDeleteTodo,
  useUpdateTodoState,
} from "@/react-query/hooks/use-update-todo";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, X } from "lucide-react";
import { Todo } from "@prisma/client";

function TodoItem({ todo }: { todo: Todo }) {
  const queryClient = useQueryClient();
  const { updateTodoState, updateTodoStateLoading } = useUpdateTodoState({
    queryClient,
  });
  const { deleteTodo, deleteTodoLoading } = useDeleteTodo({ queryClient });
  return (
    <div className="flex items-center gap-4 px-4 py-4 relative group">
      {/* Loading */}
      {updateTodoStateLoading ? (
        <Loader2 className="animate-spin size-8 text-primary" />
      ) : (
        <Checkbox
          checked={todo.completed}
          disabled={deleteTodoLoading || updateTodoStateLoading}
          onCheckedChange={(checked) =>
            updateTodoState({ id: todo.id, completed: checked as boolean })
          }
          className="size-8"
        />
      )}

      <span className="text-lg grow">{todo.title}</span>

      {/* Delete */}
      {deleteTodoLoading ? (
        <Loader2 className="animate-spin size-8 text-primary" />
      ) : (
        <button
          onClick={() => deleteTodo({ id: todo.id })}
          disabled={deleteTodoLoading || updateTodoStateLoading}
        >
          <X className="size-8 opacity-0 group-hover:opacity-100 pointer-events-none cursor-pointer transition-all group-hover:pointer-events-auto" />
        </button>
      )}
    </div>
  );
}

export default TodoItem;
