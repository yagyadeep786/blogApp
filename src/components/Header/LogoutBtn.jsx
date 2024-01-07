import {useDispatch} from "react-redux";
import {logout} from "../../../store/authSlice"
import authService from "../../appwrite/auth"
import { useNavigate } from "react-router-dom";
function LogoutBtn(){
 
    let dispatch= useDispatch();
     let navigate= useNavigate();
    let logoutHandler= ()=>{
        authService.logout()
        .then(()=>{
            dispatch(logout())
            navigate("/login");
        })
    }
    return(
        <>
         <button className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full" onClick={logoutHandler}>Logout</button>
        </>
    )
}

export default LogoutBtn;