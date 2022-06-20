import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetMessage, resetSuperAdmin } from '../../../redux/super admins/actions';
import {
  createSuperAdmins,
  editSuperAdmins,
  getSingleSuperAdmins
} from '../../../redux/super admins/thunks';
import Loading from '../../Shared/Loading';
import Form from '../../Shared/Form';
import Modal from '../../Shared/Modal';
import styles from './super-admins.module.css';

function SuperAdminsForm() {
  const { id } = useParams();
  const [inputValues, setInputValues] = useState({});
  const { goBack } = useHistory();
  const [modalMessage, setModalMessage] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.superAdmins.isLoading);
  const message = useSelector((state) => state.superAdmins.message);
  const error = useSelector((state) => state.superAdmins.error);
  const superAdmin = useSelector((state) => state.superAdmins.superAdmin);
  // const resource = '/super-admin';
  useEffect(() => {
    id && dispatch(getSingleSuperAdmins(id));
    return () => dispatch(resetSuperAdmin());
  }, []);

  const config = [
    {
      header: 'First Name',
      type: 'text',
      key: 'firstName',
      required: true
    },
    {
      header: 'Last Name',
      type: 'text',
      key: 'lastName',
      required: true
    },
    {
      header: 'Email',
      type: 'email',
      key: 'email',
      required: true
    },
    {
      header: 'Password',
      type: 'password',
      key: 'password',
      required: true
    },
    {
      header: 'Is active',
      type: 'checkbox',
      key: 'isActive',
      required: false
    }
  ];

  const closeHandler = () => {
    setModalMessage(false);
    dispatch(resetMessage());
    if (!error) {
      goBack();
    }
  };

  // === Handle submit data and method === //
  const submitHandler = (e) => {
    e.preventDefault();
    id ? dispatch(editSuperAdmins(inputValues, id)) : dispatch(createSuperAdmins(inputValues));
    setModalMessage(true);
  };

  return (
    <section className={styles.container}>
      <h2>Super Admins</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <Form
          data={config}
          itemData={superAdmin}
          submitHandler={submitHandler}
          userInput={[inputValues, setInputValues]}
        />
      )}
      <Modal handleClose={() => closeHandler()} isOpen={modalMessage} isConfirmation={false}>
        <h2>{message}</h2>
      </Modal>
    </section>
  );
}

export default SuperAdminsForm;
