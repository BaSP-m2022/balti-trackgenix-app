import { useState, useEffect } from 'react';
import styles from './projects.module.css';
import Form from '../Shared/Form/Form';
import List from './List/list';
import { Link } from 'react-router-dom';
import Button from '../Shared/Button/Button';
import Loading from '../Shared/Loading/Loading';

function Projects(props) {
  const [projectsList, setProjectsList] = useState([]);
  const [screen, changeScreen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const data = await response.json();
      setProjectsList(data.data);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
  }, []);

  const deleteItem = async (_id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${_id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      alert(`Project "${data.data.projectName}" was deleted successfully`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    setProjectsList([...projectsList.filter((project) => project._id !== _id)]);
  };

  const getProjects = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const jsonResponse = await response.json();
      setProjectsList(jsonResponse.data);
      setIsLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const getEmployees = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const body = await res.json();
      return body.data;
    } catch (error) {
      alert(error);
    }
  };

  const getAdmins = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const body = await res.json();
      return body.data;
    } catch (error) {
      alert(error);
    }
  };

  const formatDataOptions = async () => {
    const rawEmployees = await getEmployees();
    const rawAdmins = await getAdmins();
    let adminsData = [];
    let employeesData = [];
    rawAdmins.forEach((admin, index) => {
      adminsData.push({ id: admin._id });
      adminsData[index].text = `${admin.firstName} ${admin.lastName}`;
      setAdmins(adminsData);
    });
    rawEmployees.forEach((employee, index) => {
      employeesData.push({ id: employee._id });
      employeesData[index].text = `${employee.firstName} ${employee.lastName}`;
      setEmployees(employeesData);
    });
  };

  useEffect(() => {
    formatDataOptions();
    getProjects();
  }, []);

  const data = [
    {
      title: 'Project Name',
      type: 'text',
      id: 'projectName',
      required: true
    },
    {
      title: 'Description',
      type: 'text',
      id: 'description',
      required: false
    },
    {
      title: 'Start Date',
      type: 'date',
      id: 'startDate',
      required: true
    },
    {
      title: 'End Date',
      type: 'date',
      id: 'endDate',
      required: false
    },
    {
      title: 'Admin',
      type: 'select',
      id: 'admin',
      options: admins,
      required: true
    },
    {
      title: 'Client',
      type: 'text',
      id: 'client',
      required: true
    },
    {
      title: 'Employees',
      type: 'select',
      id: 'employees',
      options: employees,
      required: true
    },
    {
      title: 'Role',
      type: 'text',
      id: 'role',
      required: true
    },
    {
      title: 'Rate',
      type: 'number',
      id: 'rate',
      required: true
    },
    {
      title: 'Is active',
      type: 'checkbox',
      id: 'isActive',
      required: false
    }
  ];

  return isLoading ? (
    <Loading />
  ) : (
    <section className={styles.container}>
      <h2>Projects</h2>
      {screen ? (
        <Form data={data} props={props} />
      ) : (
        <List list={projectsList} setList={setProjectsList} deleteItem={deleteItem} data={data} />
      )}
      <div>
        <Link to="/projects">
          <Button onClick={() => changeScreen(false)}>Project List</Button>
        </Link>
        <Link to="/projects/form">
          <Button onClick={() => changeScreen(true)}>Save Project</Button>
        </Link>
      </div>
    </section>
  );
}

export default Projects;
