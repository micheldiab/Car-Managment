import React from "react";
import 'bootstrap/dist/css/bootstrap.css';




export default function Dashboard() {
  return (

    <div className="container-fluid" style={{ backgroundColor: 'blue' }}>
      <div className="d-flex justify-content-center mb-2">

        <div className="p-2 -info d-flex align-items-center" style={{fontFamily:'bold'}}>
          <button className="btn btn-primary btn-block" type="button">About US</button>
        </div>
        <div className="p-2 -warning">
          <button className="btn btn-primary btn-block" type="button">Dashboard</button>
        </div>
        
      </div>
      
    </div>
       
         
  );
}



