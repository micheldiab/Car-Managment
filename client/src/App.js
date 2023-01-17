
import './App.css';
import { Route, Routes } from "react-router-dom";
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import Page404 from './components/404Page';
import Table from './components/Table';
import AboutUs from './components/AboutUS';
import ProtectedRoutes from "./ProtectedRoutes";


function App() {

  return (

    <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/forgot-password" element={<ResetPasswordPage />} />
    <Route path="/register"element={<RegistrationPage />} />
    <Route path="*"element={<Page404 />} />

    <Route element={<ProtectedRoutes />}>
    <Route path="/Dashboard"element={<Table />} />
    <Route path='AboutUs' element={<AboutUs />} />

    </Route>
  </Routes>
  );
}

export default App;
