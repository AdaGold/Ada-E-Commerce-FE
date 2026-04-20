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
      <Route path="/login" element= {<Login />} />

      {/* Any logged in user */}
      <Route path="/home" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/orders" element={
        <ProtectedRoute>
          <Orders />
        </ProtectedRoute>
      } />
      <Route path="/cart" element={
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      } />
      <Route path="/account" element={
        <ProtectedRoute>
          <Account />
        </ProtectedRoute>
      } />

      {/* Admin only
      <Route path="/products" element={
        <ProtectedRoute>
          <Products />
        </ProtectedRoute>
      } /> */}

      {/* Catch all - redirect to login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App;