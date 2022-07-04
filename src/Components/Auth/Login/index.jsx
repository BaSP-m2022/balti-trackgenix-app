import joi from 'joi';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Input from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal/Modal';
import Loading from 'Components/Shared/Loading';
import styles from './login.module.css';
import { login } from 'redux/auth/thunks';
import { resetMessage } from 'redux/auth/actions';

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
  const isLoading = useSelector((state) => state.auth.isLoading);
  const message = useSelector((state) => state.auth.message);
  const [modalMessage, setModalMessage] = useState(false);
  const error = useSelector((state) => state.auth.error);
  const history = useHistory();

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

  useEffect(() => reset(), []);

  const submitHandler = (data) => {
    dispatch(login(data));
    setModalMessage(true);
  };

  const closeHandler = () => {
    setModalMessage(false);
    dispatch(resetMessage());
    if (!error) {
      {
        history.push('/employee');
      }
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
      <p className={styles.text}>
        Do you not have an account?{' '}
        <Link to="/register" className={styles.link}>
          Sign up
        </Link>
      </p>
    </section>
  );
}

export default Login;
