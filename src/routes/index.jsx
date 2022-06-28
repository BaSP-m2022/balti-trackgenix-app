import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Layout from 'Components/Layout';
import Loading from 'Components/Shared/Loading';

/*
const Admins = lazy(() => import('Components/Admins/List'));
const AdminsForm = lazy(() => import('Components/Admins/Form'));
const SuperAdmins = lazy(() => import('Components/SuperAdmins/List'));
const SuperAdminsForm = lazy(() => import('Components/SuperAdmins/Form'));
const Home = lazy(() => import('Components/Home'));
const Projects = lazy(() => import('Components/Projects/List'));
const ProjectsForm = lazy(() => import('Components/Projects/Form'));
const Employees = lazy(() => import('Components/Employees/List'));
const EmployeesForm = lazy(() => import('Components/Employees/Form'));
const TasksForm = lazy(() => import('Components/Tasks/Form'));
const TasksList = lazy(() => import('Components/Tasks/List'));
const TimeSheetsList = lazy(() => import('Components/TimeSheets/List'));
const TimeSheetsForm = lazy(() => import('Components/TimeSheets/Form'));
const EmployeeProjects = lazy(() => import('Components/Employee/MyProjects'));
const EmployeeProfile = lazy(() => import('Components/Employee/UserProfile/index'));
const EmployeeHome = lazy(() => import('Components/Employee/Home'));
const EmployeeWorkedHours = lazy(() => import('Components/Employee/WorkedHours'));*/

/*const Routes = () => {
  return (
    <Router>
    <Layout>
    <Suspense fallback={<Loading />}>
    <Switch>
    <Route exact path={'/'} component={Home} />
    <Route exact path={'/admins'} component={Admins} />
    <Route exact path={'/admins/form'} component={AdminsForm} />
    <Route exact path={'/admins/form/:id'} component={AdminsForm} />
    <Route exact path={'/super-admins'} component={SuperAdmins} />
    <Route exact path={'/super-admins/form'} component={SuperAdminsForm} />
    <Route exact path={'/super-admins/form/:id'} component={SuperAdminsForm} />
    <Route exact path={'/employees'} component={Employees} />
    <Route exact path={'/employees/form'} component={EmployeesForm} />
    <Route exact path={'/employees/form/:id'} component={EmployeesForm} />
    <Route exact path={'/projects'} component={Projects} />
    <Route exact path={'/projects/form'} component={ProjectsForm} />
    <Route exact path={'/projects/form/:id'} component={ProjectsForm} />
    <Route exact path={'/tasks'} component={TasksList} />
    <Route exact path={'/tasks/form/'} component={TasksForm} />
    <Route exact path={'/tasks/form/:id'} component={TasksForm} />
    <Route exact path={'/timesheets'} component={TimeSheetsList} />
    <Route exact path={'/timesheets/form/'} component={TimeSheetsForm} />
    <Route exact path={'/timesheets/form/:id'} component={TimeSheetsForm} />
    <Route exact path={'/employee'} component={EmployeeHome} />
    <Route exact path={'/employee/projects'} component={EmployeeProjects} />
    <Route exact path={'/employee/profile'} component={EmployeeProfile} />
    <Route exact path={'/employee/workedhours'} component={EmployeeWorkedHours} />
    </Switch>
    </Suspense>
    </Layout>
    </Router>
    );
  };
  */

const AdminRoutes = lazy(() => import('Routes/admin'));
const EmployeeRoutes = lazy(() => import('Routes/employee'));
const AuthRoutes = lazy(() => import('Routes/auth'));

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
