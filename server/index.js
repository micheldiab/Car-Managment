const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

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
    const firstName = req.body.firstName
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
        console.log(result);
      }
    });
  });


  const nodemailer = require('nodemailer');

  // Set up the email transport
  const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: 'mrowatasem@outlook.com',
      pass: 'odetallah2022'
    }
  });
  
  // Define the email options
  const mailOptions = {
    from: 'mrowatasem@gmail.com',
    to: 'mishomars1@gamil.com',
    subject: 'Sign Up Successful',
    text: 'Your sign up was successful!',
    html: '<p>Your sign up was successful!</p>'
  };
  
  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
















  db.connect((err) => {
    if (err) console.log("Enable to Connected to MySQL Server!");
    console.log("Connected to MySQL Server!");
  });
  app.listen(process.env.PORT || 3001, () => {
    console.log("Yey, your server is running on port 3001");
  });
