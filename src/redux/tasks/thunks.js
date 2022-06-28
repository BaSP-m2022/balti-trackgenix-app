import {
  getTasksPending,
  getTasksSuccess,
  getTasksFailed,
  getSingleTaskPending,
  getSingleTaskSuccess,
  getSingleTaskFailed,
  addTaskPending,
  addTaskSuccess,
  addTaskFailed,
  editTaskPending,
  editTaskSuccess,
  editTaskFailed,
  deleteTaskPending,
  deleteTaskSuccess,
  deleteTaskFailed,
  resetTask,
  resetMessage
} from './actions';

const url = `${process.env.REACT_APP_API_URL}/tasks`;

export const getTasks = () => {
  return async (dispatch) => {
    try {
      dispatch(getTasksPending());
      const response = await fetch(url);
      const data = await response.json();

      if (!data.error) dispatch(getTasksSuccess(data.data));
      else dispatch(getTasksFailed(data.message));
    } catch (error) {
      dispatch(getTasksFailed(error));
    }
  };
};

export const getSingleTask = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getSingleTaskPending());
      const response = await fetch(`${url}/${id}`);
      const data = await response.json();

      if (!data.error) dispatch(getSingleTaskSuccess(data));
      else dispatch(getSingleTaskFailed(data.message));
    } catch (error) {
      dispatch(getSingleTaskFailed(error));
    }
  };
};

export const addTask = (object) => {
  return async (dispatch) => {
    try {
      const requestConfig = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(object)
      };

      dispatch(addTaskPending());
      const response = await fetch(`${url}`, requestConfig);
      const data = await response.json();

      if (!data.error) {
        dispatch(addTaskSuccess(data));
        dispatch(resetTask());
      } else dispatch(addTaskFailed(data.message));
    } catch (error) {
      dispatch(addTaskFailed(error));
    }
  };
};

export const editTask = (object, id) => {
  return async (dispatch) => {
    try {
      const requestConfig = {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(object)
      };

      dispatch(resetMessage());
      dispatch(editTaskPending());
      const response = await fetch(`${url}/${id}`, requestConfig);
      const data = await response.json();

      if (!data.error) {
        dispatch(editTaskSuccess(data));
        dispatch(resetTask());
      } else dispatch(editTaskFailed(data.message));
    } catch (error) {
      dispatch(editTaskFailed(error));
    }
  };
};

export const deleteTask = (id) => {
  return async (dispatch) => {
    try {
      const requestConfig = {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      };

      dispatch(deleteTaskPending());
      const response = await fetch(`${url}/${id}`, requestConfig);
      const data = await response.json();

      if (!data.error) dispatch(deleteTaskSuccess(id));
      else dispatch(deleteTaskFailed(data.message));
    } catch (error) {
      dispatch(deleteTaskFailed(error));
    }
  };
};
