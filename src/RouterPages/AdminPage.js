import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const AdminPage = () => {
  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-primary px-3">
        <Link class="navbar-brand text-light px-3">
          <h3>Admin page</h3>
        </Link>
        <button
          class="navbar-toggler border-0"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fa-solid fa-bars fa-xl text-light"/>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link className="btn text-light w-100 px-5" to="/">
                Home page
              </Link>
            </li>
            <li class="nav-item">
              <Link className="btn text-light w-100 px-5" to="editproductlist">
                Products page
              </Link>
            </li>
            <li class="nav-item">
              <Link className="btn text-light w-100 px-5" to="addnewproduct">
                Add new product
              </Link>
            </li>
            <li class="nav-item">
              <Link className="btn text-light w-100 px-5" to="rentalproductslist">
                Rented Product Page
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet/>
    </div>
    
  )
}

export default AdminPage