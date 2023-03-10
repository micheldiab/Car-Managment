import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../ProtectedRoutes"


export default function Dashboard() {

  const history = useNavigate();
  const { user,login,logout } = useAuth();
  
const handleDashboard=()=> {
  history('/Dashboard');
}

const handleAboutUs=()=> {
  history('/AboutUs');
}
const handleLogOut=()=> {
  localStorage.clear();
  logout();
  history('/login');
}

  return (

    <div className="container-fluid" style={{ backgroundColor: 'blue' }}>
      <div className="d-flex justify-content-center mb-2">

        <div className="p-2 -info d-flex align-items-center" style={{fontFamily:'bold'}}>
          <button onClick={handleAboutUs} className="btn btn-primary btn-block" type="button">About US</button>
        </div>
        <div className="p-2 -warning">
          <button onClick={handleDashboard} className="btn btn-primary btn-block" type="button">Dashboard</button>
        </div>
        <div className="p-2 -info d-flex align-items-center" style={{fontFamily:'bold'}}>
          <button onClick={handleLogOut} className="btn btn-primary btn-block" type="button">LogOut</button>
          </div>
      </div>
      
    </div>
       
         
  );
}



