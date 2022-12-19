    import React from "react";
    import 'bootstrap/dist/css/bootstrap.css';
    import './Dashboard.css';

    export default function Dashboard()
    {

        return (
            <div className="container-fluid">
                <div className="row">
                <div className="col-auto min-vh-100 bg-secondary">
    <ul>
        <li>
            <a className="nav-link px-2">
            <i className="bi-house" />
            <span className="ms-1 d-none d-sm-inline" style={{color:"blue",fontFamily:"bold",fontSize:"28px"}}>    About Us    </span>
    
        

                </a>

        </li>

        <li>
            <a className="nav-link px-2">
            <i className="bi-house" />
            <span className="ms-1 d-none d-sm-inline"  style={{color:"blue",fontFamily:"bold",fontSize:"28px"}}>    LogOut    </span>
    
        

                </a>

        </li>

        </ul>


                </div>
                </div>
            </div>




        );
    }