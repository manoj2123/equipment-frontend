import React, { useContext} from 'react'
import { Button, Card } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import { AppContext } from '../App';
import { EditFilled ,DeleteFilled } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';

const EditProducts = () => {
  
  const {products,setProducts}=useContext(AppContext);
  const navTo=useNavigate();
  
  async function deleting(id){
    try{const response = await fetch(
      "https://equipment-backend-3b8k.onrender.com/rental/products",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token":localStorage.token,
          "id":id
        },
      }
    );
    const notify=await toast.success("deleted...");
    const newProductList=products.filter((ele)=>ele._id!==id);
    setProducts(newProductList);
    setTimeout(()=>{navTo('/adminPage/editproductlist')},2000)}
    catch(error){
    }
  }
  function editing(id){
    navTo(`/editproduct/${id}`)
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
    <div className='row bg-danger justify-content-around'>
      <div className='col-md-3'></div>
      <div className='col-md-6'>
      <input className='form-control mt-3 mx-2' type='text' style={{marginLeft:"50%"}} onChange={(e) => searchFilter(e.target.value)} placeholder='search product....' />
      </div>
      <ToastContainer/>
      {products.map((data,idx)=>(
        <Card className='product-card col-md-3 mx-3 my-3 bg-light justify-content-between ' key={idx} style={{ width: '18rem' }} id={data.product.toLowerCase()}>
         <Card.Img className='card-image' variant="top" src={data.image} />
         <Card.Body>
           <Card.Title>{data.product}</Card.Title>
           <Card.Text>&#8377; {data.price}/day</Card.Text>
           <Card.Text>Available stocks : {data.quantity}</Card.Text>
           <Button variant="secondary px-3 m-2 pb-2" onClick={()=>editing(data._id)}><EditFilled/></Button>
           <Button variant="success px-3 m-2 pb-2" onClick={()=>deleting(data._id)}><DeleteFilled/></Button>
         </Card.Body>
       </Card>
      ))}
    </div>
    
  )
}

export default EditProducts