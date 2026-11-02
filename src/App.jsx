import { useState } from 'react'
import { BrowserRouter, Route,Routes} from 'react-router-dom'
import Home from './components/Home'
import Shop from './components/Shop'
import Product from './components/Product'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Login from './components/admin/Login'
import Dashboard from './components/admin/Dashboard'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AdminRequireAuth } from './components/admin/AdminRequireAuth'

import {default as ShowCategories } from './components/admin/category/Show'
import {default as CreateCategory } from './components/admin/category/Create'
import {default as EditCategory } from './components/admin/category/Edit'

import {default as ShowBrand } from './components/admin/brand/Show'
import {default as CreateBrand } from './components/admin/brand/Create'
import {default as EditBrand } from './components/admin/brand/Edit'

import {default as ShowProduct} from './components/admin/product/Show'
import {default as CreateProduct} from './components/admin/product/Create'
import {default as EditProduct } from './components/admin/product/Edit'
import Register from './components/Register'
import {default as UserLogin } from './components/Login'
import Profile from './components/Profile'
import { RequireAuth } from './components/RequireAuth'
import Confirmation from './components/Confirmation'
import ShowOrders from './components/admin/orders/ShowOrders'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
     <Routes>
      {/* User Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      {/* <Route path="/checkout" element={<Checkout />} /> */}
      <Route path='/register' element={<Register /> } />
      <Route path='/login' element={< UserLogin/> } />
      {/* <Route path='/account' element={< Profile/> } /> */}

      <Route path="/admin/login" element={<Login/>} />
      

      <Route path="/account" element={
        <RequireAuth>
          <Profile />
        </RequireAuth>
      } />
      <Route path="/checkout" element={
        <RequireAuth>
          <Checkout />
        </RequireAuth>
      } />
      <Route path="/order/confirmation/:id" element={
        <RequireAuth>
          <Confirmation />
        </RequireAuth>
      } />

      {/* Admin Route */}
      <Route path="/admin/dashboard" element={
        <AdminRequireAuth>
          <Dashboard />
        </AdminRequireAuth>
      } />
      <Route path="/admin/categories" element={
        <AdminRequireAuth>
          <ShowCategories />
        </AdminRequireAuth>
      } />
      <Route path="/admin/categories/create" element={
        <AdminRequireAuth>
          <CreateCategory />
        </AdminRequireAuth>
      } />
      <Route path="/admin/categories/edit/:id" element={
        <AdminRequireAuth>
          <EditCategory />
        </AdminRequireAuth>
      } />
      <Route path="/admin/brands" element={
        <AdminRequireAuth>
          <ShowBrand />
        </AdminRequireAuth>
      } />
      <Route path="/admin/brands/create" element={
        <AdminRequireAuth>
          <CreateBrand />
        </AdminRequireAuth>
      } />
      
      <Route path="/admin/brands/edit/:id" element={
        <AdminRequireAuth>
          <EditBrand />
        </AdminRequireAuth>
      } />

      <Route path="/admin/products" element={
        <AdminRequireAuth>
          <ShowProduct />
        </AdminRequireAuth>
      } />
      <Route path="/admin/products/create" element={
        <AdminRequireAuth>
          <CreateProduct />
        </AdminRequireAuth>
      } />
      <Route path="/admin/products/edit/:id" element={
        <AdminRequireAuth>
          <EditProduct />
        </AdminRequireAuth>
      } />

       <Route path="/admin/orders" element={
        <AdminRequireAuth>
          <ShowOrders />
        </AdminRequireAuth>
      } />
     </Routes>
     </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
