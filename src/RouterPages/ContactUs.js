import { MailFilled, WhatsAppOutlined } from '@ant-design/icons'
import React from 'react'

const ContactUs = () => {
  return (
    <div className='bg-danger d-flex flex-column justify-content-between'style={{height:"100vh"}}>
        <h1 className='bg-warning text-primary p-3'>Zumakazoo_rentals</h1>
        <div className='text-start m-5'>
            <h3>About</h3>
            <p className='text-light'>Zumakazoo_rentals is the product rental site. Our site is the one of the leading rental product selling page and we offer products at low cost with more added benifits.</p>
            <h3>Contact Us</h3>
            <p className='text-light'>If you are facing any issue or you need to know more about our website you can reach out through </p>
            <p className='text-success'><WhatsAppOutlined/><a href="https://api.whatsapp.com/send/?phone=%2B917092927522&text&type=phone_number&app_absent=0" target="_blank"  rel="noopener noreferrer" >Contact Us</a></p>
            <p><MailFilled /> manojkumarg2123@gmail.com</p>
        </div>
        <a className='text-white' href='/'>Return to home page</a>
        <footer className='px-3 py-5 text-white bg-warning'>copyrights @ Zumakazoo_rental.pvt.ltd</footer>
    </div>
  )
}

export default ContactUs