import { deleteTodoAction, updateTodoStateAction } from "@/actions/todos";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function useUpdateTodoState({
  queryClient,
}: {
  queryClient: QueryClient;
}) {

  const { mutate: updateTodoState, isPending: updateTodoStateLoading } =
    useMutation({
      mutationFn: updateTodoStateAction,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["todos"],
        });
        toast("Todo updated successfully", {
          action: "Ok",
          duration: 4000,
        })
      },
      onError: () => {
        toast("Todo updated failed", {
          action: "Ok",
          duration: 4000,
        })
      },
    });
  return { updateTodoState, updateTodoStateLoading };
}

export function useDeleteTodo({ queryClient }: { queryClient: QueryClient }) {
  const { mutate: deleteTodo, isPending: deleteTodoLoading } = useMutation({
    mutationFn: deleteTodoAction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
      toast("Todo deleted successfully", {
        action: "Ok",
        duration: 4000,
      })
    },
    onError: () => {
      toast("Todo deleted failed", {
        action: "Ok",
        duration: 4000,
      })
    },
  });
  return { deleteTodo, deleteTodoLoading };
}
