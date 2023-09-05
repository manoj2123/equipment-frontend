import { useFormik } from "formik";
import React, { useContext } from "react";
import * as yup from "yup";
import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { AppContext } from "../App";

export default function EditProduct(){
  const { id }=useParams();
  const {products,setProducts}=useContext(AppContext);
  const currentdata=products.filter((ele)=>ele._id==id);

    const navTo =useNavigate();
    function notifySuccess(msg){
        toast.success(msg);
    }
    function notifyWarning(msg){
        toast.warning(msg)
    }

    const fieldvalidationscheme=yup.object({
        product:yup.string().required("Please enter product name"),
        price:yup.string().required("Please enter price"),
        quantity:yup.number().required("Please enter quantity"),
        image:yup.string().required("Please enter image"),
      })
    
      const {handleSubmit,values,handleChange,handleBlur,touched,errors}=useFormik({
        initialValues:{
          product:currentdata[0].product,
          price:currentdata[0].price,
          quantity:currentdata[0].quantity,
          image:currentdata[0].image,
        },
        validationSchema:fieldvalidationscheme,
        onSubmit:async (productInfo)=>{
          toast.info("Please wait...")
          try{
            const response = await fetch(
            "https://equipment-backend-3b8k.onrender.com/rental/products",
            {
              method: "PUT",
              body: JSON.stringify(productInfo),
              headers: {
                "Content-Type": "application/json",
                "x-auth-token":localStorage.token,
                "id":id
              },
            }
          );
          const data = await response.json();
          notifySuccess(data.message)
          setTimeout(function(){
            navTo('/adminPage/editproductlist');
          },2000)
        }
        catch(error){
            notifyWarning("Unable to update...");
        }
          
        }
      })
      
      return (
        <div className='m-3'>
            <ToastContainer/>
          <h1 className='page-title mt-5 mb-3 '>Edit Product</h1>
          <form 
            className='mb-5'
            onSubmit={handleSubmit}
          >
              <div className="form-floating mb-3 ">
                <input
                  id="product"
                  className={`form-control shadow ${touched.product && errors.product?" border-danger ":""}`}
                  placeholder="Enter product name"
                  type="product"
                  value={values.product} onChange={handleChange} onBlur={handleBlur}
                />
                <label for="product" className="text-muted">
                {touched.product && errors.product?errors.product:"Enter product name"}
                </label>
              </div>
              <div className="form-floating mb-3 ">
                <input
                  id="price"
                  className={`form-control shadow ${touched.price && errors.price?" border-danger ":""}`}
                  placeholder="Enter price per day"
                  type="price"
                  value={values.price} onChange={handleChange} onBlur={handleBlur}
                />
                <label for="price" className="text-muted">
                {touched.price && errors.price?errors.price:"Enter price per day"}
                </label>
              </div>
              <div className="form-floating mb-3 ">
                <input
                  id="quantity"
                  className={`form-control shadow ${touched.quantity && errors.quantity?" border-danger ":""}`}
                  placeholder="Enter quantity"
                  type="quantity"
                  value={values.quantity} onChange={handleChange} onBlur={handleBlur}
                />
                <label for="quantity" className="text-muted">
                {touched.quantity && errors.quantity?errors.quantity:"Enter quantity"}
                </label>
              </div>
              <div className="form-floating mb-3 ">
                <input
                  id="image"
                  className={`form-control shadow ${touched.image && errors.image?" border-danger ":""}`}
                  placeholder="Enter image url"
                  type="text"
                  value={values.image} onChange={handleChange} onBlur={handleBlur}
                />
                <label for="image" className="text-muted">
                {touched.image && errors.image?errors.image:"Enter image url"}
                </label>
              </div>
              <button
                className="btn btn-success shadow w-100"
                type='submit'
              >
                Update product
              </button>
          </form>
          <NavLink className='text-dark text-decoration-none' to='/'>&lt;---return to home page</NavLink>
        </div>
      );
}
