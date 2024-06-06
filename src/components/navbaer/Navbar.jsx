import React from "react";
import { Link ,useNavigate} from "react-router-dom";
import SearchBar from "../searchbar/SearchBar";
import { useSelector } from "react-redux";

const Navbar = () => {
  // get user from localStorage 
    const user = JSON.parse(localStorage.getItem('users'));

    // navigate 
    const navigate = useNavigate();

    // logout function 
    const logout = () => {
        localStorage.clear('users');
        navigate("/login")
    }
        const cartItems = useSelector((state) => state.cart);

  const navlist = (
        <ul className="flex items-center justify-center font-extrabold text-[#24428c] gap-8 text-md px-5 ">
            {/* Home */}
            <li>
                <Link to={'/'}>Home</Link>
            </li>
            {/* All Product */}
            <li>
                <Link to={'/allproducts'}>All Product</Link>
            </li>
            {/* Signup */}
            {!user ? <li>
                <Link to={'/signup'}>Signup</Link>
            </li> : ""}
            {/* Signup */}
            {!user ? <li>
                <Link to={'/login'}>Login</Link>
            </li> : ""}
            {/* User */}
            {user?.role === "user" && <li>
                <Link to={'/userdashboard'}>{user?.name}</Link>
            </li>}
            {/* Admin */}
            {user?.role === "admin" && <li>
                <Link to={'/admindashboard'}>Admin</Link>
            </li>}
            {/* logout */}
            {user && <li className="cursor-pointer " onClick={logout}>Log out
            </li>}
            {/* Cart */}
            <li>
                <Link to={'/cart'}>
                    Cart({cartItems.length})
                </Link>
            </li>
        </ul>
    )
  return (
    <div className="bg-[#83D0FF]  sticky top-0">
      <div className="items-center px-2 py-3 lg:flex lg:justify-between lg:px-9">
        {/* Left */}
        <div className="flex items-center py-3 text-2xl font-extrabold text-center left lg:py-0" >
          <img className="h-12 w-14" src="/src/assets/namaste.png"/>
          <Link to={'/'}> Namaste-Mart</Link>
          <img className="w-12" src="/src/assets/cart.png"/>
         
        </div>
        {/* right */}
        <div className="flex justify-center mb-4 right lg:mb-0">
          {navlist}
        </div>
        {/* searchbar */}
        <SearchBar/>
      </div>
    </div>
  );
};

export default Navbar;
