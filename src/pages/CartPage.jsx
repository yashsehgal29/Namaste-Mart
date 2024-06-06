import React from 'react'
import Layout from '../components/layout/Layout'
import { Trash } from 'lucide-react'
import MyContext from '../context/MyContext'
import { useEffect, useContext ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incrementQuantity, decrementQuantity, deleteFromCart } from '../redux/CartSlice'
import { firedb } from '../firebase/FirebaseConfig'
import toast from 'react-hot-toast'
import { Timestamp ,collection,addDoc} from 'firebase/firestore'
import BuyNowModal from '../components/buynowmodel/ByNow'
const CartPage = () => {
    // const products = [
    // {
    //     id: 1,
    //     name: 'Nike Air Force 1 07 LV8',
    //     href: '#',
    //     price: '₹47,199',
    //     originalPrice: '₹48,900',
    //     discount: '5% Off',
    //     color: 'Orange',
    //     size: '8 UK',
    //     imageSrc:
    //         'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png',
    // },
    // {
    //     id: 2,
    //     name: 'Nike Blazer Low 77 SE',
    //     href: '#',
    //     price: '₹1,549',
    //     originalPrice: '₹2,499',
    //     discount: '38% off',
    //     color: 'White',
    //     leadTime: '3-4 weeks',
    //     size: '8 UK',
    //     imageSrc:
    //         'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e48d6035-bd8a-4747-9fa1-04ea596bb074/blazer-low-77-se-shoes-0w2HHV.png',
    // },
    // {
    //     id: 3,
    //     name: 'Nike Air Max 90',
    //     href: '#',
    //     price: '₹2219 ',
    //     originalPrice: '₹999',
    //     discount: '78% off',
    //     color: 'Black',
    //     imageSrc:
    //         'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fd17b420-b388-4c8a-aaaa-e0a98ddf175f/dunk-high-retro-shoe-DdRmMZ.png',
    // },
    // ]
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Delete cart")
    }

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id));
    };

    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id));
    };
    
     const cartItemTotal = cartItems.map(item => item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);

    const cartTotal = cartItems.map(item => item.price * item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);

    const user = JSON.parse(localStorage.getItem('users'))
    const [addressInfo, setAddressInfo] = useState({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });

    const buyNowFunction = () => {
        // validation 
        if (addressInfo.name === "" || addressInfo.address === "" || addressInfo.pincode === "" || addressInfo.mobileNumber === "") {
            return toast.error("All Fields are required")
        }

        // Order Info 
        const orderInfo = {
            cartItems,
            addressInfo,
            email: user.email,
            userid: user.uid,
            status: "confirmed",
            time: Timestamp.now(),
            date: new Date().toLocaleString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }
            )
        }
        try {
            const orderRef = collection(firedb, 'order');
            addDoc(orderRef, orderInfo);
            setAddressInfo({
                name: "",
                address: "",
                pincode: "",
                mobileNumber: "",
            })
            toast.success("Order Placed Successfull")
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])

    
  return (
    <Layout>
       <div className="container px-4 mx-auto max-w-7xl lg:px-0">
                <div className="max-w-2xl py-8 mx-auto lg:max-w-7xl">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Shopping Cart
                    </h1>
                    <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                        <section aria-labelledby="cart-heading" className="bg-[#fff] rounded-lg lg:col-span-8">
                            <h2 id="cart-heading" className="sr-only">
                                
                            </h2>
                            <ul role="list" className="divide-y divide-gray-200">
                              {cartItems.map((item, index) => {
                                  const { id, title, price, productImageUrl, quantity, category } = item;
                                  return (
                                       <div key={index} className="">
                                                    <li className="flex py-6 sm:py-6 ">
                                                        <div className="flex-shrink-0">
                                                            <img
                                                                src={productImageUrl}
                                                                alt="img"
                                                                className="object-contain object-center w-24 h-24 rounded-md sm:h-38 sm:w-38"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col justify-between flex-1 ml-4 sm:ml-6">
                                                            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                                <div>
                                                                    <div className="flex justify-between">
                                                                        <h3 className="text-sm">
                                                                            <div className="font-semibold ">
                                                                                {title}
                                                                            </div>
                                                                        </h3>
                                                                    </div>
                                                                    <div className="flex mt-1 text-sm">
                                                                        <p className="text-sm text-gray-500">{category}</p>
                                                                    </div>
                                                                    <div className="flex items-end mt-1">
                                                                        <p className="text-sm font-medium text-gray-900">
                                                                            ₹{price}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <div className="flex mb-2">
                                                        <div className="flex min-w-24">
                                                  <button onClick={() => handleDecrement(id)} type="button" className="h-7 w-7" >
                                                      -
                                                            </button>
                                                            <input
                                                                type="text"
                                                                className="mx-1 text-center border rounded-md h-7 w-9"
                                                      value={quantity}
                                                      onChange={(e) => {
                                                          e.target.value
                                                      }}
                                                            />
                                                  <button onClick={() => handleIncrement(id)} type="button" className="flex items-center justify-center h-7 w-7">
                                                      +
                                                            </button>
                                                        </div>
                                                        <div className="flex ml-6 text-sm">
                                                            <button onClick={() => deleteCart(item)} type="button" className="flex items-center px-2 py-1 pl-0 space-x-1">
                                                                <Trash size={12} className="text-red-500" />
                                                                <span className="text-xs font-medium text-red-500">Remove</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                  )
                              })
                                  
                                  
                                }
                            </ul>
                        </section>
                        {/* Order summary */}
                        <section
                            aria-labelledby="summary-heading"
                            className="mt-16 bg-white rounded-md lg:col-span-4 lg:mt-0 lg:p-3"
                        >
                            <h2
                                id="summary-heading"
                                className="px-4 py-3 text-lg font-bold text-gray-900 border-b border-gray-200 sm:p-4"
                            >
                                Price Details
                            </h2>
                            <div>
                                <dl className="px-2 py-4 space-y-1 ">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm text-gray-800">Price ({cartItemTotal} item)</dt>
                                      <dd className="text-sm font-medium text-gray-900">₹ {cartTotal }</dd>
                                    </div>
                                    
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="flex text-sm text-gray-800">
                                            <span>Delivery Charges</span>
                                        </dt>
                                        <dd className="text-sm font-medium text-green-700">Free</dd>
                                    </div>
                                    <div className="flex items-center justify-between py-4 border-dashed border-y ">
                                        <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                                      <dd className="text-base font-medium text-gray-900">₹ { cartTotal}</dd>
                                    </div>
                                </dl>
                                <div className="px-2 pb-4 font-medium text-green-700">
                                <div className="flex gap-4 mb-6">
                                    {user
                                            ? <BuyNowModal
                                                addressInfo={addressInfo}
                                                setAddressInfo={setAddressInfo}
                                                buyNowFunction={buyNowFunction}
                                            /> : <Navigate to={'/login'}/>
                                        }
                                </div>
                                </div>
                            </div>
                        </section>
                    </form>
                </div>
            </div>
    </Layout>
  )
}

export default CartPage
