import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createTodo,
  CreateTodoRequest,
  deleteTodo,
  DeleteTodoRequest,
  getTodos,
  updateTodo,
  UpdateTodoRequest,
} from 'apis/todo';
import { useInput } from 'hooks';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Input, Button } from 'components/common';

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
    todos: data?.data || [],
    mutateCreateTodo,
    mutateUpdateTodo,
    mutateDeleteTodo,
  };
}

function TodoContainer() {
  const [title, onChangeTitle] = useInput('');
  const [content, onChangeContent] = useInput('');
  const navigate = useNavigate();
  const [isOpenTodoForm, setIsOpenTodoForm] = useState(false);
  const onToggleTodoForm = () => setIsOpenTodoForm(!isOpenTodoForm);

  const { todos, mutateCreateTodo } = useTodoQuery();

  const onCreateTodo = (e: React.FormEvent) => {
    e.preventDefault();
    mutateCreateTodo({ title, content });
  };

  return (
    <Container>
      <Inner>
        <h1>Todo</h1>
        <List>
          {todos.map((todo) => (
            <Item key={todo.id} onClick={() => navigate(`/todo/${todo.id}`)}>
              {todo.title}
            </Item>
          ))}
        </List>

        {isOpenTodoForm ? (
          <TodoForm onSubmit={onCreateTodo}>
            <Input
              type="text"
              value={title}
              height={40}
              placeholder="제목을 입력해주세요"
              onChange={onChangeTitle}
            />
            <textarea
              value={content}
              placeholder="내용을 입력해주세요"
              onChange={onChangeContent}
            />
            <ButtonGroup>
              <Button
                type="button"
                variant="secondary"
                onClick={onToggleTodoForm}
              >
                취소
              </Button>
              <Button type="submit">추가</Button>
            </ButtonGroup>
          </TodoForm>
        ) : (
          <AddTodoButton onClick={onToggleTodoForm}>
            <span className="material-symbols-outlined">add</span>
            할일 추가하기
          </AddTodoButton>
        )}
      </Inner>
    </Container>
  );
}

export default TodoContainer;

const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 14px;
  margin-top: 40px;
`;

const Inner = styled.div`
  width: 500px;
`;

const List = styled.ul``;

const Item = styled.li`
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #d4d2cf;
  &:first-child {
    border-top: 1px solid #d4d2cf;
  }
  &:hover {
    background-color: #e4ecf8;
  }
`;

const AddTodoButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 10px;
  color: #4848e9;
  span {
    font-size: 14px;
    margin-right: 6px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Title = styled.div``;

const Content = styled.div`
  font-size: 12px;
`;

const TodoForm = styled.form`
  padding: 10px;
  margin-top: 10px;
  border-radius: 8px;
  input {
    border: none;
    display: block;
    width: 100%;
    margin-bottom: 10px;
  }
  textarea {
    resize: none;
    border: none;
    outline: none;
    padding: 4px 8px;
    width: 100%;
    height: 80px;
    box-sizing: border-box;
  }
  button {
    margin-right: 8px;
  }
`;
