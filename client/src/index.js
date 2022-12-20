import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import Page404 from './components/404Page';
import DashboardPage from './components/Dashboard';
import Table from './components/Table';
import 'bootstrap/dist/css/bootstrap.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   {/* <LoginPage /> */}
   {/* <RegistrationPage /> */}
   {/* <ResetPasswordPage /> */}
   {/* <Page404 /> */}


   <Table /> 
 
   
   {/*  */}
 
  </React.StrictMode>
);



