import { useInput } from 'hooks';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Input, Button } from 'components/common';
import { useTodoQuery } from 'hooks/queries/useTodoQuery';

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
        <TodoH1>Todo</TodoH1>
        <List>
          {todos.map((todo) => (
            <Item key={todo.id} onClick={() => navigate(`/todo/${todo.id}`)}>
              {todo.title}
            </Item>
          ))}
        </List>

        {isOpenTodoForm ? (
          <TodoForm onSubmit={onCreateTodo}>
            <TodoFormTitleInput
              type="text"
              value={title}
              height={40}
              placeholder="제목을 입력해주세요"
              onChange={onChangeTitle}
            />
            <TodoFormContentTextarea
              value={content}
              placeholder="내용을 입력해주세요"
              onChange={onChangeContent}
            />
            <ButtonGroup>
              <TodoFormButton
                type="button"
                variant="secondary"
                onClick={onToggleTodoForm}
              >
                취소
              </TodoFormButton>
              <TodoFormButton type="submit">추가</TodoFormButton>
            </ButtonGroup>
          </TodoForm>
        ) : (
          <AddTodoButton onClick={onToggleTodoForm}>
            <AddIcon className="material-symbols-outlined">add</AddIcon>
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

const TodoH1 = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
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
`;

const AddIcon = styled.span`
  font-size: 14px;
  margin-right: 6px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TodoForm = styled.form`
  padding: 10px;
  margin-top: 10px;
  border-radius: 8px;
`;

const TodoFormTitleInput = styled(Input)`
  border: none;
  display: block;
  width: 100%;
  margin-bottom: 10px;
`;

const TodoFormContentTextarea = styled.textarea`
  resize: none;
  border: none;
  outline: none;
  padding: 4px 8px;
  width: 100%;
  height: 80px;
  box-sizing: border-box;
`;

const TodoFormButton = styled(Button)`
  margin-right: 8px;
`;
