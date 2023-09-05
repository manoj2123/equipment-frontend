import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../App";


export default function BuyProduct() {
  const { products, setProducts } = useContext(AppContext);
  const { id } = useParams();
  const navTo = useNavigate();

  const currentProduct = products.filter((ele) => ele._id == id);
  const productName = currentProduct[0].product;
  const productImage = currentProduct[0].image;
  const limit = +currentProduct[0].quantity;

  const [price, setPrice] = useState(currentProduct[0].price);

  const proPrice = currentProduct[0].price;

  function notifyWarning(msg) {
    toast.warning(msg);
  }

  const fieldvalidationscheme = yup.object({
    product: yup.string().required(""),
    price: yup.string().required(""),
    quantity: yup.number().required(""),
    image: yup.string().required(""),
    buyerName: yup.string().required("please provide your name"),
    address: yup.string().required("please provide your address"),
    fromDate: yup.string().required("please provide..."),
    fromTime: yup.string().required("please provide..."),
    toDate: yup.string().required("please provide..."),
    toTime: yup.string().required("please provide..."),
    mobile: yup.string().required("please provide mobile number...").min(10),
  });

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        id:id,
        product: productName,
        price: price,
        quantity: 1,
        image: productImage,
        buyerName: "",
        address: "",
        fromDate: "",
        fromTime: "",
        toDate: "",
        toTime: "",
        mobile:""
      },
      validationSchema: fieldvalidationscheme,
      onSubmit: async (productInfo) => {
        var options = {
          key:"rzp_test_DD48v5Wt9tpukT",
          key_secret:"beNcHNDkjHxD3NwHnAwREOTD",
          amount:(+values.price * 100),
          currency:"INR",
          name:"Zumakazoo_rentals",
          description:"for testing purpose",
          handler:async function(response){
            const res=await (response.razorpay_payment_id);
            toast.success("payment_id:",res)
            try {
              const response = await fetch(
                "https://equipment-backend-3b8k.onrender.com/rentalProducts",
                {
                  method: "POST",
                  body: JSON.stringify(productInfo),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              const data = await response.json();
              
              if (data.message === "Added new product") {
                 toast.success("Added new product");
                 return setTimeout(()=>{navTo('/')},2000)
              }
            } catch (error) {
              notifyWarning("Retry after sometimes...");
            }
          },
          prefill:{
            name:values.buyerName,
            email:"zumakazoo@rentals.com",
            contact:values.mobile
          },
          notes:{
            address:"Razorpay Corporate office"
          },
          theme:{
            color:"#3399cc"
          }
        };
        var pay=new window.Razorpay(options);
        pay.open();
      },
    });
  function manageQuantity(arg, qty) {
    if (arg === "sub" && +qty > 1) {
      values.quantity = +values.quantity - 1;
      values.price = +proPrice * values.quantity;
    } else if (arg === "add" && qty<limit) {
      values.quantity = +values.quantity + 1;
      values.price = +proPrice * values.quantity;
    }
  }
  function findDays(date1, date2) {
    let d1 = "Invalid Date";
    let d2 = "Invalid Date";
    if (date1 != "") {
      values.fromDate = date1;
      d1 = new Date(date1);
    }
    if (date2 != "") {
      values.toDate = date2;
      d2 = new Date(date2);
    }
    if (d1 != "Invalid Date" && d2 != "Invalid Date") {
      let days = (d2.getTime() - d1.getTime()) / (1000 * 3600 * 24);
      values.price = +price * +values.quantity * (days + 1);
    }
  }
  return (
    <div className="d-flex flex-column mt-3">
      <ToastContainer />
      <h1 className="page-title mt-5 mb-3 text-white bg-warning p-3 ">
        Buy for Rent
      </h1>
      <div className="w-100 justify-content-center">
        <img
          className="mx-5"
          style={{ width: "250px" }}
          src={productImage}
          alt=""
        />
      </div>
      <form className="mb-5 mx-5" onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            id="product"
            className={`form-control shadow ${
              touched.product && errors.product ? " border-danger " : ""
            }`}
            placeholder="Product name"
            type="product"
            value={productName}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled
          />
          <label for="product" className="text-muted ">
            {touched.quantity && errors.quantity
              ? errors.quantity
              : "Product name"}
          </label>
        </div>
        <div className="form-floating mb-3 ">
          <input
            id="price"
            className={`form-control shadow ${
              touched.price && errors.price ? " border-danger " : ""
            }`}
            placeholder="Price for total no. of days"
            type="price"
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled
          />
          <label for="price" className="text-muted">
            {touched.price && errors.price
              ? errors.price
              : "Price for total no. of days"}
          </label>
        </div>
        <div className=" d-flex justify-content-evenly">
          <div className="form-floating mb-3 ">
            <input
              id="quantity"
              className={`form-control shadow ${
                touched.quantity && errors.quantity ? " border-danger " : ""
              }`}
              placeholder="Quantity"
              type="quantity"
              value={values.quantity}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled
            />
            <label for="quantity" className="text-muted">
              {touched.quantity && errors.quantity
                ? errors.quantity
                : "Quantity"}
            </label>
          </div>

          <button
            className="btn btn-warning h-25 w-25 mx-2 mt-3"
            type="button"
            onClick={() => manageQuantity("sub", values.quantity)}
          >
            ➖
          </button>
          <button
            className="btn btn-warning h-25 w-25 mx-2 mt-3"
            type="button"
            onClick={() => manageQuantity("add", values.quantity)}
          >
            ➕
          </button>
        </div>
        <div className="form-floating mb-3 ">
          <input
            id="buyerName"
            className={`form-control shadow ${
              touched.buyerName && errors.buyerName ? " border-danger " : ""
            }`}
            placeholder="Name"
            type="buyerName"
            value={values.buyerName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label for="buyerName" className="text-muted">
            {touched.buyerName && errors.buyerName ? errors.buyerName : "Name"}
          </label>
        </div>
        <div className="form-floating mb-3 ">
          <input
            id="mobile"
            className={`form-control shadow ${
              touched.mobile && errors.mobile ? " border-danger " : ""
            }`}
            placeholder="Mobile"
            type="mobile"
            value={values.mobile}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label for="mobile" className="text-muted">
            {touched.mobile && errors.mobile ? errors.mobile : "Mobile"}
          </label>
        </div>
        <div className="form-floating mb-3 ">
          <textarea
            id="address"
            className={`form-control shadow ${
              touched.address && errors.address ? " border-danger " : ""
            }`}
            placeholder="Address"
            type=""
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label for="address" className="text-muted">
            {touched.address && errors.address ? errors.address : "Address"}
          </label>
        </div>
        <div className="form-floating mb-3 ">
          <input
            id="fromDate"
            className={`form-control shadow ${
              touched.fromDate && errors.fromDate ? " border-danger " : ""
            }`}
            placeholder="From date"
            type="date"
            value={values.fromDate}
            onChange={(e) => findDays(e.target.value, values.toDate)}
            onBlur={handleBlur}
          />
          <label for="buyerName" className="text-muted">
            {touched.fromDate && errors.fromDate
              ? errors.fromDate
              : "From Date"}
          </label>
        </div>
        <div className="form-floating mb-3 ">
          <input
            id="fromTime"
            className={`form-control shadow ${
              touched.fromTime && errors.fromTime ? " border-danger " : ""
            }`}
            placeholder="From time"
            type="time"
            value={values.fromTime}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label for="buyerName" className="text-muted">
            {touched.fromTime && errors.fromTime
              ? errors.fromTime
              : "From time"}
          </label>
        </div>
        <div className="form-floating mb-3 ">
          <input
            id="toDate"
            className={`form-control shadow ${
              touched.toDate && errors.toDate ? " border-danger " : ""
            }`}
            placeholder="To date"
            type="date"
            value={values.toDate}
            onBlur={handleBlur}
            onChange={(e) => findDays(values.fromDate, e.target.value)}
          />
          <label for="buyerName" className="text-muted">
            {touched.toDate && errors.toDate ? errors.toDate : "To Date"}
          </label>
        </div>
        <div className="form-floating mb-3 ">
          <input
            id="toTime"
            className={`form-control shadow ${
              touched.toTime && errors.toTime ? " border-danger " : ""
            }`}
            placeholder="To time"
            type="time"
            value={values.toTime}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label for="buyerName" className="text-muted">
            {touched.toTime && errors.toTime ? errors.toTime : "To time"}
          </label>
        </div>
        <button className="btn btn-danger shadow w-100" type="submit">
          Buy for rent
        </button>
      </form>
    </div>
  );
}
