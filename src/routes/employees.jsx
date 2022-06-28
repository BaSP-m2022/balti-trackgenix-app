import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loading from 'Components/Shared/Loading';
const EmployeeWorkedHours = lazy(() => import('Components/Employee/WorkedHours'));
const EmployeeProfile = lazy(() => import('Components/Employee/UserProfile/index'));
const EmployeeHome = lazy(() => import('Components/Employee/Home'));

const employeeRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path={'/employee/home'} component={EmployeeHome} />
          <Route exact path={'/employee/:id'} />
          <Route exact path={'/employee/projects/:id'} />
          <Route exact path={'/employee/profile/:id'} component={EmployeeProfile} />
          <Route exact path={'/employee/workedhours/:id'} component={EmployeeWorkedHours} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default employeeRoutes;
