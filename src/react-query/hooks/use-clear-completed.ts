import { clearCompletedAction } from "@/actions/todos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

function useClearCompleted() {
  const queryClient = useQueryClient();
  const { mutate: clearCompleted, isPending: clearCompletedLoading } =
    useMutation({
      mutationFn: clearCompletedAction,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["todos"],
        });
        toast("Todos cleared successfully", {
          duration: 4000,
        });
      },
      onError: () => {
        toast("Failed to clear todos", {
          duration: 4000,
        });
      },
    });
  return { clearCompleted, clearCompletedLoading };
}

export default useClearCompleted;
