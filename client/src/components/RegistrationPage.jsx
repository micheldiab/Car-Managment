import React from 'react';
import {useState} from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import 'bootstrap/dist/css/bootstrap.css';
import carimage from '../images/logincar.png'
import Axios from "axios";
export default function RegistrationPage()
{
    const md5 = require('md5');
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [userEmail, setEmail] = useState("");
    const [userPassword, setPassword] = useState("");
    const [repeatedPassword ,setRepeatedPassword] = useState("");
    const [status, setStatus] = useState("");
    const [reCAPTCHAValue, setReCAPTCHAValue] = useState(0);

      const handleFirstNameChange=(e)=> {
        setFirstName(e.target.value);
    }
    const handleLastNameChange=(e)=> {
        setLastName(e.target.value);
    }


    const handleEmailChange=(e)=> {
        setEmail(e.target.value);
    }

    const handlePasswordChange=(e)=>{
        setPassword(e.target.value);
    }

    const handleRepeatedPassword=(e)=>{
        setRepeatedPassword(e.target.value);
    }
    const onChange=(value)=> {
        setReCAPTCHAValue(value);
    }


    async function validateSignUp(event){
        event.preventDefault()
        let regName= /^[a-zA-Z]+$/;
        if(!regName.test(firstName)){
            setStatus("Your First Name must contains letters only");
            return;
      }
      if(!regName.test(lastName)){
        setStatus("Your Last Name must contains letters only");
        return;
      }

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
           if (!(repeatedPassword === userPassword)) {
            setStatus("Your passwords don't match");
            return;
           }
    
           
           Axios.post("http://localhost:3001/addUser", {
            firstName: firstName,
            lastName: lastName,
            email: userEmail,
            password:  md5(userPassword)
          }).then((response) => {
            console.log(response);
            if(response.data===-1)
            {
            setStatus("The email is already in use ");
            return;
            }
            else
            {
            window.alert("Email:" + userEmail+"\n" +"Password:" +userPassword);
          }});
    
    
          Axios.post("http://localhost:3001/sendEmail", {
            email: userEmail,
          }).then((response) => {
          });
       
         
    }

return(
    <div className="container">

        <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
               
                <div className="row">
                    <div className="col-lg-5 d-none d-lg-block bg-register-image">
                    <img src={carimage} alt="carImage" />
                    </div>
                    <div className="col-lg-7">
                        <div className="p-2">
                            <div className="text-center">
                                <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                            </div>
                            <form className="user">
                            <div className="form-group">
                                                <p className="text-danger">{status}</p>
                                    </div>
                                <div className="form-group row">
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                        <input type="text" className="form-control form-control-user" id="exampleFirstName"
                                            placeholder="First Name" onChange={handleFirstNameChange}/>
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control form-control-user" id="exampleLastName"
                                            placeholder="Last Name" onChange={handleLastNameChange}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control form-control-user" id="exampleInputEmail"
                                        placeholder="Email Address" onChange={handleEmailChange}/>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                        <input type="password" className="form-control form-control-user"
                                            id="exampleInputPassword" placeholder="Password" onChange={handlePasswordChange}/>
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="password" className="form-control form-control-user"
                                            id="exampleRepeatPassword" placeholder="Repeat Password"  onChange={handleRepeatedPassword}/>
                                    </div>
                                </div>
                                <div className='row'>
                                <div className='col-lg-4'></div>
                                <div className='col'>
                                <button type="button" className="btn btn-primary btn-user btn-block"  onClick={validateSignUp}>
                                Register Account
                                            </button>
                                          
                                            </div>
                                            </div>
                    
                    
                                
                                <div className='row'>
                                <div className='col-lg-3'></div>
                                <div className='col'>
                            <ReCAPTCHA sitekey="6LdZEOUZAAAAABOhim6Lc8XSEb34nczBkgB2LeOe" onChange={onChange}/>
                            </div>
                            </div>
                            </form>
                            <hr />
                            
                            <div className="text-center">
                                <a className="small" href="forgot-password">Forgot Password?</a>
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

);

}