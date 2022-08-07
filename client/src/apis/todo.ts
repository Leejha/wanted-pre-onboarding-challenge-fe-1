import {
  CreateTodoRequest,
  DeleteTodoRequest,
  GetTodoByIdResponse,
  GetTodosResponse,
  UpdateTodoRequest,
} from 'types/todo';
import client from './client';

export const getTodos = async () => {
  const response = await client.get<GetTodosResponse>('/todos');
  return response.data;
};

export const getTodoById = async (todoId: string) => {
  const response = await client.get<GetTodoByIdResponse>(`/todos/${todoId}`);
  return response.data;
};

export const createTodo = async ({ title, content }: CreateTodoRequest) => {
  const response = await client.post('/todos', {
    title,
    content,
  });
  return response.data;
};

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

export const deleteTodo = async ({ todoId }: DeleteTodoRequest) => {
  const response = await client.delete(`/todos/${todoId}`);
  return response.data;
};
