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
import Navbar from './features/admin/components/navbar';
import NewProduct from './features/admin/manageProducts/newProducts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/resetPassword' element={<ResetPassword />} />
        <Route path='/manageProduct' element={<ProductList />} />
        <Route path='/adminDashboard' element={<Dashboard />} />
        <Route path='/verifyEmail' element={<VerifyEmail />} />
        <Route path='/newPassword' element={<NewPassword />} />
        <Route path='/manageCustomer' element={<Manage />} />
        <Route path='/adminProfile' element={<AdminProfile />} />
        <Route path='/addNewProduct' element={<NewProduct />} />
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
