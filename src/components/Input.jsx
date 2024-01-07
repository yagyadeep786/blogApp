
import { useId } from "react";
import { forwardRef} from "react";

let Input= forwardRef(function Input({
     label,
     type="text",
     clasName="",
     ...props
},ref){
    let id= useId();
   return(
    <div className="w-full">
        {label &&  <label
         htmlFor={id}
         className="inline-block pl-1 mb-1"
         >
            {label}
        </label>
        }
       <input
        type={type}
        className={`${clasName} px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
        ref={ref}
        {...props}
        id={id}
        />
    </div>
   )
})

export default Input;