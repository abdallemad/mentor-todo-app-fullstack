import { createTodoAction } from "@/actions/todos";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateTodo = () => {
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
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { createTodo, isPending };
};
