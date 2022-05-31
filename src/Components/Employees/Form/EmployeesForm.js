import React, { useState } from 'react';
import styles from './EmployeesForm.module.css';

const EditEmployee = () => {
  const [employeeInput, setEmployeeInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    assignedProject: ''
  });
  const onChange = (e) => {
    setEmployeeInput({ ...employeeInput, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const putEmployee = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        firstName: employeeInput.firstName,
        lastName: employeeInput.lastName,
        email: employeeInput.email,
        password: employeeInput.password,
        assignedProject: employeeInput.assignedProject
      })
    };
    const url = `${process.env.REACT_APP_API_URL}/employees`;

    fetch(url, putEmployee)
      .then((response) => response.json())
      // eslint-disable-next-line no-console
      .then((data) => console.log('data:', data));

    setEmployeeInput({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      assignedProject: ''
    });
  };

  return (
    <div className={styles.container}>
      <div>
        <h2>Add new employee</h2>
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={employeeInput.firstName}
            onChange={onChange}
            optional
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={employeeInput.lastName}
            onChange={onChange}
            optional
          />
        </div>
        <div>
          <label>Assigned Project</label>
          <input
            type="text"
            name="assignedProject"
            value={employeeInput.assignedProject}
            onChange={onChange}
            optional
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={employeeInput.email}
            onChange={onChange}
            optional
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={employeeInput.password}
            onChange={onChange}
            optional
          />
        </div>
        <input type="submit" value="Add Employee" />
      </form>
    </div>
  );
};

export default EditEmployee;