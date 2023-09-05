import React from 'react'
import { Outlet} from 'react-router'
import { NavLink } from 'react-router-dom';
import ProductsPage from './ProductsPage';

const BasePage = () => {
  return (
    <>
    <header className=' bg-warning p-2'>
      <div className='  align-items-center justify-content-around mx-3'>
      <h1 className='text-white '>Zumakazoo_rentals</h1>
      <NavLink className='text-white' to='/login'>Admin Login</NavLink>
      </div>
    </header>
    <div className='container-fluid bg-danger'>
    <h3 className='text-white pt-5 pb-4'>Take products for rent at affordable price</h3>
    <a className='text-white' href='/contactus'>click here to ContactUs</a>
    <Outlet />
    </div>
    <ProductsPage/>

    <footer className='px-3 py-5 text-white bg-warning'>copyrights @ Zumakazoo_rentals.pvt.ltd</footer>
    </>
  )
}

export default BasePage