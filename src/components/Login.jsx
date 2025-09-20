import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../features/authSlice' // just for this file we are calling login as authLogin
import { Button, Input, Logo } from './index'
import authService from '../appwrite/auth'
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()  // handleSubmit is a event(keyword) now which takes parameter name who is handling the form and that is "login"
  // Input fields values are fetched by register and uses when handleSubmit is called without managing the state by developer.

  const [error, setError] = useState("")

  const login = async (data) => {
    setError("") // clean the errors when submition is starting
    try {

      const session = await authService.login(data)  // it gives a resposnse as session. If session is there means user is logged in else not
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/")  // navigate to root after login. Link --> needs to be clicked and navigate--> programmatically (directly) sends to that url
      }
    } catch (error) {
      setError(error.message)
    }


  }
  return (
    <div className='flex items-center justify-center w-full'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8' >
          <div className='space-y-5'>
            <Input
              label="Email: "
              placeholder="Enter You Email"
              type="email"

              // register needs key or its option in form of obj like require, validate 
              {...register("email", {
                required: true,
                validate: {
                  matchPatter: (value) => {
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                      "Email address must be a valid address"
                  },
                }
              })}  // needed in <select> also, due to useForm -->Without "...register" spreading, It will overwrite the register values if used in other Input field
            />

            <Input
              label="Password: "
              type="password"
              placeholder="Enter Password"
              {...register("password", {
                required: true,
              })}
            />

            <Button type="submit" className="w-full ">Sign In</Button>
            {/* Input created by us in seperate file */}

          </div>
        </form>

      </div>
    </div>
  )
}

export default Login