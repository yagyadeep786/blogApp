import Input from "./Input";
import Button from "./Button";
import authService from "../appwrite/auth";
import { useState } from "react";
import {useForm} from "react-hook-form"
import {Link, useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import Logo from "./Logo";

function SignUp(){

    let dispatch= useDispatch();
    let navigate= useNavigate();
    let {register,handleSubmit}= useForm();
    let [error,setError]= useState("");

    let signup= async (data)=>{
        setError("");
        try{
           let userData= await authService.createAccount(data);
           if(userData){
              userData= await authService.getCurrentUser();
             if(userData){
                dispatch(login(userData));
                navigate("/");
             }
           }
        }
        catch(e){
            setError(e.message);
        }
    }
    return(
        <div
        className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                        If you have alrady account&nbsp;
                        <Link
                            to="/login"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign In
                        </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
              <form onSubmit={handleSubmit(signup)} className="mt-8">
               <div className="space-y-5">
                <Input
                type= "text"
                label="Enter Name"
                placeholder= "Enter Name:"
                {
                    ...register("name",{required:true})
                }
                />
                <Input 
                    label= "Email"
                    placeholder= "Enter Email Address"
                    type= "email"
                    {
                        ...register("email",{
                            required:true
                        })
                    }
                    />
    
                    <Input 
                    label="Password:"
                    placeholder= "password"
                    type= "password"
                    {
                        ...register("password",{required:true})
                    }
                    />
    
                    <Button
                    type= "submit"
                    className="w-full"
                    >Sign Up</Button>
               </div>
              </form>
            </div>
        </div>  
    )
}

export default SignUp;