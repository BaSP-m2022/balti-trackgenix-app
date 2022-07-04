import React, { Suspense, lazy } from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import Loading from 'Components/Shared/Loading';
import PrivateRoute from './PrivateRoute';

const EmployeeHome = lazy(() => import('Components/Employee/Home'));
const EmployeeWorkedHours = lazy(() => import('Components/Employee/WorkedHours'));
const EmployeeProfile = lazy(() => import('Components/Employee/UserProfile'));
const EmployeeMyProjects = lazy(() => import('Components/Employee/MyProjects'));

const employeeRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <PrivateRoute exact path={`${url}/employee/home`} component={EmployeeHome} />
        <PrivateRoute exact path={`${url}/employee/:id`} />
        <PrivateRoute exact path={`${url}/employee/projects/:id`} component={EmployeeMyProjects} />
        <PrivateRoute exact path={`${url}/employee/profile/:id`} component={EmployeeProfile} />
        <PrivateRoute
          exact
          path={`${url}/employee/workedhours/:id`}
          component={EmployeeWorkedHours}
        />
      </Switch>
    </Suspense>
  );
};

export default employeeRoutes;
