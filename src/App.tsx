import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from './pages/Login';
import Home from './pages/Home';
// import Products from './pages/Products';
import Orders from './pages/Orders';
import Cart from './pages/Cart';
import Account from './pages/Account';

const App = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Any logged in user */}
      <Route element={<ProtectedRoute></ProtectedRoute>}>
        <Route path="/home" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Account />} />
      </Route>

      {/* Catch all - redirect to login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App;