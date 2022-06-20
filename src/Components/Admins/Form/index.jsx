import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './admins.module.css';
import Form from '../../Shared/Form';
import { addAdmin, updateAdmin, getSingleAdmin, getAdmins } from '../../../redux/admins/thunks';
import { resetAdmin } from '../../../redux/admins/actions';
import Modal from 'Components/Shared/Modal';

const Admins = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admins.admin);
  const pending = useSelector((state) => state.admins.pending);
  const error = useSelector((state) => state.admins.error);
  const { id } = useParams();
  const { goBack } = useHistory();
  const [inputValues, setInputValues] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const resource = '/admins';
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
      header: 'Is Active?',
      type: 'checkbox',
      key: 'isActive',
      required: false
    }
  ];

  useEffect(() => {
    getAdmins();
    id && dispatch(getSingleAdmin(id));
    return dispatch(resetAdmin());
  }, []);

  const getAdmin = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const jsonResponse = await response.json();
      return jsonResponse.data;
    } catch (error) {
      setIsAdding(true);
    }
  };

  const closeHandler = () => {
    if (error) setIsAdding(false);
    else {
      setIsAdding(false);
      goBack();
    }
  };

  // === Handle submit data and method === //
  const submitHandler = async (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateAdmin(inputValues, id));
      setModalMessage('Edit successful');
    } else {
      dispatch(addAdmin(inputValues));
      setModalMessage('Creation successful');
    }
    setIsAdding(true);
  };

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <Form
        data={config}
        itemData={admin}
        submitHandler={submitHandler}
        userInput={[inputValues, setInputValues]}
      />
      <Modal handleClose={() => closeHandler()} isOpen={isAdding} isConfirmation={false}>
        <h2>{modalMessage}</h2>
      </Modal>
    </section>
  );
};

export default Admins;
