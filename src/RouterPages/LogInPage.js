import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function LogInPage(){
  const navTo=useNavigate()
    const [state,setState]=useState("")
    const fieldvalidationscheme=yup.object({
        email:yup.string().required("Please enter email"),
        password:yup.string().required("Please enter password").min(8)
      })
    
      const {handleSubmit,values,handleChange,handleBlur,touched,errors}=useFormik({
        initialValues:{
          email:"",
          password:"",
        },
        validationSchema:fieldvalidationscheme,
        onSubmit:async (loginInfo)=>{
          try{toast.info("Please wait....")
          const response = await fetch(
            "https://equipment-backend-3b8k.onrender.com/login",
            {
              method: "POST",
              body: JSON.stringify(loginInfo),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json()
          if(data.token) {
            localStorage.setItem("token", data.token);
            setState("");
            toast.success(data.message)
            setTimeout(()=>{navTo('/adminPage');},2000)
            }
        else {
             setState(data.message)
            }}
            catch(error){}
        }
      })
      return (
        <div className='m-3'>
          <ToastContainer/>
          <h1 className='page-title mt-5 mb-3 '>ADMIN LOGIN</h1>
          <form 
            className='mb-5'
            onSubmit={handleSubmit}
          >
              <div className="form-floating mb-3 ">
                <input
                  id="email"
                  className={`form-control shadow ${touched.email && errors.email?" border-danger ":""}`}
                  placeholder="Enter email"
                  type="email"
                  value={values.email} onChange={handleChange} onBlur={handleBlur}
                />
                <label for="email" className="text-muted">
                {touched.email && errors.email?errors.email:"Enter email"}
                </label>
              </div>
              <div className="form-floating mb-3 ">
                <input
                  id="password"
                  className={`form-control shadow ${touched.password && errors.password?" border-danger ":""}`}
                  placeholder="Enter password"
                  type="password"
                  value={values.password} onChange={handleChange} onBlur={handleBlur}
                />
                <label for="password" className="text-muted">
                {touched.password && errors.password?errors.password:"Enter password"}
                </label>
              </div>
              <button
                className="btn btn-warning shadow w-100"
                type='submit'
              >
                LogIn
              </button>
          </form>
          <br/>
          <span>{state}</span>
          <br/>
          <p>For admin login</p>

          <p>Email - user123@gmail.com</p> 

          <p>password - password@123</p>
          <NavLink className='text-dark text-decoration-none' to='/'>&lt;---return to home page</NavLink>
          
        </div>
      );
}
