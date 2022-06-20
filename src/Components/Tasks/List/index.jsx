import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks, deleteTask } from '../../../redux/Task/thunks';
import { resetMessage, setModal, updateList } from '../../../redux/Task/actions';
import List from '../../Shared/List';
import Button from '../../Shared/Button';
import Loading from '../../Shared/Loading';
import Modal from '../../Shared/Modal';
import styles from './tasks.module.css';

function Tasks() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.tasks.list);
  const isLoading = useSelector((state) => state.tasks.isLoading);
  const message = useSelector((state) => state.tasks.message);
  const error = useSelector((state) => state.tasks.error);
  const showModal = useSelector((state) => state.tasks.showModal);
  const [confirmation, setConfirmation] = useState(true);
  const [id, setId] = useState('');
  const HEADERS = [
    { header: 'Employee', key: 'employee' },
    { header: 'Project', key: 'project' },
    { header: 'Title', key: 'title' },
    { header: 'Description', key: 'description' },
    { header: 'Date', key: 'date' },
    { header: 'Done', key: 'done' }
  ];

  useEffect(() => dispatch(getTasks()), []);

  const formatTaskData = (responseData) => {
    const data = responseData.map((task) => {
      return {
        id: task._id,
        employee: task.employeeId ? task.employeeId.firstName + ' ' + task.employeeId.lastName : '',
        project: task.projectId ? task.projectId.projectName : '',
        title: task.title,
        description: task.description,
        date: task.date.slice(0, 10),
        done: task.done.toString()
      };
    });
    return data;
  };

  const confirmationHandler = () => {
    setConfirmation(false);
    dispatch(deleteTask(id));
    !error && dispatch(updateList([...list.filter((task) => task._id !== id)]));
  };

  const closeHandler = () => {
    dispatch(setModal(false));
    dispatch(resetMessage());
    setConfirmation(true);
  };

  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <List
            data={formatTaskData(list)}
            headers={HEADERS}
            resource="/tasks"
            deleteItem={(id) => {
              setId(id);
              dispatch(setModal(true));
            }}
          />
          <div>
            <Link to="/tasks/form" className={styles.linkReset}>
              <Button classes="block">Create Task</Button>
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
        <h2>{confirmation ? 'Are you sure you want to delete this task?' : message}</h2>
      </Modal>
    </section>
  );
}

export default Tasks;
