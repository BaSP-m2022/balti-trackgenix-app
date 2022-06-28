import React, { Suspense, lazy } from 'react';
import { Switch, Redirect, useRouteMatch } from 'react-router-dom';
import Loading from 'Components/Shared/Loading';
import PrivateRoute from './PrivateRoute';

const EmployeeWorkedHours = lazy(() => import('Components/Employee/WorkedHours'));
const EmployeeProfile = lazy(() => import('Components/Employee/UserProfile/index'));
const EmployeeHome = lazy(() => import('Components/Employee/Home'));

const employeeRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <PrivateRoute exact path={'/employee/home'} component={EmployeeHome} />
        <PrivateRoute exact path={'/employee/:id'} />
        <PrivateRoute exact path={'/employee/projects/:id'} />
        <PrivateRoute exact path={'/employee/profile/:id'} component={EmployeeProfile} />
        <PrivateRoute exact path={'/employee/workedhours/:id'} component={EmployeeWorkedHours} />
      </Switch>
    </Suspense>
  );
};

export default employeeRoutes;
