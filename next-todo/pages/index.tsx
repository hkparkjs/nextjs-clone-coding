import { GetServerSideProps, NextPage } from 'next/types';
import React from 'react';
import styled from 'styled-components';
import TodoList from '../components/TodoList';
import { TodoType } from '../types/todo';
import Axios from 'axios';
import { getTodosAPI } from '../lib/api/todo';
import { wrapper } from '../store';
import { todoActions } from '../store/todo';

const Container = styled.div`
  padding: 20px;
`;

// interface IProps {
//   todos: TodoType[];
// }

const app: NextPage = () => {
  return <TodoList todos={[]} />;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    try {
      const { data } = await getTodosAPI();
      store.dispatch(todoActions.setTodo(data));
      return { props: {} };
    } catch (e) {
      console.log(e);
      return { props: {} };
    }
  }
);

export default app;