import { createTodoAction } from "@/actions/todos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateTodo = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const { mutate: createTodo, isPending } = useMutation({
    mutationFn: async ({
      title,
      checked,
    }: {
      title: string;
      checked: boolean;
    }) => {
      return createTodoAction({ title, completed: checked });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      onSuccess?.();
      toast("Todo created successfully", {
        duration: 4000,
      });
    },
    onError: () => {
      toast("Failed to create todo", {
        duration: 4000,
      });
    },
  });
  return { createTodo, isPending };
};
