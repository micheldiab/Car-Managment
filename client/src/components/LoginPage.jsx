
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ReCAPTCHA from "react-google-recaptcha";
import carimage from '../images/logincar.png'
import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Axios from "axios";
export default function LoginPage()
{
    const md5 = require('md5');
    const history = useNavigate();
    const [userEmail, setEmail] = useState("");
    const [userPassword, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const [rememberMe, setRememberMe] = useState(0);
    
    const [reCAPTCHAValue, setReCAPTCHAValue] = useState(0);
    const [cookies, setCookie] = useCookies(['session']);

      useEffect(() => {
        // Check for a stored session in local storage
        const storedSession = localStorage.getItem('session');
        if (storedSession) {
          // If the session is stored, fill in the username and password
          const session = JSON.parse(storedSession);
          setEmail(session.userEmail);
          setPassword(session.userPassword);
          setRememberMe(1);
        }
      }, []); // Only run this effect once
   
    const onChange=(value)=> {
        setReCAPTCHAValue(value);
    }

    const handleEmailChange=(e)=> {
        setEmail(e.target.value);
    }

    const handlePasswordChange=(e)=>{
        setPassword(e.target.value);
    }



    const validateLogin=(event)=> {
        event.preventDefault();
   
        if(reCAPTCHAValue===0){
            setStatus("You must solve the ReCAPTCHA");
            return;
        }
        if (userEmail.search(/@/) === -1) {
       
            setStatus("Your email must contains @");
            return;
          }
        if(userPassword.length < 6) {  
            setStatus("Password length must be at least 6 characters");
            return;
         }  
         if (userPassword.search(/[A-Z]/) === -1) {
       
            setStatus("Your password needs at least one upper case letter");
            return;
          }

          if (userPassword.search(/[a-z]/) === -1) {
       
            setStatus("Your password needs at least one lower case letter");
            return;
          }

          if (userPassword.search (/[!@#\$%\^&\*]/) === -1) {
            setStatus("Your password needs a Special Character");
            return;
           }

           if (userPassword.search (/[0-9]/) === -1) {
            setStatus("Your password needs a number");
            return;
           }

 
           Axios.post("https://car-managment.vercel.app/userLogin", {
           email: userEmail,
           password: md5(userPassword)
         }).then((response) => {
           console.log(response);
           if(response.data===-1)  
           setStatus("The username or password is incorrect");
           else
           {
               setStatus("connected");
               history('/Dashboard');
         }});

         if (rememberMe) {
            localStorage.setItem('session', JSON.stringify({ userEmail, userPassword }));
        
        }
        
     
    }



return(
<div className="container">


<div className="row justify-content-center">

    <div className="col-xl-10 col-lg-12 col-md-9">

        <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
 
                <div className="row">
                    <div className="col-lg-6 d-none d-lg-block bg-login-image">
                        <img src={carimage} alt="carImage" />
                    </div>
                    <div className="col-lg-6">
                        <div className="p-4">
                            <div className="text-center">
                                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                            </div>
                            <form className="user">
                                     <div className="form-group">
                                                <p className="text-danger">{status}</p>
                                    </div>
                                <div className="form-group">
                                    <input type="email" className="form-control form-control-user"
                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                        placeholder="Enter Email Address..." value={userEmail} onChange={handleEmailChange}/>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control form-control-user"
                                        id="exampleInputPassword" placeholder="Password" value={userPassword} onChange={handlePasswordChange}/>
                                </div>
                                <div className="form-group">
                                    <div className="custom-control custom-checkbox small">
                                        <input type="checkbox" className="custom-control-input"   id="rememberMe"
          checked={rememberMe}
          onChange={(event) => setRememberMe(event.target.checked)}/>
                                        <label className="custom-control-label" for="customCheck">Remember
                                            Me</label>
                                    </div>
                                </div>
                                
                                <div className='row'>
                                <div className='col-lg-5'></div>
                                <div className='col'>
                                <button type="button" className="btn btn-primary btn-user btn-block"  onClick={validateLogin}>
                                                Login
                                            </button>
                                          
                                            </div>
                                            </div>
                            </form>
                            <br></br>
                            <div className='row'>
                                <div className='col-lg-2'></div>
                                <div className='col'>
                            <ReCAPTCHA sitekey="6Lf3Cp0jAAAAAF936leN2HcnAgwJTX6ux5_El-6S" onChange={onChange}/>
                            </div>
                            </div>
                            
                            <div className="text-center">
                                            <a className="small" href="forgot-password">Forgot Password?</a>
                                        </div>
                            <div className="text-center">
                                            <a className="small" href="register">Create an Account!</a>
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