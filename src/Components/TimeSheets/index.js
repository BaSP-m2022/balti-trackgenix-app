import React, { useState, useEffect } from 'react';
import List from '../Shared/List/List';
import Loading from '../Shared/Loading/Loading';
import Button from '../Shared/Button/Button';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

const TimeSheets = () => {
  const [timeSheetsList, setTimeSheets] = useState([]);
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState([true]);
  const resource = '/timesheets';

  const config = [
    {
      header: 'Employee',
      type: 'select',
      key: 'employee',
      options: employees,
      required: true
    },
    {
      header: 'Project',
      type: 'select',
      key: 'project',
      options: projects,
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
      options: tasks
    }
  ];

  const fetchTimeSheet = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}${resource}`);
      const jsonResponse = await response.json();
      setTimeSheets(jsonResponse.data);
      setIsLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTimeSheet();
    formatDataOptions();
  }, []);

  const getProjects = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const jsonResponse = await response.json();
      return jsonResponse.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const getEmployees = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const jsonResponse = await response.json();
      return jsonResponse.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const getTasks = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const jsonResponse = await response.json();
      return jsonResponse.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const formatDataOptions = async () => {
    const rawProjects = await getProjects();
    const rawEmployees = await getEmployees();
    const rawTasks = await getTasks();
    let projectsData = [];
    let employeesData = [];
    let tasksData = [];
    rawProjects.forEach((project, index) => {
      projectsData.push({ id: project._id });
      projectsData[index].text = project.projectName;
    });
    rawEmployees.forEach((employee, index) => {
      employeesData.push({ id: employee._id });
      employeesData[index].text = `${employee.firstName} ${employee.lastName}`;
    });
    rawTasks.forEach((task, index) => {
      tasksData.push({ id: task._id });
      tasksData[index].text = task.title;
    });
    setProjects(projectsData);
    setEmployees(employeesData);
    setTasks(tasksData);
  };

  const deleteItem = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}${resource}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });
    setTimeSheets([...timeSheetsList.filter((timeSheet) => timeSheet._id !== id)]);
  };

  // const editTimeSheet = (id) => {

  // };

  const formatListData = (responseData) => {
    const data = responseData.map((timeSheet) => {
      return {
        id: timeSheet._id,
        date: timeSheet.date.slice(0, 10),
        employee: timeSheet.employee
          ? timeSheet.employee.firstName + ' ' + timeSheet.employee.lastName
          : '',
        project: timeSheet.project ? timeSheet.project.projectName : '',
        role: timeSheet.role,
        task: timeSheet.task ? timeSheet.task.title : ''
      };
    });
    return data;
  };

  const headers = [
    { header: 'Date', key: 'date' },
    { header: 'Employee', key: 'employee' },
    { header: 'Project', key: 'project' },
    { header: 'Role', key: 'role' },
    { header: 'Task', key: 'task' }
  ];

  return isLoading ? (
    <Loading />
  ) : (
    <section className={styles.container}>
      <h2>TimeSheets</h2>
      <List
        fullList={timeSheetsList}
        data={formatListData(timeSheetsList)}
        linkData={config}
        headers={headers}
        resource={resource}
        deleteItem={deleteItem}
      />
      <div>
        <Link
          to={{
            pathname: '/timesheets/form',
            linkData: config,
            DBPath: resource
          }}
          className={styles.LinkReset}
        >
          <Button classes="block">Create Timesheet</Button>
        </Link>
      </div>
    </section>
  );
};

export default TimeSheets;
