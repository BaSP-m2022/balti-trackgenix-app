import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Form from '../../Shared/Form';
import Modal from '../../Shared/Modal';
import Loading from '../../Shared/Loading';
import styles from './index.module.css';
import { addTimesheet, editTimesheet, getSingleTimesheet } from '../../../redux/timesheets/thunks';
import { resetTimesheet, resetMessage } from '../../../redux/timesheets/actions';
import { getEmployees } from '../../../redux/employees/thunks';
import { getProjects } from '../../../redux/projects/thunks';
import { getTasks } from '../../../redux/Task/thunks';

const TimeSheets = () => {
  const { id } = useParams();
  const { goBack } = useHistory();
  const dispatch = useDispatch();
  const timesheet = useSelector((state) => state.timesheet.timesheet);
  const isLoading = useSelector((state) => state.timesheet.isLoading);
  const error = useSelector((state) => state.timesheet.error);
  const message = useSelector((state) => state.timesheet.message);
  const projects = useSelector((state) => state.projects.list);
  const employees = useSelector((state) => state.employees.list);
  const tasks = useSelector((state) => state.tasks.list);
  const [inputValues, setInputValues] = useState({});
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    id && dispatch(getSingleTimesheet(id));
    dispatch(getEmployees());
    dispatch(getProjects());
    dispatch(getTasks());
    return () => dispatch(resetTimesheet());
  }, []);

  // === format option objects for the form config === //
  const formatDataOptions = () => {
    let projectsData = [];
    let employeesData = [];
    let tasksData = [];
    projects.forEach((project) => {
      projectsData.push({ id: project._id, text: project.projectName });
    });
    employees.forEach((employee) => {
      employeesData.push({ id: employee._id, text: `${employee.firstName} ${employee.lastName}` });
    });
    tasks.forEach((task) => {
      tasksData.push({ id: task._id, text: task.title });
    });
    const config = [
      {
        header: 'Employee',
        type: 'select',
        key: 'employee',
        options: employeesData,
        required: true
      },
      {
        header: 'Project',
        type: 'select',
        key: 'project',
        options: projectsData,
        required: true
      },
      {
        header: 'Role',
        type: 'text',
        key: 'role',
        required: true
      },
      {
        header: 'Date',
        type: 'date',
        key: 'date',
        required: true
      },
      {
        header: 'Rate',
        type: 'number',
        key: 'rate',
        required: true
      },
      {
        header: 'Worked Hours',
        type: 'number',
        key: 'workedHours',
        required: true
      },
      {
        header: 'Description',
        type: 'text',
        key: 'description'
      },
      {
        header: 'Tasks',
        type: 'select',
        key: 'task',
        options: tasksData
      }
    ];
    return config;
  };

  const closeHandler = () => {
    setIsAdding(false);
    dispatch(resetMessage());
    if (!error) {
      goBack();
    }
  };

  // === Handle submit data and method === //
  const submitHandler = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(editTimesheet(inputValues, id));
    } else {
      dispatch(addTimesheet(inputValues));
    }
    setIsAdding(true);
  };

  return (
    <section className={styles.container}>
      <h2>TimeSheets</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <Form
          data={formatDataOptions()}
          itemData={timesheet}
          submitHandler={submitHandler}
          userInput={[inputValues, setInputValues]}
        />
      )}
      <Modal handleClose={() => closeHandler()} isOpen={isAdding} isConfirmation={false}>
        <h2>{message}</h2>
      </Modal>
    </section>
  );
};

export default TimeSheets;
