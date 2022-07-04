import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Layout from 'Components/Layout';
import Loading from 'Components/Shared/Loading';

const Login = lazy(() => import('Components/Auth/Login'));

const SignUp = lazy(() => import('Components/Auth/RegisterForm'));

const authRoutes = [{ name: 'Log In', path: '/auth/login' }];

const AuthRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={authRoutes}>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path={`${url}/login`} component={Login} />
          <Route path={`${url}/sign-up`} component={SignUp} />
          <Redirect to={`${url}/login`} />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default AuthRoutes;
