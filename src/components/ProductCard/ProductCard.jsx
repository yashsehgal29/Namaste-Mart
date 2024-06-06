import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/CartSlice";
import { useSelector, useDispatch } from 'react-redux';

const ProductCard = ({ p_id, image, p_name, p_desc, p_price, p_item }) => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart) ; // Ensure cartItems is an array
  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to cart");
  }

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Removed from cart");
  }
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img
        className="object-cover w-full h-full rounded-t-lg cursor-pointer"
        src={image}
        alt={p_name}
        onClick={() => navigate(`/productinfo/${p_id}`)}
      />
      <div className="p-3">
        <h5 className="mb-2 overflow-hidden font-bold text-gray-900 text-nowrap text-2sxl dark:text-white">{p_name}</h5>
        <p className="w-1/3 mb-3 overflow-hidden text-sm font-normal text-gray-700 dark:text-gray-400 text-nowrap lg-text-lg">{p_desc}</p>
        <h5 className="mb-2 overflow-hidden font-bold text-gray-900 text-nowrap text-2sxl dark:text-white">Rs.{p_price}</h5>
        <div className="flex justify-center">
          { cartItems.some((p) => p.id === p_item.id) ? (
            <button
              onClick={() => deleteCart(p_item)}
              className="bg-blue-500 hover:bg-blue-400 w-full text-white py-[4px] rounded-lg font-bold"
            >
              Remove from Cart
            </button>
          ) : (
            <button
              onClick={() => addCart(p_item)}
              className="bg-blue-500 hover:bg-blue-400 w-full text-white py-[4px] rounded-lg font-bold"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
