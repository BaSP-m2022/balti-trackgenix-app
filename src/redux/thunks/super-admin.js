import {
  getAdminsSuccess,
  getAdminsError,
  getAdminsPending,
  addAdminError,
  addAdminPending,
  addAdminSuccess,
  editAdminError,
  editAdminPending,
  editAdminSuccess,
  deleteAdminError,
  deleteAdminPending,
  deleteAdminSuccess,
  getSingleAdminError,
  getSingleAdminPending,
  getSingleAdminSuccess,
  resetMessage,
  resetAdmin
} from '../admins/actions';

const url = `${process.env.REACT_APP_API_URL}/super-admin`;

export const getAdmins = () => {
  return async (dispatch) => {
    try {
      dispatch(getAdminsPending());
      const response = await fetch(`${url}/admins`);
      const data = await response.json();
      if (!data.error) dispatch(getAdminsSuccess(data.data));
      else dispatch(getAdminsError(data.message));
    } catch (error) {
      dispatch(getAdminsError(error));
    }
  };
};

export const getSingleAdmin = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getSingleAdminPending());
      const response = await fetch(`${url}/admins/${id}`);
      const data = await response.json();
      if (!data.error) {
        dispatch(getSingleAdminSuccess(data));
      } else {
        dispatch(getSingleAdminError(data.message));
      }
    } catch (error) {
      dispatch(getSingleAdminError(error));
    }
  };
};

export const addAdmin = (obj) => {
  return async (dispatch) => {
    dispatch(addAdminPending());
    try {
      const response = await fetch(`${url}/admins`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(obj)
      });
      const data = await response.json();
      if (!data.error) {
        dispatch(addAdminSuccess(data));
        dispatch(resetAdmin());
        return data.data;
      } else {
        dispatch(addAdminError(data.message));
      }
    } catch (error) {
      dispatch(addAdminError(error));
    }
  };
};

export const editAdmin = (obj, id) => {
  return async (dispatch) => {
    try {
      dispatch(resetMessage());
      dispatch(editAdminPending());
      const response = await fetch(`${url}/admins/${id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(obj)
      });
      const data = await response.json();
      if (!data.error) {
        dispatch(editAdminSuccess(data));
        dispatch(resetAdmin());
      } else {
        dispatch(editAdminError(data.message));
      }
    } catch (error) {
      dispatch(editAdminError(error));
    }
  };
};

export const deleteAdmin = (id) => {
  return async (dispatch) => {
    dispatch(deleteAdminPending());
    try {
      const response = await fetch(`${url}/admins/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      });
      const data = await response.json();
      if (!data.error) {
        dispatch(deleteAdminSuccess(id));
        dispatch(resetAdmin());
      } else {
        dispatch(deleteAdminError(data.message));
      }
    } catch (error) {
      dispatch(deleteAdminError(error));
    }
  };
};