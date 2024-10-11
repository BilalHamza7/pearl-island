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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/resetPassword' element={<ResetPassword />} />
        <Route path='/productsList' element={<ProductList />} />
        <Route path='/adminDashboard' element={<Dashboard />} />
        <Route path='/verifyEmail' element={<VerifyEmail />} />
        <Route path='/newPassword' element={<NewPassword />} />
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
