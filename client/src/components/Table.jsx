import React from 'react';
import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Table.css';
export default function Table() 

{
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState('asc');
  const [data, setData] = useState([
    {
      column1: '8',
      column2: '2',
      column3: '4'
    },
    {
      column1: '2',
      column2: '4',
      column3: '5'
    },
    {
      column1: '6',
      column2: '2',
      column3: '3'
    },
    {
      column1: '2',
      column2: '7',
      column3: '5'
    },
    {
      column1: '8',
      column2: '2',
      column3: '3'
    },
    {
      column1: '2',
      column2: '1',
      column3: '5'
    },
    {
      column1: '1',
      column2: '2',
      column3: '3'
    },
    {
      column1: '2',
      column2: '1',
      column3: '5'
    },
    {
      column1: '1',
      column2: '2',
      column3: '3'
    },
    {
      column1: '2',
      column2: '1',
      column3: '5'
    },
    {
      column1: '1',
      column2: '2',
      column3: '3'
    },
    {
      column1: '2',
      column2: '1',
      column3: '5'
    },
    {
      column1: '2',
      column2: '1',
      column3: '5'
    },
    {
      column1: '1',
      column2: '2',
      column3: '3'
    },
    {
      column1: '2',
      column2: '1',
      column3: '5'
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
const [recordsPerPage] = useState(5);
let indexOfLastRecord = currentPage * recordsPerPage;
let  indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
let filteredData = data.filter((row) => {
  return (
    row.column1.toLowerCase().includes(search.toLowerCase()) ||
    row.column2.toLowerCase().includes(search.toLowerCase()) ||
    row.column3.toLowerCase().includes(search.toLowerCase())
  );
});
const [currentRecords,setCurrentRecords] = useState(filteredData.slice(indexOfFirstRecord, indexOfLastRecord));
let totalPages = Math.ceil(filteredData.length / recordsPerPage);



function handlePagePlus(pageNumber) {
  if(pageNumber<=totalPages)
{
  setCurrentPage(pageNumber);
  
  setCurrentRecords(data.filter((row) => {
    return (
      row.column1.toLowerCase().includes(search.toLowerCase()) ||
      row.column2.toLowerCase().includes(search.toLowerCase()) ||
      row.column3.toLowerCase().includes(search.toLowerCase())
    )}).slice(pageNumber * recordsPerPage- recordsPerPage, pageNumber * recordsPerPage));
}
}
function handlePageMinus(pageNumber) {
  if(pageNumber>0)
  {
  setCurrentPage(pageNumber);
 setCurrentRecords(data.filter((row) => {
    return (
      row.column1.toLowerCase().includes(search.toLowerCase()) ||
      row.column2.toLowerCase().includes(search.toLowerCase()) ||
      row.column3.toLowerCase().includes(search.toLowerCase())
    )}).slice(pageNumber * recordsPerPage- recordsPerPage, pageNumber * recordsPerPage));

  }
}

function handleSearch(event)
{
  setSearch(event.target.value);
  setCurrentRecords(data.filter((row) => {
    return (
      row.column1.toLowerCase().includes(event.target.value.toLowerCase()) ||
      row.column2.toLowerCase().includes(event.target.value.toLowerCase()) ||
      row.column3.toLowerCase().includes(event.target.value.toLowerCase())
    )}).slice(indexOfFirstRecord, indexOfLastRecord));

}


  function sortByColumn1() {
    const sortedData = Array.from(currentRecords).sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.column1 > b.column1 ? 1 : -1;
      } else {
        return a.column1 < b.column1 ? 1 : -1;
      }
    });
    setCurrentRecords(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  }
  
  function sortByColumn2() {
    const sortedData = Array.from(currentRecords).sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.column2 > b.column2 ? 1 : -1;
      } else {
        return a.column2 < b.column2? 1 : -1;
      }
    });
    setCurrentRecords(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  }
  
  function sortByColumn3() {
    const sortedData = Array.from(currentRecords).sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.column3 > b.column3 ? 1 : -1;
      } else {
        return a.column3 < b.column3 ? 1 : -1;
      }
    });
    setCurrentRecords(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  }
  
 
    return (
      
      <div className='container'>
  
<form>
  <div className="form-group">
    <input
      type="text"
      className="form-control"
      placeholder="Search..."
      onChange={handleSearch}
    />
  </div>
</form>
<div className='row'>
  <div className='col'>
<th  onClick={() => sortByColumn1()}>Column 1</th>
</div>
<div className='col'>
<th onClick={() => sortByColumn2()}>Column 2</th>
</div>
<div className='col'>
<th onClick={() => sortByColumn3()}>Column 3</th>
</div>
</div>

<table className="table table-striped">



<tbody>

  {Array.from(currentRecords).map((row) => (
    <tr>
      <td>{row.column1}</td>
      <td>{row.column2}</td>
      <td>{row.column3}</td>
    </tr>
  ))}
  
</tbody>

</table>

<div className='row'>
<div className='col'></div>
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