import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTodo, getTodos } from 'apis/todo';
import { CreateTodoRequest } from 'types/todo';

export function useTodoQuery() {
  const QueryKey = 'todos';
  const queryClient = useQueryClient();

  const { data } = useQuery([QueryKey], () => getTodos(), {
    cacheTime: 5 * 1000 * 60,
    staleTime: 5 * 1000 * 60,
  });

  const { mutate: mutateCreateTodo } = useMutation(
    ({ title, content }: CreateTodoRequest) => createTodo({ title, content }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKey]);
      },
    }
  );

  return {
    todos: data?.data || [],
    mutateCreateTodo,
  };
}
