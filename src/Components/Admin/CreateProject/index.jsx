import joi from 'joi';
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import Button from 'Components/Shared/Button';
import Loading from 'Components/Shared/Loading';
import Modal from 'Components/Shared/Modal/Modal';
import { resetProject, resetMessage } from 'redux/projects/actions';
import { addProject, editProject, getSingleProject } from 'redux/projects/thunks';
import { getEmployees } from 'redux/employees/thunks';
import { getAdmins } from 'redux/admins/thunks';
import styles from './index.module.css';

function NewProject() {
  const { id } = useParams();
  const { goBack } = useHistory();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const project = useSelector((state) => state.projects.project);
  const isLoading = useSelector((state) => state.projects.isLoading);
  const employeesLoading = useSelector((state) => state.employees.isLoading);
  const adminsLoading = useSelector((state) => state.admins.isLoading);
  const error = useSelector((state) => state.projects.error);
  const message = useSelector((state) => state.projects.message);
  const employeeList = useSelector((state) => state.employees.list);
  const adminList = useSelector((state) => state.admins.list);
  const [employeeInputs, setEmployeeInputs] = useState([{ inputs: '' }]);

  const validationSchema = joi.object({
    projectName: joi
      .string()
      .min(1)
      .max(30)
      .pattern(/^[A-Za-z0-9 ]+$/)
      .required()
      .label('Project name'),
    description: joi.string().min(10).max(140).allow('').label('Description'),
    isActive: joi.boolean(),
    admin: joi.string().required().label('Admin'),
    client: joi
      .string()
      .min(1)
      .max(20)
      .pattern(/^[A-Za-z0-9 ]+$/)
      .required()
      .label('Client'),
    startDate: joi.date().required().label('Start Date'),
    endDate: joi.date().min(joi.ref('startDate')).allow('').label('End Date'),
    employees: joi
      .array()
      .items(
        joi.object({
          employeeId: joi.string().required().label('Employee ID'),
          role: joi.string().valid('DEV', 'QA', 'PM', 'TL').insensitive().required().label('Role'),
          rate: joi.number().min(0).precision(2).required().label('Rate'),
          hoursInProject: joi.number().min(0).precision(1).required().label('Hours In Project')
        })
      )
      .label('Employee')
    // role: joi.string().valid('DEV', 'QA', 'PM', 'TL').insensitive().required().label('Role'),
    // rate: joi.number().min(0).precision(2).required().label('Rate'),
    // hoursInProject: joi.number().min(0).precision(1).required().label('Hours In Project')
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      projectName: '',
      description: '',
      startDate: '',
      endDate: '',
      admin: '',
      client: '',
      employees: [],
      isActive: true
    },
    resolver: joiResolver(validationSchema)
  });

  useEffect(() => {
    id && dispatch(getSingleProject(id));
    dispatch(getAdmins());
    dispatch(getEmployees());
    return () => dispatch(resetProject());
  }, []);

  useEffect(() => {
    project && reset(project);
  }, [project]);

  const formatAdmins = () => {
    return adminList.map((admin) => {
      return { id: admin._id, text: `${admin.firstName} ${admin.lastName}` };
    });
  };

  const formatEmployees = () => {
    return employeeList.map((employee) => {
      return { id: employee._id, text: `${employee.firstName} ${employee.lastName}` };
    });
  };

  const submitHandler = (data) => {
    console.log(data);
    id ? dispatch(editProject(data, id)) : dispatch(addProject(data));
    setShowModal(true);
  };

  const closeHandler = () => {
    setShowModal(false);
    dispatch(resetMessage());
    if (!error) {
      goBack();
    }
  };
  0;

  const handleEmployeeInputAdd = () => {
    setEmployeeInputs([...employeeInputs, { inputs: '' }]);
  };

  const handleEmployeeInputRemove = (index) => {
    const inputsList = [...employeeInputs];
    inputsList.splice(index, 1);
    setEmployeeInputs(inputsList);
  };

  return (
    <section className={styles.container}>
      <h2>Projects</h2>
      <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
        <Input
          type="text"
          id="projectName"
          text="Project Name"
          error={errors.projectName}
          register={register}
        />
        <Input
          type="text"
          id="description"
          text="Description"
          error={errors.description}
          register={register}
        />
        <Input
          type="date"
          id="startDate"
          text="Start Date"
          error={errors.startDate}
          register={register}
        />
        <Input
          type="date"
          id="endDate"
          text="End Date"
          error={errors.endDate}
          register={register}
        />
        <Select
          text="Admin"
          id="admin"
          options={formatAdmins()}
          error={errors.admin}
          register={register}
        />
        <Input type="text" id="client" text="Client" error={errors.client} register={register} />
        {employeeInputs.map((singleEmployee, index) => (
          <div className={styles.employeeBox} key={index}>
            <Select
              text="Employee"
              id={`employees.${index}.employeeId`}
              options={formatEmployees()}
              error={errors.employeeId}
              register={register}
            />
            <Input
              type="text"
              id={`employees.${index}.role`}
              text="Role"
              error={errors.role}
              register={register}
            />
            <Input
              type="number"
              id={`employees.${index}.rate`}
              text="Rate"
              error={errors.rate}
              register={register}
            />
            <Input
              type="number"
              id={`employees.${index}.hoursInProject`}
              text="Hours in project"
              error={errors.hoursInProject}
              register={register}
            />
            {employeeInputs.length - 1 === index && (
              <Button onClick={handleEmployeeInputAdd}>Add another employee</Button>
            )}
            {employeeInputs.length > 1 && (
              <Button classes={'red'} onClick={() => handleEmployeeInputRemove(index)}>
                Remove
              </Button>
            )}
          </div>
        ))}

        <Input
          type="checkbox"
          id="isActive"
          text="is Active?"
          error={errors.isActive?.message}
          register={register}
        />
        <div className={styles.btnsContainer}>
          <Button classes={'red'} onClick={() => goBack()}>
            Back
          </Button>
          <Button>Save</Button>
        </div>
      </form>
      <Modal handleClose={() => closeHandler()} isOpen={showModal} isConfirmation={false}>
        <h2>{message}</h2>
      </Modal>
    </section>
  );
}

export default NewProject;