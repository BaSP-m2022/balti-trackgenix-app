import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'Components/Shared/Modal/Modal';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import Button from 'Components/Shared/Button';
import Loading from 'Components/Shared/Loading';
import styles from './index.module.css';
import { addTimesheet, editTimesheet, getSingleTimesheet } from 'redux/timesheets/thunks';
import { resetTimesheet, resetMessage } from 'redux/timesheets/actions';
import { getEmployees } from 'redux/employees/thunks';
import { getProjects } from 'redux/projects/thunks';
import { getTasks } from 'redux/tasks/thunks';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const timeSheetValidate = Joi.object({
  workedHours: Joi.number().required().label('Worked Hours').messages({
    'string.empty': `Worked Hours cannot be empty`
  }),

  date: Joi.date().required().min('2022-01-01').label('Date').messages({
    'string.empty': `Date cannot be empty`,
    'date.min': `Date cannot be earlier than 2022/01/01`
  }),

  role: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .label('Role')
    .valid('DEV', 'QA', 'PM', 'TL')
    .insensitive()
    .min(2)
    .max(3)
    .required()
    .messages({
      'string.pattern.base': `Role must only have letters`,
      'string.empty': `Role cannot be empty`,
      'string.max': `Role cannot have more than 3 characters`,
      'string.min': `Role must have at least 2 characters`
    }),

  rate: Joi.number().required().label('Rate').messages({
    'string.empty': `Rate cannot be empty`
  }),

  project: Joi.string().label('Project').required().messages({
    'string.empty': `Project cannot be an empty field`
  }),

  employee: Joi.string().label('Employee').required().messages({
    'string.empty': `Employee cannot be an empty field`
  }),

  task: Joi.string().label('Task').messages({
    'string.empty': `Task cannot be an empty field`
  }),

  description: Joi.string().label('Description').min(0)
});

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
  const [isAdding, setIsAdding] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(timeSheetValidate),
    defaultValues: {
      employee: '',
      project: '',
      task: '',
      role: '',
      rate: '',
      workedHours: '',
      description: '',
      date: ''
    }
  });

  useEffect(() => {
    id && dispatch(getSingleTimesheet(id));
    dispatch(getEmployees());
    dispatch(getProjects());
    dispatch(getTasks());
    return () => dispatch(resetTimesheet());
  }, []);

  useEffect(() => {
    reset(timesheet);
  }, [timesheet]);

  // === format option objects for the form config === //
  const formatProjects = () => {
    return projects.map((project) => {
      return { id: project._id, text: project.projectName };
    });
  };

  const formatEmployees = () => {
    return employees.map((employee) => {
      return { id: employee._id, text: `${employee.firstName} ${employee.lastName}` };
    });
  };

  const formatTasks = () => {
    return tasks.map((task) => {
      return { id: task._id, text: task.title };
    });
  };

  const closeHandler = () => {
    setIsAdding(false);
    dispatch(resetMessage());
    if (!error) {
      goBack();
    }
  };

  // === Handle submit data and method === //
  const submitHandler = (data) => {
    if (id) {
      dispatch(editTimesheet(data, id));
    } else {
      dispatch(addTimesheet(data));
    }
    setIsAdding(true);
  };

  return (
    <section className={styles.container}>
      <h2>Time Sheets</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
          <Select
            id={'project'}
            text={'Project'}
            options={formatProjects()}
            register={register}
            error={errors.project}
          />

          <Select
            id={'employee'}
            text={'Employee'}
            options={formatEmployees()}
            register={register}
            error={errors.employee}
          />

          <Input id={'role'} register={register} text={'Role'} type={'text'} error={errors.role} />

          <Input id={'date'} text={'Date'} type={'date'} register={register} error={errors.date} />

          <Input
            id={'rate'}
            text={'Rate'}
            type={'number'}
            register={register}
            error={errors.rate}
          />

          <Input
            id={'workedHours'}
            text={'Worked Hours'}
            type={'number'}
            register={register}
            error={errors.workedHours}
          />

          <Input
            id={'description'}
            type={'text'}
            text={'Description'}
            required={false}
            register={register}
            error={errors.description}
          />

          <Select
            id={'task'}
            text={'Task'}
            options={formatTasks()}
            register={register}
            error={errors.task}
          />
          <div className={styles.buttonContainer}>
            <Button classes={'red'} onClick={() => goBack()}>
              Back
            </Button>
            <Button>Save</Button>
          </div>
        </form>
      )}
      <Modal handleClose={() => closeHandler()} isOpen={isAdding} isConfirmation={false}>
        <h2>{message}</h2>
      </Modal>
    </section>
  );
};

export default TimeSheets;
