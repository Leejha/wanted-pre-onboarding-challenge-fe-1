import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteTodo, getTodoById, updateTodo } from 'apis/todo';
import { DeleteTodoRequest, UpdateTodoRequest } from 'types/todo';

export default function useTodoDetailQuery(todoId: string) {
  const QueryKey = 'todos';
  const queryClient = useQueryClient();

  const { data } = useQuery([QueryKey, todoId], () => getTodoById(todoId), {
    cacheTime: 5 * 1000 * 60,
    staleTime: 5 * 1000 * 60,
    enabled: !!todoId,
  });
  const { mutate: mutateUpdateTodo } = useMutation(
    ({ todoId, title, content }: UpdateTodoRequest) =>
      updateTodo({ todoId, title, content }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKey]);
      },
    }
  );

  const { mutate: mutateDeleteTodo } = useMutation(
    ({ todoId }: DeleteTodoRequest) => deleteTodo({ todoId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKey]);
      },
    }
  );

  return {
    todo: data?.data,
    mutateUpdateTodo,
    mutateDeleteTodo,
  };
}
