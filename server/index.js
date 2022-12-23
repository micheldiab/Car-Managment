const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());
const md5 = require('md5');

const db = mysql.createConnection({
  user: "sql6585805",
  host: "sql6.freesqldatabase.com",
  password: "K5lfHEzg1T",
  database: "sql6585805",
});



  app.get("/cars", (req, res) => {
    db.query("SELECT * FROM cars", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  app.post("/deleteRow", (req, res) => {
    const treatNumber = req.body.treatNumber;
  
    db.query("Delete FROM cars WHERE treatNumber = ?", [treatNumber] ,(err, result) => {
      if (result.length===0) {
        res.send("-1");
      } else {
        res.send("0");
        console.log(result);
      }
    });
  });
  app.post("/editRow", (req, res) => {
    const treatNumber = req.body.treatNumber;
    const valInformation = req.body.valInformation;
    const valDate = req.body.valDate;
    const valEmail = req.body.valEmail;
    const valCarNumber = req.body.valCarNumber;

db.query("UPDATE cars SET Information = ?,Date=?,email=?,carNumber=? WHERE treatNumber = ?", [valInformation, valDate,valEmail,valCarNumber,treatNumber] 
,(err, result) => {

})});

  app.post("/addUser", (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
  
    db.query(
      "INSERT users(`firstName`,`lastName`, `email`,`password`) VALUES (?,?,?,?)",
      [firstName, lastName, email,password],
      (err, result) => {
        if (err) {
          res.send("-1");
        } else {
          res.send("0");
        }
      }
    );
  });


  app.post("/addCar", (req, res) => {
   
    const Information = req.body.Information;
    const Date = req.body.Date;
    const email = req.body.email;
    const carNumber = req.body.carNumber;
    db.query(
      "INSERT cars(`Information`, `Date`,`email`,`carNumber`) VALUES (?,?,?,?)",
      [Information, Date,email ,carNumber],
      (err, result) => {
        if (err) {
          res.send("-1");
        } else {
          res.send("0");
        }
      }
    );
  });

  


  


  app.post("/userLogin", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    console.log(password);
    db.query("SELECT * FROM users WHERE email = ? and password = ?", [email, password] ,(err, result) => {
      if (result.length===0) {
        res.send("-1");
      } else {
        res.send("0");
       
      }
    });
  });

  
  app.post("/sendResetPassword", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const subject="Reset password"
    let text="Your new password is:";
    text+=password;
   sendEmail(email,subject,text);
  
  });


  app.post("/sendEmail", (req, res) => {
    const email = req.body.email;
    const subject="Sign up"
    const text="Your sign up was successful!"
   sendEmail(email,subject,text);
  
  });

  app.post("/forgotPassword", (req, res) => {
    const email = req.body.email;
    const newPassword=generatePassword();
    const pass=md5(newPassword);
    

    db.query("Select * FROM users WHERE email = ?", [email] 
    ,(err, result) => {
      if (err)
      {
       throw err;
      }

      else if(result.length===0)
      res.send("-1");
      else
      {
    db.query("UPDATE users SET password = ? WHERE email = ?", [pass,email] 
    ,(err, result) => {
   
       res.send(newPassword);
      
    
    });
  }

  });
});



  const specialCharacters = "!@#$%^&*";
const numbers = "0123456789";
const lowercaseCharacters = "abcdefghijklmnopqrstuvwxyz";
const uppercaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function generatePassword() {
  let password="";
  for (let i=0;i<2;i++)
  {
   password += specialCharacters[Math.floor(Math.random()*specialCharacters.length)];
   password += numbers[Math.floor(Math.random()*numbers.length)];
   password += lowercaseCharacters[Math.floor(Math.random()*lowercaseCharacters.length)];
   password += uppercaseCharacters[Math.floor(Math.random()*uppercaseCharacters.length)];
  }

  return password;
}



  const nodemailer = require('nodemailer');

  // Set up the email transport

  function sendEmail(email,subject,text)
  {
    return new Promise((resolve, reject) => {
      
  const transporter = nodemailer.createTransport({
  service:'gmail',
    auth: {
      user: 'mrowatasem@gmail.com',
      pass: 'grzlmxgacwkqiofs'
    }
  });
  
  // Define the email options
  const mailOptions = {
    from: 'mrowatasem@gmail.com',
    to: email,
    subject: subject,
    text: text,
  };
  
  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      return resolve({message:"send"});
    }
  });
})
  }


  db.connect((err) => {
    if (err) console.log("Enable to Connected to MySQL Server!");
    console.log("Connected to MySQL Server!");
  });
  app.listen(process.env.PORT || 3001, () => {
    console.log("Yey, your server is running on port 3001");
  });
