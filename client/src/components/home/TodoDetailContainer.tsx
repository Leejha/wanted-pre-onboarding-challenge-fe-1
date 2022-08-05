import { useQuery } from '@tanstack/react-query';
import { getTodoById } from 'apis/todo';
import { useInput } from 'hooks';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Path from 'routes/Path';
import { useTodoQuery } from './TodoContainer';

function useTodoDetailQuery(todoId: string) {
  const QueryKey = 'todos';
  const { data } = useQuery([QueryKey, todoId], () => getTodoById(todoId), {
    cacheTime: 5 * 1000 * 60,
    staleTime: 5 * 1000 * 60,
    enabled: !!todoId,
  });

  return {
    todo: data?.data,
  };
}

function TodoDetailContainer() {
  const { todoId = '' } = useParams<'todoId'>();
  const { todo } = useTodoDetailQuery(todoId);
  const navigate = useNavigate();
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedTitle, onChangeSelectedTitle, setSelectedTitle] = useInput('');
  const [selectedContent, onChangeSelectedContent, setSelectedContent] =
    useInput('');

  const { mutateDeleteTodo, mutateUpdateTodo } = useTodoQuery();

  const onToggleUpdate = () => {
    setIsUpdate(!isUpdate);
  };

  const onDeleteTodo = (todoId: string) => {
    mutateDeleteTodo({ todoId });
    navigate(Path.HOME);
  };

  const onUpdateTodo = (todoId: string) => {
    mutateUpdateTodo({
      todoId,
      title: selectedTitle,
      content: selectedContent,
    });
    onToggleUpdate();
  };

  useEffect(() => {
    if (!todo) return;
    setSelectedTitle(todo.title);
    setSelectedContent(todo.content);
  }, [todo, setSelectedTitle, setSelectedContent]);

  if (!todo) return null;

  return (
    <div>
      <h3>선택된 Todo</h3>
      <div>
        {isUpdate ? (
          <>
            <input value={selectedTitle} onChange={onChangeSelectedTitle} />
            <input value={selectedContent} onChange={onChangeSelectedContent} />
            <button type="button" onClick={() => onUpdateTodo(todo.id)}>
              수정 완료
            </button>
          </>
        ) : (
          <>
            <span>{todo.title}</span>
            <span>{todo.content}</span>
            <button type="button" onClick={onToggleUpdate}>
              수정
            </button>
          </>
        )}

        <button type="button" onClick={() => onDeleteTodo(todo.id)}>
          삭제
        </button>
      </div>
    </div>
  );
}

export default TodoDetailContainer;
