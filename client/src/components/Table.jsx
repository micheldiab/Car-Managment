import React from 'react';
import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Table.css';
import Dashboard from './Dashboard';
export default function Table() 

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


  const [data, setData] = useState([
    {
      treatNumber: '1',
      Information: 'T1',
      Date: '2022-02-01T11:00:00.000Z',
      email: "michel@",
      carNumber:"123",
    },
    {
      treatNumber: '2',
      Information: 'TT',
      Date: '2022-02-01T11:00:00.000Z',
      email: "michel@",
      carNumber:"123",
    },
    {
      treatNumber: '3',
      Information: 'T1',
      Date: '2022-02-01T11:00:00.000Z',
      email: "michel@",
      carNumber:"123",
    },
    {
      treatNumber: '4',
      Information: 'T1',
      Date: '2022-02-01T11:00:00.000Z',
      email: "michel@",
      carNumber:"123",
    },
    {
      treatNumber: '5',
      Information: 'T1',
      Date: '2022-02-01T11:00:00.000Z',
      email: "michel@",
      carNumber:"123",
    },
    {
      treatNumber: '6',
      Information: 'T1',
      Date: '2022-02-01T11:00:00.000Z',
      email: "michel@",
      carNumber:"123",
    },
    {
      treatNumber: '7',
      Information: 'T1',
      Date: '2022-02-01T11:00:00.000Z',
      email: "michel@",
      carNumber:"123",
    },
    {
      treatNumber: '8',
      Information: 'T1',
      Date: '2022-02-01T11:00:00.000Z',
      email: "michel@",
      carNumber:"123",
    },
    {
      treatNumber: '9',
      Information: 'T1',
      Date: '2022-02-01T11:00:00.000Z',
      email: "michel@",
      carNumber:"123",
    },
    {
      treatNumber: '10',
      Information: 'T1',
      Date: '2022-02-01T11:00:00.000Z',
      email: "michel@",
      carNumber:"123",
    },
    {
      treatNumber: '11',
      Information: 'T1',
      Date: '2022-02-01T11:00:00.000Z',
      email: "michel@",
      carNumber:"123",
    },



  ]);

  const [currentPage, setCurrentPage] = useState(1);
const [recordsPerPage] = useState(10);
let indexOfLastRecord = currentPage * recordsPerPage;
let  indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

const [filteredData,setFilteredData] = useState(data.filter((row) => {
  return (
    
    row.treatNumber.toLowerCase().startsWith(search.toLowerCase()) ||
    row.Information.toLowerCase().startsWith(search.toLowerCase()) ||
    row.Date.toLowerCase().startsWith(search.toLowerCase())||
    row.email.toLowerCase().startsWith(search.toLowerCase())||
    row.carNumber.toLowerCase().startsWith(search.toLowerCase())
  );
}));
const [currentRecords,setCurrentRecords] = useState(filteredData.slice(indexOfFirstRecord, indexOfLastRecord));
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
    const sortedData = Array.from(currentRecords).sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.treatNumber > b.treatNumber ? 1 : -1;
      } else {
        return a.treatNumber< b.treatNumber ? 1 : -1;
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
    const sortedData = Array.from(currentRecords).sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.carNumber > b.carNumber ? 1 : -1;
      } else {
        return a.carNumber < b.carNumber ? 1 : -1;
      }
    });
    setCurrentRecords(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  }
  

  function deleteRow(id) {
  
    setFilteredData(filteredData.filter(row=> row.treatNumber !== id));
    const data = filteredData.filter(row=> row.treatNumber !== id);
    setCurrentRecords(data.slice(indexOfFirstRecord, indexOfLastRecord));
 

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

 {/* <div className='row'  style={{cursor:"pointer",background:"blue",border:"solid 5px black",color:"white"}}>
  <div className='col'>
<th  onClick={() => sortByNumber()}>Treatment Num</th>
</div>
<div className='col'>
<th onClick={() => sortByInformation()}>Treatment Info</th>
</div>
<div className='col'>
<th onClick={() => sortByDate()}>Date</th>
</div>
<div className='col'>
<th onClick={() => sortByWorkerEmail()}>Worker email </th>
</div>
<div className='col'>
<th onClick={() => sortByCarNumber()}>Car Num</th>
</div>
<div className='col'>
<th >Action</th>

</div>


</div>  */}



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
                    type="text"
                    defaultValue={row.Information}
                    name="Information"
                    onChange={handleInputChange}
                    ref={input => {
                      input && input.focus();
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
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



<div className='row'>
<div className='col'> 
<p>Showing {(currentRecords.length===0 ? 0 : (currentPage-1)*recordsPerPage +1)} to {filteredData.length>(currentPage*recordsPerPage) ? (currentPage*recordsPerPage) : filteredData.length } of {filteredData.length} entries</p></div>
<div className='col'>

<nav aria-label="Page navigation example">
  <ul className="pagination">


    <li className="page-item">
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
    <li className="page-item" key={index}>
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
    <li className="page-item">
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
    <div className='col'></div>

    </div>
   
  

</div>
    );


}