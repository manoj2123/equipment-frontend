import React, { useContext, useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import { AppContext } from '../App';

const ProductsPage = () => {
  const navTo=useNavigate();
  
  const {products,setProducts}=useContext(AppContext);
  const [state,setState]=useState(false);
  useEffect(()=>{
    setState(true)
  },[products])
  
  function clicking(id){
    navTo(`/buyproduct/${id}`)
  }
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
    <div className='row bg-danger justify-content-around' id='row'>
      <div className='col-md-3'></div>
      <div className='col-md-6'>
      <input className='form-control mt-3 mx-2' type='text' style={{marginLeft:"50%"}} onChange={(e) => searchFilter(e.target.value)} placeholder='search product....' />
      </div>
      <div className='col-md-3'></div>
      {state && products.map((data, idx) => (
        <Card className={'product-card col-md-3 mx-3 my-3 justify-content-between' + data.product.toLowerCase()} id={data.product.toLowerCase()} key={idx} style={{ width: '18rem' }}>
          <Card.Img className='card-image' variant="top" src={data.image} />
          <Card.Body className='d-flex flex-column justify-content-around'>
            <Card.Title>{data.product}</Card.Title>
            <Card.Text>&#8377; {data.price}/day</Card.Text>
            <Card.Text>Available stocks : {data.quantity}</Card.Text>
            <Button variant="dark" co onClick={() => clicking(data._id)}>RENT</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
    
  )
}

export default ProductsPage