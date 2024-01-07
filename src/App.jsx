import { useState,useEffect } from "react"
import {useDispatch} from "react-redux"
import authService from "./appwrite/auth";
import {login,logout} from "../store/authSlice";
import {Outlet} from "react-router-dom"
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
function App(){

    let [loading,setLoading]= useState(true);
    let dispatch= useDispatch();
   
    
    useEffect(()=>{

        authService.getCurrentUser()
        .then((userData)=>{
           
           if(userData){
            dispatch(login({userData}))
           }else{
            dispatch(logout());
           }
        })
        .finally(()=>{
           setLoading(false);
        })

    },[])


    if(loading){
        return(
            <>
            <p>Loading...</p>
            </>
        )
    }else{
        return(
            <>
            <Header></Header>
            <main>
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
            </>
        )
    }
}

export default App;