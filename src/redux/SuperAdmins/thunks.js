import {
  getSuperAdminsSuccess,
  getSuperAdminsPending,
  getSuperAdminsError,
  getSingleSuperAdminSuccess,
  getSingleSuperAdminPending,
  getSingleSuperAdminError,
  deleteSuperAdminSuccess,
  deleteSuperAdminPending,
  deleteSuperAdminError,
  addSuperAdminSuccess,
  addSuperAdminPending,
  addSuperAdminError,
  editSuperAdminSuccess,
  editSuperAdminPending,
  editSuperAdminError,
  resetMessage,
  resetSuperAdmin
} from './actions';

const url = `${process.env.REACT_APP_API_URL}/super-admin`;
export const getSuperAdmins = () => {
  return async (dispatch) => {
    try {
      dispatch(getSuperAdminsPending());
      const response = await fetch(url);
      const data = await response.json();

      if (!data.error) {
        dispatch(getSuperAdminsSuccess(data.data));
      } else {
        dispatch(getSuperAdminsError(data.message));
      }
    } catch (error) {
      dispatch(getSuperAdminsError(error.message));
    }
  };
};

export const getSingleSuperAdmins = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getSingleSuperAdminPending());
      const response = await fetch(`${url}/${id}`);
      const data = await response.json();
      if (!data.error) dispatch(getSingleSuperAdminSuccess(data));
      else dispatch(getSingleSuperAdminError(data.message));
    } catch (error) {
      dispatch(getSingleSuperAdminError(error.message));
    }
  };
};

export const deleteSuperAdmins = (id) => {
  return async (dispatch) => {
    try {
      const reqConfig = {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      };
      dispatch(deleteSuperAdminPending());
      dispatch(resetMessage());
      const response = await fetch(`${url}/${id}`, reqConfig);
      const data = await response.json();
      if (!data.error) {
        dispatch(deleteSuperAdminSuccess(id));
        dispatch(resetSuperAdmin());
      } else {
        dispatch(deleteSuperAdminError(data.message));
      }
    } catch (error) {
      dispatch(deleteSuperAdminError(error));
    }
  };
};

export const createSuperAdmins = (obj) => {
  return async (dispatch) => {
    try {
      const reqConfig = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(obj)
      };
      dispatch(addSuperAdminPending());
      const response = await fetch(`${url}`, reqConfig);
      const data = await response.json();
      if (!data.error) {
        dispatch(addSuperAdminSuccess(data));
        dispatch(resetSuperAdmin());
      } else dispatch(addSuperAdminError(data.message));
    } catch (error) {
      dispatch(addSuperAdminError(error));
    }
  };
};

export const editSuperAdmins = (obj, id) => {
  return async (dispatch) => {
    try {
      const reqConfig = {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(obj)
      };
      dispatch(resetMessage());
      dispatch(editSuperAdminPending());
      const response = await fetch(`${url}/${id}`, reqConfig);
      const data = await response.json();
      if (!data.error) {
        dispatch(editSuperAdminSuccess(data));
        dispatch(resetSuperAdmin());
      } else dispatch(editSuperAdminError(data.message));
    } catch (error) {
      dispatch(editSuperAdminError(error.toString()));
    }
  };
};
