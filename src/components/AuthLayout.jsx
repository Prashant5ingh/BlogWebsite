import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


// file name and function name could be different.
export default function Protected({ children, authentication = true }) {  // by default taking authentication as true if not given by user.

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status) // to ask store 1st if user logged in or not

    useEffect(() => {  // it will send to login or home page or anywhere. To check again or not when particular fields were changed


        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }

        //let authValue = authStatus === true ? true : false


        if (authentication && authStatus !== authentication) {
            navigate("/login")
        }
        else if (!authentication && authStatus !== authentication) {
            navigate("/all-posts")
        }
        setLoader(false)

    }, [authStatus, navigate, authentication])
    return (
        loader ? <h1>Loading...</h1> : <>{children}</>
    )
}

