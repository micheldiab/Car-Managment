import React from 'react';
import {useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Table.css';
import Dashboard from './Dashboard';
import Axios from "axios";

export default function  Table() 
{


  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState('asc');
  const [editingId, setEditingId] = useState(null);
  const [information, setInformation] = useState("");
  const [email, setEmail] = useState("");
  const [carNumber, setCarNumber] = useState();
  const [date, setDate] = useState();
  const [inputValues, setInputValues] = useState({});
  const [status, setStatus] = useState("");

 const handleAddRow =() =>
 {


  Axios.post("/addCar", {
    
  Information:information,
    Date:date,
    email:email,
    carNumber:carNumber
      }).then((response) => {
        

        Axios.get("/cars")
        .then((response) => {
       
          setData(response.data);
          setFilteredData(
            Array.from(response.data).filter((row) => {
              return (
                row.treatNumber.toString().toLowerCase().startsWith(search.toLowerCase()) ||
                row.Information.toLowerCase().startsWith(search.toLowerCase()) ||
                row.Date.toLowerCase().startsWith(search.toLowerCase()) ||
                row.email.toLowerCase().startsWith(search.toLowerCase()) ||
                row.carNumber.toLowerCase().startsWith(search.toLowerCase())
              );
            })
          );
          setCurrentRecords(Array.from(response.data).slice(indexOfFirstRecord, indexOfLastRecord));
        })
        .catch((error) => console.error(error));
       
        setStatus("Row was added Successfully!");
       
      setInformation("");
      setCarNumber("");
      setEmail("");
      setDate("");

});



 }


 



  const handleInformation =(event) =>
  {
setInformation(event.target.value);
  }
  const handleEmail =(event) =>
  {
    setEmail(event.target.value);
  }
  const handleCarNumber=(event) =>
  {
    setCarNumber(event.target.value);
  }
  const handleDate=(event) =>
  {
    setDate(event.target.value);
  }


  const handleEditClick = (id) => {

    setEditingId(id);
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setInputValues({ ...inputValues, [name]: value });
    
 
  }
  const handleSaveClick = (id) => {
   
    const updatedData = filteredData.map(row => {
      if (row.treatNumber=== id) {
        return { ...row, ...inputValues };
      
      }
   
      return row;
    })
    

    Axios.post("/editRow", {
              treatNumber: id,
              valInformation:updatedData[id-1].Information,
              valDate:updatedData[id-1].Date,
              valEmail:updatedData[id-1].email,
              valCarNumber:updatedData[id-1].carNumber,
                }).then((response) => {
      });




    setFilteredData(updatedData);
    setCurrentRecords(updatedData.filter((row) => {
      return (
        row.treatNumber.toString().toLowerCase().startsWith(search.toLowerCase()) ||
        row.Information.toLowerCase().startsWith(search.toLowerCase()) ||
        row.Date.toLowerCase().startsWith(search.toLowerCase())||
        row.email.toLowerCase().startsWith(search.toLowerCase())||
        row.carNumber.toLowerCase().startsWith(search.toLowerCase())
      )}).slice(currentPage * recordsPerPage- recordsPerPage, currentPage * recordsPerPage));
  
    setEditingId(null);
  }

 
  const [data, setData] = useState([]);
  const [filteredData,setFilteredData]= useState([]);
  const [currentRecords,setCurrentRecords]= useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(9);
  let indexOfLastRecord = currentPage * recordsPerPage;
  let  indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

useEffect(() => {
  Axios.get("/cars")
    .then((response) => {
   
      setData(response.data);
      setFilteredData(
        Array.from(response.data).filter((row) => {
          return (
            row.treatNumber.toString().toLowerCase().startsWith(search.toLowerCase()) ||
            row.Information.toLowerCase().startsWith(search.toLowerCase()) ||
            row.Date.toLowerCase().startsWith(search.toLowerCase()) ||
            row.email.toLowerCase().startsWith(search.toLowerCase()) ||
            row.carNumber.toLowerCase().startsWith(search.toLowerCase())
          );
        })
      );
      setCurrentRecords(Array.from(response.data).slice(indexOfFirstRecord, indexOfLastRecord));
    })
    .catch((error) => console.error(error));
   
}, []); // The empty array ensures that the effect only runs on mount


 




let totalPages = Math.ceil(filteredData.length / recordsPerPage);



function handlePagePlus(pageNumber) {
  if(pageNumber<=totalPages)
{
  setCurrentPage(pageNumber);
  
  setCurrentRecords(filteredData.filter((row) => {
    return (
      row.treatNumber.toString().toLowerCase().startsWith(search.toLowerCase()) ||
      row.Information.toLowerCase().startsWith(search.toLowerCase()) ||
      row.Date.toLowerCase().startsWith(search.toLowerCase())||
      row.email.toLowerCase().startsWith(search.toLowerCase())||
      row.carNumber.toLowerCase().startsWith(search.toLowerCase())
    )}).slice(pageNumber * recordsPerPage- recordsPerPage, pageNumber * recordsPerPage));
}
}


function handlePageMinus(pageNumber) {
  if(pageNumber>0)
  {
  setCurrentPage(pageNumber);
 setCurrentRecords(filteredData.filter((row) => {
    return (
      row.treatNumber.toString().toLowerCase().startsWith(search.toLowerCase()) ||
      row.Information.toLowerCase().startsWith(search.toLowerCase()) ||
      row.Date.toLowerCase().startsWith(search.toLowerCase())||
      row.email.toLowerCase().startsWith(search.toLowerCase())||
      row.carNumber.toLowerCase().startsWith(search.toLowerCase())
    )}).slice(pageNumber * recordsPerPage- recordsPerPage, pageNumber * recordsPerPage));

  }
}

function handleSearch(event)
{
  
  setSearch(event.target.value);
  const data=filteredData.filter((row) => {
    return (
      row.treatNumber.toString().toLowerCase().startsWith(event.target.value.toLowerCase()) ||
      row.Information.toLowerCase().startsWith(event.target.value.toLowerCase()) ||
      row.Date.toLowerCase().startsWith(event.target.value.toLowerCase())||
      row.email.toLowerCase().startsWith(event.target.value.toLowerCase())||
      row.carNumber.toLowerCase().startsWith(event.target.value.toLowerCase())
    )}).slice(indexOfFirstRecord, indexOfLastRecord);
  setCurrentRecords(data);
    setCurrentPage(1);
    console.log(event.target.value);

}


  function sortByNumber() {
    let a1;
    let b1;
    const sortedData = Array.from(currentRecords).sort((a, b) => {
      if (sortOrder === 'asc') {
       a1=parseInt(a.treatNumber);
       b1=parseInt(b.treatNumber);
        return a1 > b1 ? 1 : -1;
      } else {
        return a1< b1 ? 1 : -1;
      }
    });
    setCurrentRecords(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  }
  
  function sortByInformation() {
    const sortedData = Array.from(currentRecords).sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.Information > b.Information ? 1 : -1;
      } else {
        return a.Information < b.Information? 1 : -1;
      }
    });
    setCurrentRecords(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  }
  
  function sortByDate() {
    const sortedData = Array.from(currentRecords).sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.Date > b.Date ? 1 : -1;
      } else {
        return a.Date < b.Date ? 1 : -1;
      }
    });
    setCurrentRecords(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  }
  function sortByWorkerEmail() {
    const sortedData = Array.from(currentRecords).sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.email > b.email ? 1 : -1;
      } else {
        return a.email < b.email ? 1 : -1;
      }
    });
    setCurrentRecords(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  }
  function sortByCarNumber() {
    let a1;
    let b1;
    const sortedData = Array.from(currentRecords).sort((a, b) => {
      if (sortOrder === 'asc') {
        a1=parseInt(a.treatNumber);
        b1=parseInt(b.treatNumber);
        return a1 > b1 ? 1 : -1;
      } else {
        return a1 < b1 ? 1 : -1;
      }
    });
    setCurrentRecords(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  }
  

  function deleteRow(id) {
  
    setFilteredData(filteredData.filter(row=> row.treatNumber !== id));
    const data = filteredData.filter(row=> row.treatNumber !== id);
    setCurrentRecords(data.slice(indexOfFirstRecord, indexOfLastRecord));
    Axios.post("/deleteRow", {
      treatNumber:id,
    });

  }

  
 
    return (
      
      <div className="container-fluid">
        
          <Dashboard/>

    <input 
      type="text"
      className="form-control"
      placeholder="Search..."
      onChange={handleSearch}
    />
   
    <table className="table table-striped" style={{ resize: 'both', minWidth: '100px', maxWidth: '3000px' }}>
      <thead>
        <tr style={{cursor:"pointer",background:"blue",border:"solid 5px black",color:"white"}}>
        <th style={{ resize: 'both', minWidth: '20px', maxWidth: '600px' }}>Treatment Info</th>
        <th style={{ resize: 'both', minWidth: '20px', maxWidth: '600px' }}>Date</th>
        <th style={{ resize: 'both', minWidth: '20px', maxWidth: '600px' }}>Worker email </th>
        <th style={{ resize: 'both', minWidth: '20px', maxWidth: '600px' }}>Car Num</th>
        <th style={{ resize: 'both', minWidth: '20px', maxWidth: '600px' }}>Action</th>
        </tr>
      </thead>
      <tbody>
      <tr style={{ resize: 'both', minWidth: '50px', maxWidth: '600px' }}>
                <td style={{ resize: 'both', minWidth: '10px', maxWidth: '600px' }}>
                  <input
                    type="text"
                    value={information}
                    name="Information"
                    onChange={handleInformation}
                    required
                  
                    
                  />
                </td>
                <td style={{ resize: 'both', minWidth: '20px', maxWidth: '600px' }}>
                  <input
                    type="datetime-local"
                    value={date}
                    name="Date"
                    onChange={handleDate}
                    required
                    
                  />
                </td>
                <td style={{ resize: 'both', minWidth: '20px', maxWidth: '600px' }}>
                  <input
                    type="text"
                    value={email}
                    name="email"
                    onChange={handleEmail}
                    required
                  />
                </td>
                <td style={{ resize: 'both', minWidth: '20px', maxWidth: '600px' }}>
                {/* <input type="text" name="carNumber" value={carNumber} onChange={handleCarNumber}  required /> */}
           
                        <input type="text" name="carNumber" onChange={handleCarNumber}  value={carNumber}
                            required />
                </td>
              
                <td>
                <button type="button" onClick={handleAddRow} disabled={!information || !date || !email || !carNumber || !email.includes('@')}>Add row</button>

                </td>
                </tr>
      
      </tbody>
    </table>


    <div className="alert alert-success" role="alert">
                                       {status}
      
                                    </div>






<table className="table table-striped">
      <thead>
        <tr style={{cursor:"pointer",background:"blue",border:"solid 5px black",color:"white"}}>
        <th  onClick={() => sortByNumber()}>Treatment Num</th>
        <th onClick={() => sortByInformation()}>Treatment Info</th>
        <th onClick={() => sortByDate()}>Date</th>
        <th onClick={() => sortByWorkerEmail()}>Worker email </th>
        <th onClick={() => sortByCarNumber()}>Car Num</th>
        <th >Action</th>
        </tr>
      </thead>
      <tbody>
        {Array.from(currentRecords).map(row => (
          <tr key={row.treatNumber}>
            {editingId === row.treatNumber? (
              <>
               <td>
                  <label>
              {row.treatNumber}</label>
     
                    
                  
                </td>
                <td>
                  <input
                    type="text"
                    defaultValue={row.Information}
                    name="Information"
                    onChange={handleInputChange}
     
                    
                  />
                </td>
                <td>
                  <input
                    type="datetime-local"
                    defaultValue={row.Date}
                    name="Date"
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    defaultValue={row.email}
                    name="email"
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    defaultValue={row.carNumber}
                    name="carNumber"
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <button type="button" onClick={() => handleSaveClick(row.treatNumber)}>Save</button>

                </td>
              </>
            ) : (
              <>
                <td>{row.treatNumber}</td>
                <td>{row.Information}</td>
                <td>{row.Date}</td>
                <td>{row.email}</td>
                <td>{row.carNumber}</td>
 
                <td>
                  <button type="button" onClick={() => handleEditClick(row.treatNumber)}>Edit</button>
                  <button onClick={() => deleteRow(row.treatNumber)}>Delete</button>
                  <button type="button" onClick={() => handleSaveClick(row.treatNumber)}>Save</button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>

    <div className='row d-flex justify-content-between'>
  <div className='col'> 
    <p className="d-block">Showing {(currentRecords.length===0 ? 0 : (currentPage-1)*recordsPerPage +1)} to {filteredData.length>(currentPage*recordsPerPage) ? (currentPage*recordsPerPage) : filteredData.length } of {filteredData.length} entries</p>
  </div>
  <div className='col'>
    <nav aria-label="Page navigation example" className="d-block">
      <ul className="pagination flex-wrap-nowrap">

   
        
        <li className="page-item d-flex align-items-center">
          <a
            className="page-link"
            href="#"
            onClick={() => handlePageMinus(currentPage - 1)}
          >
            Previous
          </a>
        </li>
        <ul className="pagination">
          {[...Array(totalPages)].map((page, index) => (
            <li className="page-item d-flex align-items-center" key={index}>
              <a
                className="page-link"
                href="#"
                onClick={() => handlePagePlus(index + 1)}
              >
                {index + 1}
              </a>
            </li>
          ))}
        </ul>
        <li className="page-item d-flex align-items-center">
          <a
            className="page-link"
            href="#"
            onClick={() => handlePagePlus(currentPage + 1)}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  </div>
</div>






    <div className='col'></div>

    </div>
   
  


    );


}
