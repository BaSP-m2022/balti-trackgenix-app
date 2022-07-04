import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Layout from 'Components/Layout';

// const Login = lazy(() => import('Components/Auth/Login'));

//const SignUp = lazy(() => import('Components/Auth/Sign-up/index'));

const authRoutes = [{ name: 'Log In', path: '/auth/login' }];

const AuthRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={authRoutes}>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path={`${url}/login`} />
          <Route path={`${url}/sign-up`} />
          <Redirect to={`${url}/login`} />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default AuthRoutes;
