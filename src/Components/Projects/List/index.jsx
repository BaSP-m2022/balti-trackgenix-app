import { useEffect, useState } from 'react';
import styles from './index.module.css';
import List from '../../Shared/List';
import Button from '../../Shared/Button';
import Loading from '../../Shared/Loading';
import Modal from '../../Shared/Modal';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects, deleteProject } from '../../../redux/projects/thunks';
import { setMessage, setModal } from '../../../redux/projects/actions';

function Projects() {
  const [isConfirmation, setIsConfirmation] = useState(true);
  const [id, setId] = useState('');
  const resource = '/projects';
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.list);
  const isLoading = useSelector((state) => state.projects.isLoading);
  const message = useSelector((state) => state.projects.message);
  const showModal = useSelector((state) => state.projects.showModal);

  const deleteItem = (id) => {
    setId(id);
    dispatch(setModal(true));
  };

  const sureToDelete = async () => {
    setIsConfirmation(false);
    dispatch(deleteProject(id));
    dispatch(getProjects());
  };

  useEffect(async () => {
    dispatch(getProjects());
  }, []);

  const formatListData = (responseData) => {
    const data = responseData.map((project) => {
      return {
        id: project._id,
        projectName: project.projectName,
        description: project.description,
        startDate: project.startDate.slice(0, 10),
        admin: project.admin ? project.admin.firstName + ' ' + project.admin.lastName : '',
        client: project.client,
        isActive: project.isActive.toString()
      };
    });
    return data;
  };

  const headers = [
    { header: 'Project Name', key: 'projectName' },
    { header: 'Description', key: 'description' },
    { header: 'Start Date', key: 'startDate' },
    { header: 'Admin', key: 'admin' },
    { header: 'Client', key: 'client' },
    { header: 'Is Active?', key: 'isActive' }
  ];

  const closeHandler = () => {
    dispatch(setModal(false));
    dispatch(setMessage());
    setIsConfirmation(true);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <section className={styles.container}>
      <h2>Projects</h2>
      <List
        fullList={projects}
        data={formatListData(projects)}
        headers={headers}
        resource={resource}
        deleteItem={deleteItem}
      />
      <Modal
        handleClose={isConfirmation ? () => dispatch(setModal(false)) : () => closeHandler()}
        isOpen={showModal}
        isConfirmation={isConfirmation}
        confirmed={() => sureToDelete()}
      >
        <h2>{isConfirmation ? 'Are you sure you want to delete this Project?' : message}</h2>
      </Modal>
      <div>
        <Link to={'/projects/form'} className={styles.linkReset}>
          <Button classes="block">Create Project</Button>
        </Link>
      </div>
    </section>
  );
}

export default Projects;
