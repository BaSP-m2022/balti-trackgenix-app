import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'Components/Shared/Modal/Modal';
import Loading from 'Components/Shared/Loading';
import styles from './index.module.css';
import Button from 'Components/Shared/Button';
import { getSingleEmployee } from 'redux/employees/thunks';
import { useForm } from 'react-hook-form';
import { resetMessage } from 'redux/employees/actions.js';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import Input from 'Components/Shared/Input';

const HoursForm = () => {
  const id = '62b1122165165c996de858ec';
  const [showModal, setShowModal] = useState(true);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.employees.isLoading);
  const message = useSelector((state) => state.employees.message);
  const [number, setNumber] = useState({
    one: '',
    two: '',
    three: '',
    four: '',
    five: '',
    six: '',
    seven: ''
  });
  const [add, setAdd] = useState();
  const validationSchema = Joi.object({
    monday: Joi.number().min(0).max(12).required(),
    tuesday: Joi.number().min(0).max(12).required(),
    wednesday: Joi.number().min(0).max(12).required(),
    thursday: Joi.number().min(0).max(12).required(),
    friday: Joi.number().min(0).max(12).required(),
    saturday: Joi.number().min(0).max(12).required(),
    sunday: Joi.number().min(0).max(12).required(),
    weekend: Joi.date().required().max(Date.now())
  });

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(validationSchema),
    defaultValues: { one: '', two: '', three: '', four: '', five: '', six: '', seven: '' }
  });

  useEffect(() => {
    id && dispatch(getSingleEmployee(id));
  }, []);

  useEffect(() => {
    const { one, two, three, four, five, six, seven } = number;
    setAdd(
      Number(one) +
        Number(two) +
        Number(three) +
        Number(four) +
        Number(five) +
        Number(six) +
        Number(seven)
    );
  }, [number]);

  const submitHandler = async (data) => {
    if (data) setShowModal(true);
  };

  const closeHandler = () => {
    setShowModal(false);
    dispatch(resetMessage());
  };

  const handleInput = (data) => {
    const { name, value } = data.target;
    setNumber({ ...number, [name]: value });
  };

  const headers = [
    { header: 'Project Name', key: 'Project Name' },
    { header: 'Monday', key: 'Monday' },
    { header: 'Tuesday', key: 'Tuesday' },
    { header: 'Wednesday', key: 'Wednesday' },
    { header: 'Thursday', key: 'Thursday' },
    { header: 'Friday', key: 'Friday' },
    { header: 'Saturday', key: 'Saturday' },
    { header: 'Sunday', key: 'Sunday' },
    { header: 'Total', key: 'Total' }
  ];

  return (
    <section className={styles.container}>
      <h2>Worked Hours</h2>
      <div className={styles.topContainer}>
        <Button>Before</Button>
        <Input
          className={styles.dateInput}
          id={'weekend'}
          register={register}
          type="date"
          error={errors.weekend}
        />
        <Button>Next</Button>
      </div>
      <div>
        <thead>
          <tr className={styles.headerRow}>
            {headers.map((header, index) => {
              return (
                <th key={index} className={styles.th}>
                  {header.header}
                </th>
              );
            })}
          </tr>
        </thead>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
            <div>
              <h4>Project 1 - Rol</h4>
            </div>
            <input
              type={'number'}
              error={errors.monday}
              onChange={handleInput}
              name="one"
              value={number.one}
            />
            <input
              type={'number'}
              error={errors.tuesday}
              onChange={handleInput}
              name="two"
              value={number.two}
            />
            <input
              type={'number'}
              error={errors.wednesday}
              onChange={handleInput}
              name="three"
              value={number.three}
            />
            <input
              type={'number'}
              error={errors.thursday}
              onChange={handleInput}
              name="four"
              value={number.four}
            />
            <input
              type={'number'}
              error={errors.friday}
              onChange={handleInput}
              name="five"
              value={number.five}
            />
            <input
              type={'number'}
              error={errors.saturday}
              onChange={handleInput}
              name="six"
              value={number.six}
            />
            <input
              type={'number'}
              error={errors.sunday}
              onChange={handleInput}
              name="seven"
              value={number.seven}
            />
            <input readOnly value={add} />
          </form>
          <div>
            <Button classes="block">Confirm</Button>
          </div>
        </>
      )}
      <Modal isOpen={showModal} isConfirmation={false} handleClose={() => closeHandler()}>
        <h2>{message}</h2>
      </Modal>
    </section>
  );
};

export default HoursForm;
