import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router';
import { useIsLoginQuery } from '../rtk/login';

const ProtectedRoute = () => {
  
  // console.log("mai chala ");

  const {data,isLoading}=useIsLoginQuery()
  const navigate=useNavigate()

  // console.log(data);
  

  useEffect(()=>{
    if(!isLoading && !data){
       navigate("/login")
    }
  },[data,isLoading,navigate])
  
   
  return  <Outlet/>
}

export default ProtectedRoute
