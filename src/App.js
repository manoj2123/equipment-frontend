import { Route, Routes } from 'react-router';
import './App.css';
import LogInPage from './RouterPages/LogInPage';
import BasePage from './RouterPages/BasePage';
import 'bootstrap/dist/css/bootstrap.min.css'
import AddNewProduct from './RouterPages/AddNewProduct';
import { createContext, useEffect, useState } from 'react';
import EditProducts from './RouterPages/EditProducts';
import EditProduct from './RouterPages/EditProduct';
import BuyProduct from './RouterPages/BuyProduct';
import RentalProductsList from './RouterPages/RentalProductsList';
import AdminPage from './RouterPages/AdminPage';
import ContactUs from './RouterPages/ContactUs';

export const AppContext=createContext(null);

function App() {
  const [products,setProducts]=useState([]);

  useEffect(()=>{
    try{async function productsList(){
      const response = await fetch("https://equipment-backend-3b8k.onrender.com/products", {method:"GET"})
      const data = await response.json();
      const allProduct = data.products_list;
      setProducts(allProduct)
    }
    productsList()}
    catch(error){

    }
  },[products])
  const [rentalProducts,setRentalPoducts]=useState([]);
  useEffect(()=>{
    async function getData(){
      try{
        const response=await fetch("https://equipment-backend-3b8k.onrender.com/admin/rentalProducts",
      {
      method:"GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token":localStorage.token,
      },}
      )
      const data=await response.json();
      setRentalPoducts(data.data)
    }
    catch(error){
      
    }
    } 
    getData();
  },[rentalProducts])
  return (
    <div className="App">
      <AppContext.Provider value={{products,setProducts,rentalProducts,setRentalPoducts}}>
      <Routes exact path='/'>
        {products.length> 0&& <Route path='/' element={<BasePage/>}/>}
        <Route path='/login'element={<LogInPage/>}/>
        <Route path='/adminPage' element={<AdminPage/>}>
          <Route path='editproductlist' element={<EditProducts/>}/>
          <Route path='addnewproduct'element={<AddNewProduct/>}/>
          {rentalProducts.length > 0 && <Route path='rentalproductslist' element={<RentalProductsList/>}/>}
        </Route>
        {products.length > 0 && <Route path='buyproduct/:id' element={<BuyProduct/>}/>}
        <Route path='editproduct/:id' element={<EditProduct/>}/>
        <Route path='contactus' element={<ContactUs/>}/>
      </Routes>
      </AppContext.Provider>
     
    </div>
  );
}

export default App;
