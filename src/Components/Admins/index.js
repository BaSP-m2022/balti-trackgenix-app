import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './admins.module.css';
import List from '../Shared/List/List';
import Button from '../Shared/Button/Button';
import Loading from '../Shared/Loading/Loading';

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState([true]);
  const serverPath = '/admins';
  const config = [
    {
      header: 'First Name',
      type: 'text',
      key: 'firstName',
      required: true
    },
    {
      header: 'Last Name',
      type: 'text',
      key: 'lastName',
      required: true
    },
    {
      header: 'Email',
      type: 'email',
      key: 'email',
      required: true
    },
    {
      header: 'Password',
      type: 'password',
      key: 'password',
      required: true
    },
    {
      header: 'Is Active?',
      type: 'checkbox',
      key: 'isActive',
      required: false
    }
  ];

  const headers = [
    { header: 'First name', key: 'firstName' },
    { header: 'Last name', key: 'lastName' },
    { header: 'Email', key: 'email' },
    { header: 'is Active?', key: 'isActive' }
  ];

  useEffect(() => {
    getAdmins();
  }, []);

  const getAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const body = await response.json();
      setAdmins(body.data);
      setIsLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  const deleteAdmin = (_id) => {
    setAdmins([...admins.filter((admin) => admin._id !== _id)]);
  };

  const formatListData = (responseData) => {
    const data = responseData.map((admin) => {
      return {
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        isActive: admin.isActive.toString()
      };
    });
    return data;
  };

  return isLoading ? (
    <>
      <h2>Admins</h2>
      <Loading />
    </>
  ) : (
    <section className={styles.container}>
      <h2>Admins</h2>
      <div>
        <Link
          to={{
            pathname: '/admins/form',
            linkData: config,
            itemData: '',
            DBPath: serverPath
          }}
          className={styles.LinkReset}
        >
          <Button classes="block">Create Admin</Button>
        </Link>
      </div>
      <List
        data={formatListData(admins)}
        headers={headers}
        resource={serverPath}
        deleteAdmin={deleteAdmin}
      />
    </section>
  );
};

export default Admins;
