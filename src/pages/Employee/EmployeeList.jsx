import React from "react";
import { useGetAllEmployeeQuery } from "../../rtk/employeeApi";

const EmployeeCard = ({ employee }) => {
    console.log("eeeeeee",employee);
    // Extract initials from name (first letter of first and last name)
    const getInitials = (name) => {
      const nameParts = name.split(' ');
      if (nameParts.length >= 2) {
        return `${nameParts[0][0]}${nameParts[1][0]}`;
      }
      return name.substring(0, 2).toUpperCase();
    };
  
    return (
      <div className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 p-4 relative">
        {/* Card Content */}
        <div className="flex items-start gap-4">
          {/* Avatar with Initials */}
          <div 
            className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold ${employee.bgColor || 'bg-indigo-500'}`}
          >
            {employee.initials || getInitials(employee.name)}
          </div>
          
          {/* Employee Info */}
          <div className="flex-1">
            <h3 className="text-base font-medium text-gray-800">
              {employee.name} 
              {/* <span className="text-gray-500 font-normal ml-1">({employee._id})</span> */}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{employee.email}</p>
            {employee.role && (
              <p className="text-sm text-gray-500 mt-1">{employee.role}</p>
            )}
            <p className="text-sm text-gray-600" mt-1>{employee.phone}</p>
            {/* <div className="flex items-center mt-2">
              <span 
                className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  employee.status === "Online" ? "bg-green-500" : "bg-gray-300"
                }`}
              ></span>
              <span 
                className={`text-xs font-medium ${
                  employee.status === "Online" ? "text-green-600" : "text-gray-400"
                }`}
              >
                {employee.status}
              </span>
            </div> */}
          </div>
          
          {/* Options Button (three dots) */}
          <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </div>
    );
  };
  

const EmployeeList = () => {
      const {data,isLoading,error}=useGetAllEmployeeQuery();
      console.log("eeeeeee",data);
     if(isLoading){
      return <p className="text-center text-lg font-semibold">Loading....</p>
     }
     if(error){
        return <p className="text-center text-lg text-red-500">Error Loading Employee...</p>
     }
       
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Employees</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
       {data?.length>0?(
            data.map((employee) => <EmployeeCard key={employee.id} employee={employee} />)
       ):(
        <p className="text-gray-500 text-red-500">No employees found.....</p> 
       )}
      </div>
    </div>
  );
};

export default EmployeeList;
