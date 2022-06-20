import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Modal from '../../Shared/Modal';
import Form from '../../Shared/Form';
import styles from './index.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addProject, editProject, getSingleProject } from '../../../redux/projects/thunks';
import Loading from '../../Shared/Loading';
import { resetProject } from '../../../redux/projects/actions';
import { getEmployees } from '../../../redux/employees/thunks';
import { getAdmins } from '../../../redux/admins/thunks';

function Projects() {
  const { id } = useParams();
  const { goBack } = useHistory();
  const [inputValues, setInputValues] = useState({});
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const project = useSelector((state) => state.projects.project);
  const isLoading = useSelector((state) => state.projects.isLoading);
  const error = useSelector((state) => state.projects.error);
  const message = useSelector((state) => state.projects.message);
  const employees = useSelector((state) => state.employees.list);
  const admins = useSelector((state) => state.admins.list);

  useEffect(() => {
    id && dispatch(getSingleProject(id));
    dispatch(getAdmins());
    dispatch(getEmployees());
    return () => dispatch(resetProject());
  }, []);

  const formatDataOptions = () => {
    let employeesData = [];
    let adminsData = [];
    admins.forEach((admin) => {
      adminsData.push({ id: admin._id, text: `${admin.firstName} ${admin.lastName}` });
    });
    employees.forEach((employee) => {
      employeesData.push({ id: employee._id, text: `${employee.firstName} ${employee.lastName}` });
    });
    const config = [
      {
        header: 'Project Name',
        type: 'text',
        key: 'projectName',
        required: true
      },
      {
        header: 'Description',
        type: 'text',
        key: 'description',
        required: false
      },
      {
        header: 'Start Date',
        type: 'date',
        key: 'startDate',
        required: true
      },
      {
        header: 'End Date',
        type: 'date',
        key: 'endDate',
        required: false
      },
      {
        header: 'Admin',
        type: 'select',
        key: 'admin',
        options: adminsData,
        required: true
      },
      {
        header: 'Client',
        type: 'text',
        key: 'client',
        required: true
      },
      {
        header: 'Employees',
        type: 'select',
        key: 'employees',
        options: employeesData,
        required: true
      },
      {
        header: 'Role',
        type: 'text',
        key: 'role',
        required: true
      },
      {
        header: 'Rate',
        type: 'number',
        key: 'rate',
        required: true
      },
      {
        header: 'Hours in projects',
        type: 'number',
        key: 'hoursInProject',
        required: true
      },
      {
        header: 'Is active',
        type: 'checkbox',
        key: 'isActive',
        required: false
      }
    ];
    return config;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (id) {
      dispatch(editProject(inputValues, id));
    } else {
      dispatch(addProject(inputValues));
    }
    setShowModal(true);
  };

  const closeHandler = () => {
    setShowModal(false);
    if (!error) {
      goBack();
    }
  };

  return (
    <section className={styles.container}>
      <h2>Projects</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <Form
          data={formatDataOptions()}
          itemData={project}
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

export default Projects;
