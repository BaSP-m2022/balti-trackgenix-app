import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetMessage, resetSuperAdmin } from 'redux/SuperAdmins/actions';
import { createSuperAdmins, editSuperAdmins, getSingleSuperAdmins } from 'redux/SuperAdmins/thunks';
import Loading from 'Components/Shared/Loading';
import Modal from 'Components/Shared/Modal/Modal';
import styles from './super-admins.module.css';
import { useForm } from 'react-hook-form';
import Input from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const superAdminValidate = Joi.object({
  firstName: Joi.string()
    .pattern(/^[a-zA-Z ]+$/)
    .label('First Name')
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.pattern.base': `First Name must only have letters`,
      'string.empty': `First Name cannot be empty`,
      'string.max': `First name cannot have more than 10 characters`,
      'string.min': `First name must have at least 3 characters`
    }),
  lastName: Joi.string()
    .pattern(/^[a-zA-Z ]+$/)
    .label('Last Name')
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.pattern.base': `Last Name must only have letters`,
      'string.empty': `Last Name cannot be empty`,
      'string.max': `Last name cannot have more than 10 characters`,
      'string.min': `Last name must have at least 3 characters`
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.empty': `Email cannot be empty`
    }),
  password: Joi.string().label('Password').min(8).required().messages({
    'string.empty': `Password cannot be empty`,
    'string.min': `Password must have at least 8 alphanumeric characters`
  }),
  isActive: Joi.boolean()
});

function SuperAdminsForm() {
  const { id } = useParams();
  const { goBack } = useHistory();
  const [modalMessage, setModalMessage] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.superAdmins.isLoading);
  const message = useSelector((state) => state.superAdmins.message);
  const error = useSelector((state) => state.superAdmins.error);
  const superAdmin = useSelector((state) => state.superAdmins.superAdmin);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(superAdminValidate),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isActive: false
    }
  });

  useEffect(() => {
    id && dispatch(getSingleSuperAdmins(id));
    return () => dispatch(resetSuperAdmin());
  }, []);

  useEffect(() => {
    reset(superAdmin);
  }, [superAdmin]);

  const closeHandler = () => {
    setModalMessage(false);
    dispatch(resetMessage());
    if (!error) {
      goBack();
    }
  };

  // === Handle submit data and method === //
  const submitHandler = (data) => {
    id ? dispatch(editSuperAdmins(data, id)) : dispatch(createSuperAdmins(data));
    setModalMessage(true);
  };

  return (
    <section className={styles.container}>
      <h2>Super Admins</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
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

          <Input
            id={'isActive'}
            type={'checkbox'}
            text={'Is Active?'}
            register={register}
            error={errors.isActive}
          />
          <div className={styles.buttonContainer}>
            <Button classes={'red'} onClick={() => goBack()}>
              Back
            </Button>
            <Button>Save</Button>
          </div>
        </form>
      )}
      <Modal handleClose={() => closeHandler()} isOpen={modalMessage} isConfirmation={false}>
        <h2>{message}</h2>
      </Modal>
    </section>
  );
}

export default SuperAdminsForm;
