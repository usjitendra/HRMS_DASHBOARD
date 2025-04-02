import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAddEmployeeMutation, useEmployeeEditMutation } from '../../rtk/employeeApi';


const EmployeeAdd = () => {
  const[employeeEdit]=useEmployeeEditMutation();
  const[addEmployee]=useAddEmployeeMutation();
  const location = useLocation();
  const employeeData = location.state?.editEmployee;
  // console.log("new vala",employeeData);
  
  const navigate = useNavigate();
  const [data,setData]=useState(
    {
      name:"",
      email:"",
      password:"",
      mobile:"",
      role:"",
      department:"",
      designation:"",
      salary:"",
      joiningDate:"",
      photo:"",
    }
  )

  useEffect(()=>{
        if(employeeData){
         setData((prev)=>({
            ...prev,
          name:employeeData.name,
          email:employeeData.email,
          password:employeeData.password||"",
          mobile:employeeData.phone,
          role:employeeData.role,
          department:employeeData.department,
          designation:employeeData.designation,
          salary:employeeData.salary,
          joiningDate:employeeData.joiningDate ? employeeData.joiningDate.split('T')[0]:"",
          // photo:employeeData.photo,
         }))
        }
  },[employeeData]);

  const handleChange=(e)=>{
    console.log(e);
    const {name,value}=e.target  
    setData({...data, [name]:value})
  }

  const handleChangefile=(e)=>{
    const {name}=e.target
    setData({...data,[name]:e.target.files[0]})
  }

  //  console.log("data",data);
   
  const onSubmit = async (e) => {
    e.preventDefault(); 
    const formData=new FormData()
    formData.append("name",data.name)
    formData.append("email",data.email)
    formData.append("password",data.password)
    formData.append("mobile",data.mobile)
    formData.append("role",data.role)
    formData.append("department",data.department)
    formData.append("designation",data.designation)
    formData.append("salary",data.salary)
    formData.append("joiningDate",data.joiningDate)
    formData.append("photo",data.photo)


    if (employeeData) {
        const id=employeeData._id;
      const result = await employeeEdit({id,formData}).unwrap();
      if (result.success) {
        navigate('/employee/list');
      }
    } else {
        // console.log("data++",formData);
        // retu
      const result = await addEmployee(formData).unwrap();
      if (result.success) navigate('/employee/list');
    }
  };
  

  return (
    <div className="container mx-auto mt-1 p-4 bg-white shadow-lg rounded-lg pb-8">
      <h2 className="text-2xl font-bold mb-4 text-center">{employeeData ? 'Edit Employee' : 'Add Employee'}</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Email & Role */}
    

        {/* Name, Phone */}
        <div className="flex gap-10">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text"   onChange={handleChange} name='name' value={data.name} className="mt-1 block w-full border border-gray-300 rounded-md p-2" maxLength={20} minLength={3} />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input type="number" onChange={handleChange} name='mobile' value={data.mobile} className="mt-1 block w-full border border-gray-300 rounded-md p-2" maxLength={10} minLength={10}
             pattern="^[6789]\d{9}$"
             required 
            />
          </div>
        </div>


        <div className="flex gap-10">
          <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="text"   onChange={handleChange} name='email' value={data.email} className="mt-1 block w-full border border-gray-300 rounded-md p-2" maxLength={20} minLength={3} />
          </div>
          <div className="w-1/2">

  
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select onChange={handleChange} name='role' value={data.role} className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white">
              <option value="">Select Role</option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
     
          </div>
        </div>



        {/* Department, Designation */}
        <div className="flex gap-10">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input type="text" onChange={handleChange} value={data.department} name='department' className="mt-1 block w-full border border-gray-300 rounded-md p-2" required maxLength={15} minLength={10} />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Designation</label>
            <input type="text"onChange={handleChange} name='designation' value={data.designation} className="mt-1 block w-full border border-gray-300 rounded-md p-2"  required maxLength={15} minLength={5}/>
          </div>
        </div>

        {/* Salary, Joining Date */}
        <div className="flex gap-10">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Salary</label>
            <input type="number" onChange={handleChange} value={data.salary} name='salary' className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Joining Date</label>
            <input type="date" onChange={handleChange} name='joiningDate' value={data.joiningDate} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
        </div>

        {/* Password, Profile Image */}
        <div className="flex gap-10">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" onChange={handleChange} name='password' value={data.password} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Profile Image</label>
            <input type="file" onChange={handleChangefile} name='photo' className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
        </div>

        <button type="submit" className=" bg-blue-600 text-white py-2 px-5 rounded-md hover:bg-blue-700 w-fit">Submit</button>
      </form>
    </div>
  );
};

export default EmployeeAdd;
