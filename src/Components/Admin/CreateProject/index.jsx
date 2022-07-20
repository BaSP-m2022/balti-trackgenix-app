import joi from 'joi';
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import Button from 'Components/Shared/Button';
import Loading from 'Components/Shared/Loading';
import Modal from 'Components/Shared/Modal';
import { resetProject, resetMessage } from 'redux/projects/actions';
import { addProject, editProject, getSingleProject } from 'redux/thunks/admin';
import { getEmployees } from 'redux/thunks/admin';
import { getAdmins } from 'redux/thunks/super-admin';
import styles from './index.module.css';
import firebase from 'helper/firebase';

function NewProject() {
  const uid = firebase.auth().currentUser?.uid;
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

  const [employeeInputs, setEmployeeInputs] = useState([
    { employeeId: '', role: '', rate: '', hoursInProject: '' }
  ]);
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
    admin: joi.string().label('Admin').allow(''),
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

  const adminData = () => {
    const currentAdmin = adminList.find((admin) => admin.firebaseUid === uid);
    console.log(currentAdmin);
    return currentAdmin?._id;
  };
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
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
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'employees'
  });

  console.log(adminData());

  const formatEmployees = () => {
    return employeeList.map((employee) => {
      return { id: employee._id, text: `${employee.firstName} ${employee.lastName}` };
    });
  };

  const submitHandler = (data) => {
    const project = data;
    project.admin = adminData();
    id ? dispatch(editProject(data, id)) : dispatch(addProject(data));
    setShowModal(true);
    console.log(project);
  };

  const closeHandler = () => {
    setShowModal(false);
    dispatch(resetMessage());
    if (!error) {
      goBack();
    }
  };
  console.log(uid);
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
        {/* <Input
          text="Admin"
          type="text"
          id="admin"
          error={errors.admin}
          register={register}
          value={adminData()}
        /> */}
        <Input type="text" id="client" text="Client" error={errors.client} register={register} />
        {fields.map((field, index) => (
          <div className={styles.employeeBox} key={field.id}>
            <Select
              text={`Employee ${index + 1}`}
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
            <Button classes={'red'} onClick={() => remove(index)}>
              Remove
            </Button>
          </div>
        ))}
        <Button onClick={() => append({})}> +Add employee</Button>
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
