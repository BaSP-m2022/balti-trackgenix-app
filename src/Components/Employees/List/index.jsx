import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees, deleteEmployees } from '../../../redux/employees/thunks';
import List from '../../Shared/List';
import Button from '../../Shared/Button';
import Loading from '../../Shared/Loading';
import Modal from '../../Shared/Modal';
import styles from './employees.module.css';
import { resetMessage, setModal, updateList } from '../../../redux/employees/actions';

const Employees = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.employees.list);
  const isLoading = useSelector((state) => state.employees.isLoading);
  const message = useSelector((state) => state.employees.message);
  const error = useSelector((state) => state.employees.error);
  const showModal = useSelector((state) => state.employees.showModal);
  const [confirmation, setConfirmation] = useState(true);
  const [id, setId] = useState('');
  const resource = '/employees';

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const formatListData = (responseData) => {
    const data = responseData.map((employee) => {
      return {
        id: employee._id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        project: employee.projectId ? employee.projectId.projectName : '',
        password: employee.password,
        isActive: employee.isActive.toString()
      };
    });
    return data;
  };

  const headers = [
    { header: 'First Name', key: 'firstName' },
    { header: 'Last Name', key: 'lastName' },
    { header: 'Mail', key: 'email' },
    { header: 'Active', key: 'isActive' }
  ];

  const confirmationHandler = () => {
    setConfirmation(false);
    dispatch(deleteEmployees(id));
    !error && dispatch(updateList([...list.filter((employee) => employee._id !== id)]));
  };

  const closeHandler = () => {
    dispatch(setModal(false));
    dispatch(resetMessage());
    setConfirmation(true);
  };

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <List
            data={formatListData(list)}
            headers={headers}
            resource={resource}
            deleteItem={(id) => {
              setId(id);
              dispatch(setModal(true));
            }}
          />
          <div>
            <Link to={'employees/form'} className={styles.LinkReset}>
              <Button classes="block">Create Employee</Button>
            </Link>
          </div>
        </>
      )}
      <Modal
        isOpen={showModal}
        isConfirmation={confirmation}
        handleClose={confirmation ? () => dispatch(setModal(false)) : () => closeHandler()}
        confirmed={() => confirmationHandler()}
      >
        <h2>{confirmation ? 'Are you sure you want to delete this employee' : message}</h2>
      </Modal>
    </section>
  );
};

export default Employees;
