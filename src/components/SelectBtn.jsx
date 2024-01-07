import React, { useId } from "react";


function SelectBtn({
  options,
  label,
  className="",
  ...props
},ref){
   
    let id= useId();
    return(
        <div className="w-full">
            {label && <label htmlFor={id}>
                {label}
            </label> }
            
            <select name="" id={id} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} {...props} ref={ref}>
                {options?.map((item)=>{
                    return (
                        <option key={item} value={item}>{item}</option>
                    )
                })}
            </select>
        </div>
    );
}

export default React.forwardRef(SelectBtn);