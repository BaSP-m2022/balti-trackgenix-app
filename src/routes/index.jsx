import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

const AdminRoutes = lazy(() => import('routes/admins'));
const EmployeeRoutes = lazy(() => import('routes/employees'));
const AuthRoutes = lazy(() => import('routes/auth'));

const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
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
