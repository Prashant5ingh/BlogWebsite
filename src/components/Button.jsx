import React from 'react'


// Common button UI to use anywhere in webpage
function Button({  // children is same as "text"
    children,
    type ="button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = '',
    ...props
}) {
  return (
    // Dynamic button class syntax with some predefine class property for every button used via this component
    // Other properties like "type" "label" will be passed by props in a element
    <button  className={`px-4 py-2 rounded-lg cursor-pointer hover:opacity-65 ${className}
    ${bgColor} ${textColor}`}  {...props}>
        {children}
    </button>
  )
}

export default Button