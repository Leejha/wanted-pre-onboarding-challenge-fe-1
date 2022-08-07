export interface Todo {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetTodosResponse {
  data: Todo[];
}

export interface GetTodoByIdResponse {
  data: Todo;
}

export interface CreateTodoRequest {
  title: string;
  content: string;
}

export interface UpdateTodoRequest {
  todoId: string;
  title: string;
  content: string;
}

export interface DeleteTodoRequest {
  todoId: string;
}
