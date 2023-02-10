import { GetServerSideProps, NextPage } from 'next/types';
import React from 'react';
import styled from 'styled-components';
import TodoList from '../components/TodoList';
import { TodoType } from '../types/todo';
import Axios from 'axios';
import { getTodosAPI } from '../lib/api/todo';

const Container = styled.div`
  padding: 20px;
`;

interface IProps {
  todos: TodoType[];
}

const app: NextPage<IProps> = ({ todos }) => {
  return <TodoList todos={todos} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await getTodosAPI();
    return { props: { todos: data } };
  } catch (e) {
    console.log(e);
    return { props: {} };
  }
};

export default app;