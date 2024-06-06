import { Button } from "@material-tailwind/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import ProductInfo from "./pages/ProductInfo";
import CartPage from "./pages/CartPage";
import AllProductpage from "./pages/AllProductpage";
import SignUppage from "./pages/SignUppage";
import Signinpage from "./pages/Signinpage";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProductPage from "./pages/admin/AddProductPage";
import UpdateProductPage from "./pages/admin/UpdateProductPage";
import MyState from "./context/MyState";
import { Toaster } from "react-hot-toast";
import { UserRoute } from "./protectedroutes/UserRoute";
import { AdminRoute } from "./protectedroutes/AdminRoute";
import Category from "./components/category/Category";
import Categorypage from "./pages/Categorypage";
export default function App() {
  return (
    <MyState >
      <div className="w-full h-full bg-[#DFF6FF] text-[#27399b]">
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/productInfo/:id" element={<ProductInfo/>} />
          <Route path="/cart" element={<CartPage/>}/>
          <Route path="/allproducts" element={<AllProductpage/>}/>
          <Route path="/category/:categoryname" element={<Categorypage/>}/>
          <Route path="/signup" element={<SignUppage/>}/>
          <Route path="/login" element={<Signinpage/>}/>
          <Route path="/userdashboard" element={
            <UserRoute>
              <UserDashboard/>
            </UserRoute>
          }/>
          <Route path="/admindashboard" element={
            <AdminRoute>
              <AdminDashboard/>
            </AdminRoute>
          }/>
          <Route path="/addproduct" element={
            <AdminRoute>
              <AddProductPage/>
            </AdminRoute>
          }/>
          <Route path="/updateproduct/:id" element={
            <AdminRoute>
               <UpdateProductPage/>
            </AdminRoute>
         
          }/>

        </Routes>
        <Toaster/>
      </BrowserRouter>
      </div>
      
    </MyState>
  );
}
