import React, { useState, useEffect } from 'react';
import List from '../Shared/List/List';
import Loading from '../Shared/Loading/Loading';
import styles from './index.module.css';

function TimeSheets() {
  const [timeSheetsList, setTimeSheets] = useState([]);
  const [showedScreen, setShowedScreen] = useState();
  const [method, setMethod] = useState('POST');
  const [timeSheetId, setTimesheetId] = useState('');
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState([true]);
  const resource = 'timesheets';

  const fetchTimeSheet = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/${resource}`);
      const jsonResponse = await response.json();
      setTimeSheets(jsonResponse.data);
      setIsLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  useEffect(async () => {
    fetchTimeSheet();
  }, []);

  const deleteItem = (id) => {
    setTimeSheets([...timeSheetsList.filter((timeSheet) => timeSheet._id !== id)]);
  };

  const editTimeSheet = (id) => {
    setMethod('PUT');
    setShowedScreen(true);
    setTimesheetId(id);
    const closeModal = () => {
      setModal(false);
    };
  };

  const closeModal = () => {
    setModal(false);
  };

  const formatData = (responseData) => {
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
        data={formatData(timeSheetsList)}
        headers={headers}
        resource={resource}
        deleteItem={deleteItem}
        editItem={editTimeSheet}
        method={method}
      />
      <div>
        <button onClick={() => setShowedScreen(false)}>Timesheet list</button>
        <button onClick={() => setShowedScreen(true)}>Add new Timesheet</button>
      </div>
    </section>
  );
}

export default TimeSheets;
