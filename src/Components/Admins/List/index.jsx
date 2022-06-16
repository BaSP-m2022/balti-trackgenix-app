import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './admins.module.css';
import List from '../../Shared/List/List';
import Button from '../../Shared/Button/Button';
import Loading from '../../Shared/Loading/Loading';
import Modal from '../../Shared/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAdmin, getAdmins } from '../../../redux/admins/thunks';
import { updateList } from '../../../redux/admins/actions';

const Admins = () => {
  const dispatch = useDispatch();
  const serverPath = '/admins';
  const admins = useSelector((state) => state.admins.list);
  const pending = useSelector((state) => state.admins.pending);
  const error = useSelector((state) => state.admins.error);
  const message = useSelector((state) => state.admins.message);
  const [confirmation, setConfirmation] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [id, setId] = useState('');

  const headers = [
    { header: 'First name', key: 'firstName' },
    { header: 'Last name', key: 'lastName' },
    { header: 'Email', key: 'email' },
    { header: 'is Active?', key: 'isActive' }
  ];

  useEffect(() => {
    dispatch(getAdmins());
  }, []);

  const deleteItem = () => {
    setConfirmation(false);
    dispatch(deleteAdmin(id));
    setModalMessage('Admin deleted');
    setIsAdding(true);
    !error && dispatch(updateList([...admins.filter((admin) => admin._id !== id)]));
  };

  const closeHandler = () => {
    if (error) setIsAdding(false);
    else {
      setIsAdding(false);
    }
  };

  const formatListData = (responseData) => {
    const data = responseData.map((admin) => {
      return {
        id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        isActive: admin.isActive.toString()
      };
    });
    return data;
  };

  return pending ? (
    <>
      <h2>Admins</h2>
      <Loading />
    </>
  ) : (
    <section className={styles.container}>
      <h2>Admins</h2>
      <List
        fullList={admins}
        data={formatListData(admins)}
        headers={headers}
        resource={serverPath}
        deleteItem={(id) => {
          setId(id);
          setConfirmation(true);
          setIsAdding(true);
        }}
      />
      <div>
        <Link to={'/admins/form'} className={styles.linkReset}>
          <Button classes="block">Create Admin</Button>
        </Link>
      </div>
      <Modal
        handleClose={() => closeHandler()}
        isOpen={isAdding}
        isConfirmation={confirmation}
        confirmed={deleteItem}
      >
        <h2>{confirmation ? 'Are you sure you want to delete this admin?' : modalMessage}</h2>
      </Modal>
    </section>
  );
};

export default Admins;
