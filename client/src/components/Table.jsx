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
  const [inputValues, setInputValues] = useState({});
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
    

    Axios.post("https://car-managment.vercel.app/editRow", {
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
        row.treatNumber.toLowerCase().startsWith(search.toLowerCase()) ||
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
  Axios.get("https://car-managment.vercel.app/cars")
    .then((response) => {
   
      setData(response.data);
      setFilteredData(
        Array.from(response.data).filter((row) => {
          return (
            row.treatNumber.toLowerCase().startsWith(search.toLowerCase()) ||
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
      row.treatNumber.toLowerCase().startsWith(search.toLowerCase()) ||
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
      row.treatNumber.toLowerCase().startsWith(search.toLowerCase()) ||
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
      row.treatNumber.toLowerCase().startsWith(event.target.value.toLowerCase()) ||
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
    Axios.post("https://car-managment.vercel.app/deleteRow", {
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
                  <input
                    value={row.treatNumber}
                    defaultValue={row.treatNumber}
                    name="treatNumber"
                    onChange={handleInputChange}
     
                    
                  />
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

