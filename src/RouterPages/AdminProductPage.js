import React, { useContext, useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import { AppContext } from '../App';

const AdminProductPage = () => {
  
  const {products}=useContext(AppContext);
  
  function editing(id){
    console.log(id)
  }
  function deleting(id){
    console.log(id)
  }
  return (
    <div className='row w-100 bg-success justify-content-around'>
      {products.map((data,idx)=>(
         <Card className='product-card col-md-3 mx-3 my-3 justify-content-between ' style={{ width: '18rem' }}>
         <Card.Img className='card-image' variant="top" src={data.image} />
         <Card.Body>
           <Card.Title>{data.product}</Card.Title>
           <Card.Text>&#8377; {data.price}/hr</Card.Text>
           <Card.Text>Available stocks : {data.quantity}</Card.Text>
           <Button variant="primary" onClick={()=>editing(data._id)}>Edit</Button>
           <Button variant="primary" onClick={()=>deleting(data._id)}>Delete</Button>
         </Card.Body>
       </Card>
      ))}
      <NavLink to='/'>home page</NavLink>
    </div>
    
  )
}

export default AdminProductPage;