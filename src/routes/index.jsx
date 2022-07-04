import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Loading from 'Components/Shared/Loading';

const AdminRoutes = lazy(() => import('routes/admins'));
const EmployeeRoutes = lazy(() => import('routes/employees'));
const AuthRoutes = lazy(() => import('routes/auth'));

const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/admin" component={AdminRoutes} />
          <Route path="/employee" component={EmployeeRoutes} />
          <Route path="/auth" component={AuthRoutes} />
          <Redirect to="/auth" />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
