import { useInput } from 'hooks';
import useTodoDetailQuery from 'hooks/queries/useTodoDetailQuery';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Path from 'routes/Path';

function TodoDetailContainer() {
  const { todoId = '' } = useParams<'todoId'>();
  const { todo, mutateDeleteTodo, mutateUpdateTodo } =
    useTodoDetailQuery(todoId);
  const navigate = useNavigate();
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedTitle, onChangeSelectedTitle, setSelectedTitle] = useInput('');
  const [selectedContent, onChangeSelectedContent, setSelectedContent] =
    useInput('');

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
