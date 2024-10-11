import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './features/admin/login';
import Dashboard from './features/admin/dashboard';
import ProductList from './features/admin/manageProducts/productsList';
import ForgotPassword from './features/admin/forgotPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/adminlogin' element={<Login />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/adminDashboard' element={<Dashboard />} />
        <Route path='/productsList' element={<ProductList />} />
      </Routes>
    </BrowserRouter>
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
