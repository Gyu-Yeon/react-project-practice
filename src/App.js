import { useCallback, useEffect, useRef, useState, useReducer } from 'react';
import TodoInsert from './TodoInsert';
import TodoList from './TodoList';
import TodoTemplate from './TodoTemplate';

function App() {
  function createBulkTodos() {
    const array = [];
    for (let i = 0; i <= 2500; i++) {
      array.push({
        id: i,
        text: `할일 ${i}`,
        checked: false,
      });
    }
    return array;
  }

  function todoReducer(todos, action) {
    switch (action.type) {
      case 'INSERT': // 새로추가
        return todos.concat(action.todo);
      case 'DELETE': // 제거
        return todos.filter((todo) => todo.id !== action.id);
      case 'TOGGLE': // 토글
        return todos.map((todo) =>
          todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
        );
      default:
        return todos;
    }
  }

  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  const nextId = useRef(4);

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    dispatch({ type: 'INSERT', todo });
    nextId.current += 1;
  }, []);

  const onClickRemove = useCallback((id) => {
    dispatch({ type: 'DELETE', id });
  }, []);

  const onToggle = useCallback((id) => {
    dispatch({ type: 'TOGGLE', id });
  }, []);

  return (
    <div>
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <TodoList
          todos={todos}
          onClickRemove={onClickRemove}
          onToggle={onToggle}
        />
      </TodoTemplate>
    </div>
  );
}

export default App;

// TodoTemplate 화면을 가운데에 정렬시켜 주며, 앱 타이틀(일정관리)을 보여줍니다. children으로 내부 JSX를 props로 받아 와서 렌더링해 줍니다.

// TodoInsert: 새로운 항목을 입력하고 추가할 수 있는 컴포넌트입니다. state를 통해 인풋의 상태를 관리합니다.

// Todolistitem 각 할 일 항목에 대한 정보를 보여 주는 컴포넌트입니다. todo 객체를 props로 받아 와서 상태에 따라 다른 스타일의 UI를 보여 줍니다.

// TodoList todos 배열을 props로 받아 온 후 , 이를 배열 내장 함수 map을 사용해서 여러개의 TodoListItem 컴포넌트로 변환하여 보여 줍니다.
