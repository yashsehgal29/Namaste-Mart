import React from 'react'
import Layout from '../components/layout/Layout'
import { useContext,useState,useEffect } from 'react';
import { firedb } from '../firebase/FirebaseConfig';
import MyContext from '../context/MyContext';
import { getDoc,doc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import Loader from '../components/Loader/Loader';
import { addToCart, deleteFromCart } from "../redux/CartSlice"
import toast from 'react-hot-toast';
const ProductInfo = () => {
    const context = useContext(MyContext);
    const { loader, setloader } = context;

    const [product, setProduct] = useState('')

    const { id } = useParams()

    // console.log(product)

    // getProductData
    const getProductData = async () => {
        setloader(true)
        try {
            const productTemp = await getDoc(doc(firedb, "products", id))
            setProduct({...productTemp.data(), id : productTemp.id})
            setloader(false)
        } catch (error) {
            console.log(error)
            setloader(false)
        }
    }
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const addCart = (item) => {
        // console.log(item)
        dispatch(addToCart(item));
        toast.success("Add to cart")
    }
    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Product removed from cart")
    }
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])


    useEffect(() => {
        getProductData()

    }, [])
  return (
    <Layout>
         <section className="flex items-center justify-center py-5 lg:py-16 font-poppins ">
            {loader?
            <>
            <div className='flex items-center justify-center"'>
                <Loader/>
            </div>
            </> :
            <>
             <div className="max-w-6xl px-4 mx-auto">
                    <div className="flex flex-wrap mb-24 -mx-4">
                        <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                            <div className="">
                                <div className="">
                                    <img
                                        className=" w-full lg:h-[39em] rounded-lg"
                                        src={product.productImageUrl}
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                            <div className="lg:pl-20">
                                <div className="mb-6 ">
                                    <h2 className="max-w-xl mb-6 text-xl font-semibold leading-loose tracking-wide md:text-2xl dark:text-gray-300">
                                       {product.title}
                                    </h2>
                                   
                                    <p className="inline-block text-2xl font-semibold dark:text-gray-400 ">
                                        <span>Rs. {product.price}</span>
                                    </p>
                                </div>
                                <div className="mb-6">
                                    <h2 className="mb-2 text-lg font-bold ">
                                    </h2>
                                    <p>{product.description} </p>
                                </div>
                                <div className="mb-6 " />
                                      <div className="flex flex-wrap items-center mb-6">
                                          {cartItems.some((p) => p.id === product.id) ?
                                              <button
                                                  onClick={() => deleteCart(product)}
                                        className="w-full px-4 py-3 text-center bg-[#83D0FF] hover:bg-[#b1d9f3] font-bold rounded-xl"
                                    >
                                        Remove from Cart
                                              </button>
                                              :
                                              <button
                                                  onClick={()=>addCart(product)}
                                        className="w-full px-4 py-3 text-center bg-[#83D0FF] hover:bg-[#b1d9f3] font-bold rounded-xl"
                                    >
                                        Add To Cart
                                    </button>
                                            }
                                    
                                      </div>
                                      
                            </div>
                        </div>
                    </div>
                </div>
            </>
        }
            
               
            </section>
    </Layout>
    
  )
}

export default ProductInfo
