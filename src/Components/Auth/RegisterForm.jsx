import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { resetMessage, setModal } from 'redux/auth/actions';
import { registerEmployee } from 'redux/auth/thunks';
import Joi from 'joi';
import Modal from 'Components/Shared/Modal/Modal';
import Input from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import styles from './auth.module.css';

const registerValidate = Joi.object({
  firstName: Joi.string()
    .pattern(/^[a-zA-Z ]+$/)
    .label('First Name')
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.pattern.base': `First Name" should only have letters`,
      'string.empty': `First Name cannot be an empty field`,
      'string.max': `First name should have a maximum length of 10`,
      'string.min': `First name should have a minimum length of 3`
    }),
  lastName: Joi.string()
    .pattern(/^[a-zA-Z ]+$/)
    .label('Last Name')
    .min(3)
    .max(10)
    .required()
    .messages({
      'string.pattern.base': `Last Name" should only have letters`,
      'string.empty': `Last Name cannot be an empty field`,
      'string.max': `Last name should have a maximum length of 10`,
      'string.min': `Last name should have a minimum length of 3`
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.empty': `Email cannot be an empty field`
    }),
  password: Joi.string().label('Password').min(8).required().messages({
    'string.empty': `Password cannot be an empty field`,
    'string.min': `Password should have a minimum length of 8`
  }),
  isActive: Joi.boolean()
});

const RegisterForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const message = useSelector((state) => state.auth.message);
  const showModal = useSelector((state) => state.auth.showModal);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(registerValidate),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isActive: true
    }
  });

  useEffect(() => reset(), []);

  const closeHandler = () => {
    dispatch(setModal(false));
    dispatch(resetMessage());
    if (!error) {
      history.push('/login');
    }
  };

  const submitHandler = (data) => {
    dispatch(registerEmployee(data));
    dispatch(setModal(true));
  };

  return (
    <section className={styles.container}>
      <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
        <div className={styles.inputsContainer}>
          <Input
            id={'firstName'}
            register={register}
            text={'First Name'}
            type={'text'}
            error={errors.firstName}
          />
          <Input
            id={'lastName'}
            text={'Last Name'}
            type={'text'}
            register={register}
            error={errors.lastName}
          />
          <Input
            id={'email'}
            text={'Email'}
            type={'email'}
            register={register}
            error={errors.email}
          />
          <Input
            id={'password'}
            text={'Password'}
            type={'password'}
            register={register}
            error={errors.password}
          />
        </div>
        <div className={styles.btnsContainer}>
          <Button>CREATE ACCOUNT</Button>
          <Button classes={'red'} onClick={() => history.goBack()}>
            Cancel
          </Button>
          <p className={styles.text}>
            Already have an account?{' '}
            <Link to="/login" className={styles.link}>
              Log In
            </Link>
          </p>
        </div>
      </form>
      <Modal handleClose={() => closeHandler()} isOpen={showModal} isConfirmation={false}>
        <h2>{message}</h2>
      </Modal>
    </section>
  );
};

export default RegisterForm;
