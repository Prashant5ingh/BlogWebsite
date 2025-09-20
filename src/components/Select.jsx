import React,{useId} from "react"

function Select({
    options,  // options gives an array
    label,
    className, // className="" both are fine
    ref,  // forwardref
    ...props
}) {
    const id = useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className=''></label>}
        <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
            {options?.map((option) => ( // "?" loops the options via map when options are available in array and not empty.
                <option key={option} value={option}> 
             {/* For key -->options are also unique and can use index as well */}
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default Select

// import React, {useId} from 'react'

// function Select({
//     options,
//     label,
//     className,
//     ...props
// }, ref) {
//     const id = useId()
//   return (
//     <div className='w-full'>
//         {label && <label htmlFor={id} className=''></label>}
//         <select
//         {...props}
//         id={id}
//         ref={ref}
//         className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
//         >
//             {options?.map((option) => (
//                 <option key={option} value={option}>
//                     {option}
//                 </option>
//             ))}
//         </select>
//     </div>
//   )
// }

// export default React.forwardRef(Select)