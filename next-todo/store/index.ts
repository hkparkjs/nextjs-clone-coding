import { createStore, applyMiddleware, combineReducers } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import todo from './todo';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  todo: todo.reducer,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload,  // apply delta from hydration
    };
    if (state.count) nextState.count = state.count;
    return nextState;
  }
  return rootReducer(state, action);
};

//* 스토어의 타입
export type RootState = ReturnType<typeof rootReducer>;

//* 미들웨어 적용을 위한 스토어 enhancer
// const bindMiddleware = (middleware: any) => {
//   if (process.env.NODE_ENV !== "production") {
//     const { composeWithDevTools } = require("redux-devtools-extension");
//     return composeWithDevTools(applyMiddleware(...middleware));
//   }
//   return applyMiddleware(...middleware);
// };

const initStore = () => {
  return configureStore({
    reducer,
    devTools: true,   // redux devtool
  });
};

export const wrapper = createWrapper(initStore);