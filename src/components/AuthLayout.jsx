import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function AuthLayout({children, authentication}){

    const navigate= useNavigate();
    let [loader,setLoader]= useState(true);
    let authStatus= useSelector((state)=>{
        return state.auth.status;
    })

    useEffect(()=>{
     
        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false);

    },[navigate,authStatus,authentication])

    return(
       loader ? <div>Loading...</div>: <>{children}</>
    )
}

export default AuthLayout;