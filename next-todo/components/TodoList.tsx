import React, { useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { TodoType } from '../types/todo';
import palette from '../styles/palette';

const Container = styled.div`
  width: 100%;

  .todo-list-header {
    padding: 12px;
    border-bottom: 1px solid ${palette.gray};

    .todo-list-last-todo {
      font-size: 14px;
      span {
        margin-left: 8px;
      }
    }
  }
`;

interface IProps { 
  todos: TodoType[];
}

const TodoList: React.FC<IProps> = ({ todos }) => {
  // useCallback : 함수에 종속성을 줌
  const getTodoColorNums = useCallback(
    () => {
      let red = 0;
      let orange = 0;
      let yellow = 0;
      let green = 0;
      let blue = 0;
      let navy = 0;
      todos.forEach((todo) => {
        if (todo.color === "red") {
          red += 1;
        }
        if (todo.color === "orange") {
          orange += 1;
        }
        if (todo.color === "yellow") {
          yellow += 1;
        }
        if (todo.color === "green") {
          green += 1;
        }
        if (todo.color === "blue") {
          blue += 1;
        }
        if (todo.color === "navy") {
          navy += 1;
        }
      });
      return {
        red,
        orange,
        yellow,
        green,
        blue,
        navy,
      }
    },
    [todos],
  );
  // useMemo : 변수에 종속성을 주어 함수의 재연산 방지
  const todoColorNums = useMemo(getTodoColorNums, [todos]);

  // 객체의 문자열 인덱스 사용을 위한 타입
  type ObjectIndexType = {
    [key: string]: number | undefined;
  };

  // 색깔 객체 구하기 2
  const todoColorNums2 = useMemo(() => {
    const colors: ObjectIndexType = {};
    todos.forEach((todo) => {
      const value = colors[todo.color];
      if (!value) {
        colors[`${todo.color}`] = 1;
      } else {
        colors[`${todo.color}`] = value + 1;
      }
    });
    return colors;
  }, [todos]);

  return (
    <Container>
      <div className="todo-list-header">
        <p className="todo-list-last-todo">
          남은 TODO<span>{todos.length}개</span>
        </p>
      </div>
    </Container>
  );
};

export default TodoList;