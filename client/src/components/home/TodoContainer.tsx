import React from 'react';

function TodoContainer() {
  return (
    <div>
      <form>
        <input type="text" />
        <button>추가</button>
      </form>

      <ul>
        <li>
          <span>공부하기</span>
          <button>수정</button>
          <button>삭제</button>
        </li>
        <li>
          <span>공부하기</span>
          <button>수정</button>
          <button>삭제</button>
        </li>
        <li>
          <span>공부하기</span>
          <button>수정</button>
          <button>삭제</button>
        </li>
      </ul>
    </div>
  );
}

export default TodoContainer;
