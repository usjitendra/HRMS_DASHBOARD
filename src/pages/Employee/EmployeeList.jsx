import React from 'react';
import { useGetAllEmployeeQuery } from '../../rtk/employeeApi';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { GrFormView } from "react-icons/gr";
import { useDeleteEmployeeMutation } from '../../rtk/employeeApi';
import { isConfirm } from '../../pages/sweet-alret/sweet-alret';
import { useNavigate } from 'react-router';

const EmployeeCard = ({ employee }) => {
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const navigate=useNavigate();
  console.log('eeeeeee', employee);
  const getInitials = (name) => {
    const nameParts = name.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`;
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleDelete = async (id) => {
    const isConfirmed = await isConfirm();
    if (isConfirmed) {
      const data = await deleteEmployee(id).unwrap();
    }
  };

  const handleEdit = async (employee) => {

        navigate('/employee/add',{state:{editEmployee:employee}});
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
          {employee.role && <p className="text-sm text-gray-500 mt-1">{employee.role}</p>}
          <p className="text-sm text-gray-600" mt-1>
            {employee.phone}
          </p>
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        {/* <button >
        <GrFormView className='text-2xl text-blue-800 hover:text-blue-500'/>
        </button> */}
        <button onClick={() => handleEdit(employee)}>
          <FaEdit className="text-blue-500 text-lg hover:text-blue-700" />
        </button>
        <button onClick={() => handleDelete(employee._id)}>
          <MdDelete className="text-red-500 text-lg hover:text-red-800" />
        </button>
      </div>
    </div>
  );
};

const EmployeeList = () => {
  const { data, isLoading, error } = useGetAllEmployeeQuery();
  console.log('eeeeeee', data);
  if (isLoading) {
    return <p className="text-center text-lg font-semibold">Loading....</p>;
  }
  if (error) {
    return <p className="text-center text-lg text-red-500">Error Loading Employee...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Employees</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {data?.length > 0 ? (
          data.map((employee) => <EmployeeCard key={employee.id} employee={employee} />)
        ) : (
          <p className="text-gray-500 text-red-500">No employees found.....</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
