import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './features/admin/login';
import Dashboard from './features/admin/dashboard';
import ProductList from './features/admin/manageProducts/productsList';
import ResetPassword from './features/admin/forgotPassword/resetPassword';
import VerifyEmail from './features/admin/forgotPassword/verifyEmail';
import NewPassword from './features/admin/forgotPassword/newPassword';
import Manage from './features/admin/manageInq&Req/manage';
import AdminProfile from './features/admin/adminProfile';
import NewProduct from './features/admin/manageProducts/newProducts';
import Homepage from './features/user/homepage';
import Products from './features/user/products';
import AboutUs from './features/user/aboutUs';
import ContactUs from './features/user/contactUs';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/products' element={<Products />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/contactUs' element={<ContactUs />} />
      </Routes>
      <Routes>
        <Route path='/admin' element={<Login />} />
        <Route path='/admin/resetPassword' element={<ResetPassword />} />
        <Route path='/admin/manageProduct' element={<ProductList />} />
        <Route path='/admin/adminDashboard' element={<Dashboard />} />
        <Route path='/admin/verifyEmail' element={<VerifyEmail />} />
        <Route path='/admin/newPassword' element={<NewPassword />} />
        <Route path='/admin/manageCustomer' element={<Manage />} />
        <Route path='/admin/adminProfile' element={<AdminProfile />} />
        <Route path='/admin/addNewProduct' element={<NewProduct />} />
      </Routes>
    </BrowserRouter >
  );
}

// <Route path="/" element={<Layout />} > 
//   <Route index element={<Dashboard />} /> 
// </Route>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
