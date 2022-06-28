import joi from 'joi';
import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { getSingleTask, addTask, editTask } from 'redux/tasks/thunks';
import { getProjects } from 'redux/projects/thunks';
import { getEmployees } from 'redux/employees/thunks';
import { resetTask, resetMessage, setModal } from 'redux/tasks/actions';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal/Modal';
import Loading from 'Components/Shared/Loading';
import styles from 'Components/Tasks/Form/tasks.module.css';
import { waitForDomChange } from '@testing-library/react';

function Tasks() {
  const { id } = useParams();
  const { goBack } = useHistory();
  const dispatch = useDispatch();
  const task = useSelector((state) => state.tasks.task);
  const fetchError = useSelector((state) => state.tasks.error);
  const message = useSelector((state) => state.tasks.message);
  const showModal = useSelector((state) => state.tasks.showModal);
  const employeeList = useSelector((state) => state.employees.list);
  const projectList = useSelector((state) => state.projects.list);
  const isLoading = useSelector((state) => state.tasks.isLoading);
  const employeesLoading = useSelector((state) => state.employees.isLoading);
  const projectsLoading = useSelector((state) => state.projects.isLoading);

  const validationSchema = joi.object({
    employeeId: joi.string().allow('').label('Employee ID'),
    projectId: joi.string().required().label('Project ID'),
    title: joi.string().max(30).required().label('Title'),
    description: joi.string().max(100).allow('').label('Description'),
    date: joi.date().allow('').label('Date'),
    done: joi.boolean().required().label('Done')
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(validationSchema),
    defaultValues: {
      employeeId: '',
      projectId: '',
      title: '',
      description: '',
      date: '',
      done: false
    }
  });

  useEffect(() => {
    id && dispatch(getSingleTask(id));
    dispatch(getProjects());
    dispatch(getEmployees());
    return () => dispatch(resetTask());
  }, []);

  useEffect(() => {
    task &&
      reset({
        employeeId: task.employeeId?._id,
        projectId: task.projectId?._id,
        title: task.title,
        description: task.description,
        date: task.date?.substring(0, 10),
        done: task.done
      });
  }, [task]);

  const formatProjects = () => {
    return projectList.map((project) => {
      return { id: project._id, text: project.projectName };
    });
  };
  const formatEmployees = () => {
    return employeeList.map((employee) => {
      return { id: employee._id, text: `${employee.firstName} ${employee.lastName}` };
    });
  };

  const closeHandler = () => {
    dispatch(setModal(false));
    dispatch(resetMessage());
    if (!fetchError) {
      goBack();
    }
  };

  const submitHandler = (data) => {
    console.log(data);
    if (data.employeeId === '') data.employeeId = undefined;
    id ? dispatch(editTask(data, id)) : dispatch(addTask(data));
    dispatch(setModal(true));
  };

  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      {isLoading || projectsLoading || employeesLoading ? (
        <Loading />
      ) : (
        <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
          <Select
            text="Employee"
            id="employeeId"
            options={formatEmployees()}
            error={errors.employeeId}
            register={register}
          />
          <Select
            text="Project"
            id="projectId"
            options={formatProjects()}
            error={errors.projectId}
            register={register}
          />
          <Input type="text" id="title" text="Title" error={errors.title} register={register} />
          <Input
            type="text"
            id="description"
            text="Description"
            error={errors.description}
            register={register}
          />
          <Input type="date" id="date" text="Date" error={errors.date} register={register} />
          <Input type="checkbox" id="done" text="Done" error={errors.done} register={register} />
          <div className={styles.btnsContainer}>
            <Button classes={'red'} onClick={() => goBack()}>
              Back
            </Button>
            <Button>Save</Button>
          </div>
        </form>
      )}
      <Modal handleClose={() => closeHandler()} isOpen={showModal} isConfirmation={false}>
        <h2>{message}</h2>
      </Modal>
    </section>
  );
}

export default Tasks;
