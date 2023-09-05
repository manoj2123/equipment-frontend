import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { Button, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const RentalProductsList = () => {
  const {rentalProducts,setRentalPoducts}=useContext(AppContext);
  const [state,setState]=useState(false);
  useEffect(()=>{
    setState(true)
  },[rentalProducts])
  function searchFilter(filterKey){
    var boxes=document.getElementsByClassName('product-card');
    for (var i = 0; i < boxes.length; i++) {
      var box = boxes[i];
      if ((box.id).includes(filterKey)) {
        box.style.display = "block";
      } else {
        box.style.display = "none";
      }
    }
  }
  return (
    <>
    <div className='row w-100 bg-success justify-content-around'>
    <div className='col-md-3'></div>
      <div className='col-md-6'>
      <input className='form-control mt-3 mx-2' type='text' style={{marginLeft:"50%"}} onChange={(e) => searchFilter(e.target.value)} placeholder='search product....' />
      </div>
      {state && rentalProducts.map((data, idx) => (
        <Card className='product-card col-md-3 mx-3 my-3 pb-5 justify-content-between' id={data.product.toLowerCase()} key={idx} style={{ width: '18rem' }}>
          <Card.Img className='card-image' variant="top" src={data.image} />
            <Card.Title>{data.product}</Card.Title>
            <Card.Text>Amount paid : &#8377; {data.price}</Card.Text>
            <Card.Text>Quantity : {data.quantity}</Card.Text>
            <Card.Text>Name : {data.buyerName}</Card.Text>
            <Card.Text>Address : {data.address}</Card.Text>
            <Card.Text>Mobile: {data.mobile}</Card.Text>
            <Card.Text>From : {data.fromDate}, {data.fromTime}</Card.Text>
            <Card.Text>To : {data.toDate}, {data.toTime}</Card.Text>
            <Card.Text>ID : {data.id}</Card.Text>
        </Card>
      ))}
    </div></>
  );
};

export default RentalProductsList;
