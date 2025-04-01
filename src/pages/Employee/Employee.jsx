import React from 'react'
import { useGetAllEmployeeQuery } from '../../rtk/employeeApi'
import TableComponent from '../../helper-component/TableComponent';
import { useNavigate } from 'react-router';
const Employee = () => {
   const navigate=useNavigate();
  const {data,isLoading,error}=useGetAllEmployeeQuery()

  console.log(data);

  //---------  table header define -----------///
  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Phone Number", accessor: "phone" },
    { header: "Department", accessor: "department" },
    { header: "Action", accessor: "action", type: "action" },
  ];

  const tableData = (data ?? []).map((emp) => {
   
    return {
      name: emp.name || "N/A",
      email: emp.email || "N/A",
      phone: emp.phone || "N/A",
      department: emp.role || "N/A",
  
    };
  });
  const AddEmployee=async()=>{
        try{
          navigate('/employee/add')
        }catch(err){
           return console.log(err.message);
        }
  }
  //  ----action------- // 
  


  return (
    <div>
           {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
                <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold"></h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          onClick={AddEmployee}
         >
          Add Employee
        </button>
      </div>
        <TableComponent columns={columns} data={tableData} itemsPerPage={10} />

        </div>
      )}     
    </div>
  )
}

export default Employee
