import { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import MyContext from "../../context/MyContext";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import { firedb } from "../../firebase/FirebaseConfig";
import { deleteDoc,doc } from "firebase/firestore";
const ProductDetails = () => {
    const context = useContext(MyContext);
    const { loader, getAllProduct,getAllProductFunction,setloader } = context;
    const navigate=useNavigate();
    const deleteProduct = async (id) => {
        setloader(true)
        try {
            await deleteDoc(doc(firedb, 'products', id))
            toast.success('Product Deleted successfully')
            getAllProductFunction();
            setloader(false)
        } catch (error) {
            console.log(error)
            setloader(false)
        }
    }
    // console.log(getAllProduct)
    return (
        <div>
            <div className="flex items-center justify-between py-5">
                {/* text  */}
                <h1 className="text-xl font-bold ">All Product</h1>
                {/* Add Product Button  */}
                <Link to={'/addproduct'}>
                    <button className="px-5 py-2 font-bold bg-blue-100 border border-blue-200 rounded-lg">Add Product</button>
                </Link>
            </div>

            {/* Loading  */}
            <div className="relative flex justify-center top-20">
                {loader && <Loader />}
            </div>
             
            {/* table  */}
            <div className="w-full mb-5 overflow-x-auto">

                <table className="w-full text-left border border-collapse border-blue-200 sm:border-separate" >

                    <tbody>
                        <tr>
                            <th scope="col" className="h-12 px-6 font-bold border-l border-blue-200 text-md first:border-l-0 text-slate-700 bg-slate-100 fontPara">S.No.</th>
                            <th scope="col" className="h-12 px-6 font-bold border-l border-blue-200 text-md first:border-l-0 text-slate-700 bg-slate-100 fontPara">Image</th>
                            <th scope="col" className="h-12 px-6 font-bold border-l border-blue-200 text-md fontPara first:border-l-0 text-slate-700 bg-slate-100">Title</th>
                            <th scope="col" className="h-12 px-6 font-bold border-l border-blue-200 text-md fontPara first:border-l-0 text-slate-700 bg-slate-100">Price</th>
                            <th scope="col" className="h-12 px-6 font-bold border-l border-blue-200 text-md fontPara first:border-l-0 text-slate-700 bg-slate-100">Category</th>
                            <th scope="col" className="h-12 px-6 font-bold border-l border-blue-200 text-md fontPara first:border-l-0 text-slate-700 bg-slate-100"> Date</th>
                            <th scope="col" className="h-12 px-6 font-bold border-l border-blue-200 text-md fontPara first:border-l-0 text-slate-700 bg-slate-100">Action</th>
                            <th scope="col" className="h-12 px-6 font-bold border-l border-blue-200 text-md fontPara first:border-l-0 text-slate-700 bg-slate-100">Action</th>
                        </tr>
                        {getAllProduct.map((item, index) => {
                            const { id, title, price, category, date, productImageUrl } = item
                            return (
                                <tr key={index} >
                                    <td className="h-12 px-6 transition duration-300 border-t border-l border-blue-200 text-md first:border-l-0 stroke-slate-500 text-slate-500 ">
                                        {index + 1}.
                                    </td>
                                    <td className="h-12 px-6 transition duration-300 border-t border-l border-blue-200 text-md first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        <div className="flex justify-center">
                                            <img className="w-20 " src={productImageUrl} alt="" />
                                        </div>
                                    </td>
                                    <td className="h-12 px-6 transition duration-300 border-t border-l border-blue-200 text-md first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {title}
                                    </td>
                                    <td className="h-12 px-6 transition duration-300 border-t border-l border-blue-200 text-md first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        ₹{price}
                                    </td>
                                    <td className="h-12 px-6 transition duration-300 border-t border-l border-blue-200 text-md first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {category}
                                    </td>
                                    <td className="h-12 px-6 transition duration-300 border-t border-l border-blue-200 text-md first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {date}
                                    </td>
                                    <td className="h-12 px-6 text-green-500 transition duration-300 border-t border-l border-blue-200 cursor-pointer text-md first:border-l-0 stroke-slate-500 text-slate-500 "
                                    onClick={()=> navigate(`/updateproduct/${id}`)}
                                    >
                                        Edit
                                    </td>
                                    <td className="h-12 px-6 text-red-500 transition duration-300 border-t border-l border-blue-200 cursor-pointer text-md first:border-l-0 stroke-slate-500 text-slate-500 "
                                     onClick={()=>deleteProduct(id)}
                                    >
                                        Delete
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductDetails;