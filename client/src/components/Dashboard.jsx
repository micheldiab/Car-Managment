import React from "react";
import 'bootstrap/dist/css/bootstrap.css';


export default function Dashboard() {
  return (
    <div classNameName="container-fluid">
         <div style={{textAlign: "center"}}>
    <div className="d-flex justify-content-center bg-secondary mb-3">
  <div className="p-2 bg-info">
    <button>Flex item 1</button></div>
  <div className="p-2 bg-warning"><button>Flex item 2</button></div>
  <div className="p-2 bg-primary"><button>Flex item 3</button></div>
</div>
</div>
    </div>
  );
}
