import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleTask, createTask, updateTask } from '../../../redux/Task/thunks';
import { getProjects } from '../../../redux/projects/thunks';
import { getEmployees } from '../../../redux/employees/thunks';
import { resetTask, resetMessage, setModal } from '../../../redux/Task/actions';
import Form from '../../Shared/Form';
import Modal from '../../Shared/Modal';
import Loading from '../../Shared/Loading';
import styles from './tasks.module.css';

function Tasks() {
  const { id } = useParams();
  const { goBack } = useHistory();
  const dispatch = useDispatch();
  const employeeList = useSelector((state) => state.employees.list);
  const projectList = useSelector((state) => state.projects.list);
  const task = useSelector((state) => state.tasks.task);
  const isLoading = useSelector((state) => state.tasks.isLoading);
  const projectsLoading = useSelector((state) => state.projects.isLoading);
  const employeesLoading = useSelector((state) => state.employees.isLoading);
  const error = useSelector((state) => state.tasks.error);
  const message = useSelector((state) => state.tasks.message);
  const showModal = useSelector((state) => state.tasks.showModal);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const CONFIG = [
    {
      header: 'Employee',
      type: 'select',
      key: 'employeeId',
      options: employees,
      required: true
    },
    {
      header: 'Project',
      type: 'select',
      key: 'projectId',
      options: projects,
      required: true
    },
    {
      header: 'Title',
      type: 'text',
      key: 'title',
      required: true
    },
    {
      header: 'Description',
      type: 'text',
      key: 'description',
      required: true
    },
    {
      header: 'Date',
      type: 'date',
      key: 'date',
      required: true
    },
    {
      header: 'Done',
      type: 'checkbox',
      key: 'done',
      required: false
    }
  ];

  useEffect(() => {
    id && dispatch(getSingleTask(id));
    dispatch(getProjects());
    dispatch(getEmployees());
    return () => dispatch(resetTask());
  }, []);

  useEffect(() => dataOptions(), [projectList, employeeList]);

  const dataOptions = () => {
    let projectsFormat = [];
    let employeesFormat = [];
    projectList.forEach((project) =>
      projectsFormat.push({ id: project._id, text: project.projectName })
    );
    employeeList.forEach((employee) => {
      employeesFormat.push({
        id: employee._id,
        text: `${employee.firstName} ${employee.lastName}`
      });
    });
    setEmployees(employeesFormat);
    setProjects(projectsFormat);
  };

  const closeHandler = () => {
    dispatch(setModal(false));
    dispatch(resetMessage());
    if (!error) {
      goBack();
    }
  };

  // === Handle submit data and method === //
  const submitHandler = async (e) => {
    e.preventDefault();
    id ? dispatch(updateTask(inputValues, id)) : dispatch(createTask(inputValues));
    dispatch(setModal(true));
  };

  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      {isLoading || projectsLoading || employeesLoading ? (
        <Loading />
      ) : (
        <Form
          data={CONFIG}
          itemData={task}
          submitHandler={submitHandler}
          userInput={[inputValues, setInputValues]}
        />
      )}
      <Modal handleClose={() => closeHandler()} isOpen={showModal} isConfirmation={false}>
        <h2>{message}</h2>
      </Modal>
    </section>
  );
}

export default Tasks;
