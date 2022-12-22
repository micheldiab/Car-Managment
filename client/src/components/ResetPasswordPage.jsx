import React from 'react';
import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import carimage from '../images/logincar.png'
import Axios from "axios";
export default function ResetPasswordPage()
{
    const [userEmail, setEmail] = useState("");
    const [status, setStatus] = useState("");


    const handleEmailChange=(e)=> {
        setEmail(e.target.value);
    }


    const validateEmail=()=> {
        let password="";
        if (userEmail.search(/@/) === -1) {
       
            setStatus("Your email must contains @");
            return;
          }

          
          Axios.post("https://car-managment.vercel.app/forgotPassword", {
            email: userEmail,
          }).then((response) => {
            if(response.data ===-1)
            setStatus("This email doesn't exist")
            else
            {
            setStatus("Check your email for the new password")
           password=response.data;
            }
          });
          console.log(password);
          Axios.post("https://car-managment.vercel.app/sendResetPassword", {
            email: userEmail,
            password:password,
          }).then((response) => {
         
          });

    }
return (
    <div className="container">

      
        <div className="row justify-content-center">

            <div className="col-xl-10 col-lg-12 col-md-9">

                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                       
                        <div className="row">
                            <div className="col-lg-6 d-none d-lg-block bg-password-image">
                            <img src={carimage} alt="carImage" />
                            </div>
                            <div className="col-lg-6">
                                <div className="p-4">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-2">Forgot Your Password?</h1>
                                        <p className="mb-4">We get it, stuff happens. Just enter your email address below
                                            and we'll send you a link to reset your password!</p>
                                    </div>
                                    <form className="user">
                                    <div className="form-group">
                                                <p className="text-danger">{status}</p>
                                    </div>
                                        <div className="form-group">
                                            <input type="email" className="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Enter Email Address..." onChange={handleEmailChange}/>
                                        </div>
                                        <div className='row'>
                                <div className='col-lg-3'></div>
                                <div className='col'>
                                <button type="button" className="btn btn-primary btn-user btn-block" onClick={validateEmail}>
                                            Reset Password
                                        </button>
                                          
                                            </div>
                                            </div>
                                        
                                    </form>
                                    <hr />
                                    <div className="text-center">
                                        <a className="small" href="register">Create an Account!</a>
                                    </div>
                                    <div className="text-center">
                                        <a className="small" href="login">Already have an account? Login!</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>

);
}