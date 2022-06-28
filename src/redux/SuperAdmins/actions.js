import {
  GET_SUPER_ADMINS_SUCCESS,
  GET_SUPER_ADMINS_PENDING,
  GET_SUPER_ADMINS_ERROR,
  GET_SINGLE_SUPER_ADMIN_SUCCESS,
  GET_SINGLE_SUPER_ADMIN_PENDING,
  GET_SINGLE_SUPER_ADMIN_ERROR,
  DELETE_SUPER_ADMIN_SUCCESS,
  DELETE_SUPER_ADMIN_PENDING,
  DELETE_SUPER_ADMIN_ERROR,
  ADD_SUPER_ADMIN_SUCCESS,
  ADD_SUPER_ADMIN_PENDING,
  ADD_SUPER_ADMIN_ERROR,
  EDIT_SUPER_ADMIN_SUCCESS,
  EDIT_SUPER_ADMIN_PENDING,
  EDIT_SUPER_ADMIN_ERROR,
  SUPER_ADMIN_MODAL,
  RESET_MESSAGE,
  RESET_SUPER_ADMIN
} from './constants';

export const getSuperAdminsSuccess = (data) => ({
  type: GET_SUPER_ADMINS_SUCCESS,
  payload: data
});

export const getSuperAdminsPending = () => ({
  type: GET_SUPER_ADMINS_PENDING
});

export const getSuperAdminsError = (error) => ({
  type: GET_SUPER_ADMINS_ERROR,
  payload: error
});
export const getSingleSuperAdminSuccess = (id) => ({
  type: GET_SINGLE_SUPER_ADMIN_SUCCESS,
  payload: id
});

export const getSingleSuperAdminPending = () => ({
  type: GET_SINGLE_SUPER_ADMIN_PENDING
});

export const getSingleSuperAdminError = (error) => ({
  type: GET_SINGLE_SUPER_ADMIN_ERROR,
  payload: error
});

export const deleteSuperAdminSuccess = (id) => ({
  type: DELETE_SUPER_ADMIN_SUCCESS,
  payload: id
});

export const deleteSuperAdminPending = () => ({
  type: DELETE_SUPER_ADMIN_PENDING
});

export const deleteSuperAdminError = (error) => ({
  type: DELETE_SUPER_ADMIN_ERROR,
  payload: error
});

export const addSuperAdminSuccess = (data) => ({
  type: ADD_SUPER_ADMIN_SUCCESS,
  payload: data
});

export const addSuperAdminPending = () => ({
  type: ADD_SUPER_ADMIN_PENDING
});

export const addSuperAdminError = (error) => ({
  type: ADD_SUPER_ADMIN_ERROR,
  payload: error
});

export const editSuperAdminSuccess = (data) => ({
  type: EDIT_SUPER_ADMIN_SUCCESS,
  payload: data
});

export const editSuperAdminPending = () => ({
  type: EDIT_SUPER_ADMIN_PENDING
});

export const editSuperAdminError = (error) => ({
  type: EDIT_SUPER_ADMIN_ERROR,
  payload: error
});

export const superAdminModal = (state) => ({
  type: SUPER_ADMIN_MODAL,
  payload: state
});

export const resetMessage = () => ({
  type: RESET_MESSAGE
});

export const resetSuperAdmin = () => ({
  type: RESET_SUPER_ADMIN
});
