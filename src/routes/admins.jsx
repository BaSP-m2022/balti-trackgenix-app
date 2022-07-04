import React, { lazy, Suspense } from 'react';
import { Switch, Redirect, useRouteMatch } from 'react-router-dom';
import PrivateRoute from 'routes/PrivateRoute';
import Layout from 'Components/Layout';

const SuperAdmins = lazy(() => import('Components/SuperAdmins/List'));
const Admins = lazy(() => import('Components/Admins/List'));
const Employees = lazy(() => import('Components/Employees/List'));
const Tasks = lazy(() => import('Components/Tasks/List'));
const Projects = lazy(() => import('Components/Projects/List'));
const TimeSheets = lazy(() => import('Components/TimeSheets/List'));

const adminRoutes = [
  { path: '/admin/admins', name: 'Admins' },
  { path: '/admin/super-admins', name: 'Super-admins' },
  { path: '/admin/employees', name: 'Employees' },
  { path: '/admin/projects', name: 'Projects' },
  { path: '/admin/time-sheets', name: 'Time-sheets' },
  { path: '/admin/tasks', name: 'Tasks' }
];

const AdminRoutes = () => {
  const { url } = useRouteMatch();

  'Admin routes:', AdminRoutes;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout routes={adminRoutes}>
        <Switch>
          <PrivateRoute path={`${url}/super-admins`} component={SuperAdmins} />
          <PrivateRoute path={`${url}/admins`} component={Admins} />
          <PrivateRoute path={`${url}/employees`} component={Employees} />
          <PrivateRoute path={`${url}/projects`} component={Projects} />
          <PrivateRoute path={`${url}/time-sheets`} component={TimeSheets} />
          <PrivateRoute path={`${url}/tasks`} component={Tasks} />
          <Redirect to={`${url}/admins`} />
        </Switch>
      </Layout>
    </Suspense>
  );
};

export default AdminRoutes;
