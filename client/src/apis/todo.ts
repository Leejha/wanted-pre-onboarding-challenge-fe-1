import { Todo } from 'types/todo';
import client from './client';

interface GetTodosResponse {
  data: Todo[];
}

export const getTodos = async () => {
  const response = await client.get<GetTodosResponse>('/todos');
  return response.data;
};

interface GetTodoByIdResponse {
  data: Todo;
}

export const getTodoById = async (todoId: string) => {
  const response = await client.get<GetTodoByIdResponse>(`/todos/${todoId}`);
  return response.data;
};

export interface CreateTodoRequest {
  title: string;
  content: string;
}

export const createTodo = async ({ title, content }: CreateTodoRequest) => {
  const response = await client.post('/todos', {
    title,
    content,
  });
  return response.data;
};

export interface UpdateTodoRequest {
  todoId: string;
  title: string;
  content: string;
}

export const updateTodo = async ({
  todoId,
  title,
  content,
}: UpdateTodoRequest) => {
  const response = await client.put(`/todos/${todoId}`, {
    title,
    content,
  });
  return response.data;
};

export interface DeleteTodoRequest {
  todoId: string;
}

export const deleteTodo = async ({ todoId }: DeleteTodoRequest) => {
  const response = await client.delete(`/todos/${todoId}`);
  return response.data;
};
