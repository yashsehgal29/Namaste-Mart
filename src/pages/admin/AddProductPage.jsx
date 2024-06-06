import React, { useContext } from 'react'
import MyContext from '../../context/MyContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Timestamp,collection,addDoc } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { auth,firedb } from '../../firebase/FirebaseConfig'
import Loader from '../../components/Loader/Loader'

const categoryList = [
    {
        name: 'fashion'
    },
    {
        name: 'shirt'
    },
    {
        name: 'jacket'
    },
    {
        name: 'mobile'
    },
    {
        name: 'laptop'
    },
    {
        name: 'shoes'
    },
    {
        name: 'home'
    },
    {
        name: 'books'
    }
]
const AddProductPage = () => {
  const context=useContext(MyContext)
  const {loader,setloader} = context;
  const navigate=useNavigate();
  const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
        quantity : 1,
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
    const addproducthandle=async()=>{
      if (product.title == "" || product.price == "" || product.productImageUrl == "" || product.category == "" || product.description == "") {
            return toast.error("all fields are required")
        }
        setloader(true);
        try {
            const productRef = collection(firedb, 'products');
            await addDoc(productRef, product)
            toast.success("Add product successfully");
            navigate('/admindashboard')
            setloader(false)
        } catch (error) {
            console.log(error);
            setloader(false)
            toast.error("Add product failed");
        }

    }
  return (
     <div>
            <div className='flex items-center justify-center h-screen shadow-2xl'>
                {loader && <Loader />}
                {/* Login Form  */}
                <div className="px-8 py-6 border border-blue-200 shadow-md login_Form rounded-xl">
                    {/* Top Heading  */}
                    <div className="mb-5">
                        <h2 className='text-2xl font-bold text-center '>
                          Add Product
                        </h2>
                    </div>
                    {/* Input One  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    title: e.target.value
                                })
                            }}
                            placeholder='Product Title'
                            className='px-2 py-2 placeholder-blue-200 border border-blue-200 rounded-md outline-none w-96'
                        />
                    </div>
                    {/* Input Two  */}
                    <div className="mb-3">
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    price: e.target.value
                                })
                            }}
                            placeholder='Product Price'
                            className='px-2 py-2 placeholder-blue-200 border border-blue-200 rounded-md outline-none w-96'
                        />
                    </div>
                    {/* Input Three  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="productImageUrl"
                            value={product.productImageUrl}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    productImageUrl: e.target.value
                                })
                            }}
                            placeholder='Product Image Url'
                            className='px-2 py-2 placeholder-blue-200 border border-blue-200 rounded-md outline-none w-96'
                        />
                    </div>
                    {/* Input Four  */}
                    <div className="mb-3">
                        <select
                            value={product.category}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    category: e.target.value
                                })
                            }}
                            className="w-full px-1 py-2 placeholder-blue-200 border border-blue-200 rounded-md outline-none ">
                            <option disabled>Select Product Category</option>
                            {categoryList.map((value, index) => {
                                const { name } = value
                                return (
                                    <option className=" first-letter:uppercase" key={index} value={name}>{name}</option>
                                )
                            })}
                        </select>
                    </div>
                    {/* Input Five  */}
                    <div className="mb-3">
                        <textarea
                            value={product.description}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    description: e.target.value
                                })
                            }} name="description" placeholder="Product Description" rows="5" className="w-full px-2 py-1 placeholder-blue-200 border border-blue-200 rounded-md outline-none ">
                        </textarea>
                    </div>
                    {/* Add Product Button  */}
                    <div className="mb-3">
                        <button
                            onClick={addproducthandle}
                            type='button'
                            className='w-full py-2 font-bold text-center text-white bg-blue-400 rounded-md hover:bg-blue-600 '
                        >
                          Add product
                        </button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default AddProductPage
