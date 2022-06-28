import joi from 'joi';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Input from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal/Modal';
import Loading from 'Components/Shared/Loading';
import styles from './login.module.css';
import { login, getUser } from 'redux/auth/thunks';
import { resetMessage } from 'redux/auth/actions';
import { getEmployees } from 'redux/employees/thunks';

const loginValidations = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.empty': `Invalid email`
    }),
  password: joi.string().required().label('Password').min(8).messages({
    'string.empty': `Invalid password`,
    'string.min': `Invalid password`
  })
});

function Login() {
  const { goBack } = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.superAdmins.isLoading);
  const message = useSelector((state) => state.superAdmins.message);
  const [modalMessage, setModalMessage] = useState(false);
  const error = useSelector((state) => state.superAdmins.error);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(loginValidations),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  useEffect(() => reset(), []);

  const submitHandler = (data) => {
    console.log(data);
    dispatch(getUser());
    dispatch(login(data));
  };

  const closeHandler = () => {
    setModalMessage(false);
    dispatch(resetMessage());
    if (!error) {
      goBack();
    }
  };

  return (
    <section className={styles.container}>
      <h2>Log in to Trackgenix</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
          <Input type="email" id="email" text="Email" error={errors.email} register={register} />
          <Input
            type="password"
            id="password"
            text="Password"
            error={errors.password}
            register={register}
          />
          <div className={styles.buttonContainer}>
            <Button classes={'red'} onClick={() => goBack()}>
              Back
            </Button>
            <Button>Log in</Button>
          </div>
        </form>
      )}
      <Modal handleClose={() => closeHandler()} isOpen={modalMessage} isConfirmation={false}>
        <h2>{message}</h2>
      </Modal>
    </section>
  );
}

export default Login;
