import { SET_NAME } from 'store/types';

import axios from 'axios';

export const addTodo = ({ title, userId }) => {
  return (dispatch) => {
    dispatch(addTodoStarted());

    axios
      .post(`https://jsonplaceholder.typicode.com/todos`, {
        title,
        userId,
        completed: false,
      })
      .then((res) => {
        dispatch(addTodoSuccess(res.data));
      })
      .catch((err) => {
        dispatch(addTodoFailure(err.message));
      });
  };
};

export const setName = (name) => ({
  type: SET_NAME,
  payload: {
    ...name,
  },
});
