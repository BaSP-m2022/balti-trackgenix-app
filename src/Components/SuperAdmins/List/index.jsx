import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import List from 'Components/Shared/List';
import Modal from 'Components/Shared/Modal/Modal';
import Button from 'Components/Shared/Button';
import Loading from 'Components/Shared/Loading';
import styles from './super-admins.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getSuperAdmins, deleteSuperAdmins } from 'redux/SuperAdmins/thunks';
import { superAdminModal, resetMessage } from 'redux/SuperAdmins/actions';

function SuperAdmins() {
  const dispatch = useDispatch();
  const superAdminList = useSelector((state) => state.superAdmins.list);
  const isLoading = useSelector((state) => state.superAdmins.isLoading);
  const message = useSelector((state) => state.superAdmins.message);
  const error = useSelector((state) => state.superAdmins.error);
  const modal = useSelector((state) => state.superAdmins.showModal);
  const [confirmation, setConfirmation] = useState(true);
  const [id, setId] = useState('');
  const serverPath = '/super-admins';

  const headers = [
    { header: 'First name', key: 'firstName' },
    { header: 'Last name', key: 'lastName' },
    { header: 'Email', key: 'email' },
    { header: 'is Active?', key: 'isActive' }
  ];

  useEffect(async () => {
    dispatch(getSuperAdmins());
  }, []);

  const confirmationHandler = () => {
    setConfirmation(false);
    dispatch(deleteSuperAdmins(id));
  };

  const closeHandler = () => {
    dispatch(superAdminModal(false));
    dispatch(resetMessage());
    setConfirmation(true);
  };

  const formatListData = (responseData) => {
    const data = responseData.map((superAdmin) => {
      return {
        id: superAdmin._id,
        firstName: superAdmin.firstName,
        lastName: superAdmin.lastName,
        email: superAdmin.email,
        isActive: superAdmin.isActive.toString()
      };
    });
    return data;
  };

  return isLoading ? (
    <>
      <h2> Super Admins</h2>
      <Loading />
    </>
  ) : (
    <section className={styles.container}>
      <h2>Super Admins</h2>
      <List
        fullList={superAdminList}
        data={formatListData(superAdminList)}
        headers={headers}
        resource={serverPath}
        deleteItem={(id) => {
          setId(id);
          dispatch(superAdminModal(true));
        }}
        showButtons={true}
      />
      <div>
        <Link to={'/super-admins/form'} className={styles.linkReset}>
          <Button classes="block">Create Super Admin</Button>
        </Link>
      </div>
      <Modal
        isOpen={modal}
        isConfirmation={confirmation}
        handleClose={confirmation ? () => dispatch(superAdminModal(false)) : () => closeHandler()}
        confirmed={() => confirmationHandler()}
      >
        <h2>{confirmation ? 'Are you sure you want to delete this super admin?' : message}</h2>
      </Modal>
    </section>
  );
}

export default SuperAdmins;
