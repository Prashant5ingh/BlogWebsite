import React, {useId} from 'react' // Id is used in label

const Input = React.forwardRef( function Input({  // Input fields with forward ref
    label,
    type = "text",
    className =" ",
    ...props
}, ref){ 
    const id = useId();  // generate unique ids
    return (
        // if label is given then label element will display
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1' 
            htmlFor={id}>{label}
            </label>
            }
            <input 
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 
                duration-200 border border-gray-200 w-full 
                ${className}`}
                ref={ref} // this will give reference of the parent component via forward ref. Reference will be passed from parent to the input.jsx and then state will be accessed in parent for onclick and onchange.
                {...props}
                id={id}
            />
        </div>
    )
})
    

export default Input

/* New version code

Use this:
import React, { useId } from 'react';

function Input(
  { 
    label, 
    type = 'text', 
    className = '', 
    ref,        // pull in the ref  
    ...props    // everything else  
  }
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="inline-block mb-1 pl-1">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        ref={ref}
        {...props}
        className={`
          px-3 py-2 rounded-lg bg-white text-black 
          outline-none focus:bg-gray-50 duration-200 
          border border-gray-200 w-full ${className}
        `}
      />
    </div>
  );
}

export default Input;

*/