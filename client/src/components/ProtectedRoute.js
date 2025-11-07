import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

 const ProtectedRoute = () =>{
    const {user} = useAuth();
    return user? <Outlet/> : <Navigate to ="/login"/>
 }
// Outlet is a dynamic placeholder for nested child routes. It renders whatever child route is supposed to be shown inside the parent route.
 export default ProtectedRoute