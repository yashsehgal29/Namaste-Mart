import { useContext } from "react";
import MyContext from "../../context/MyContext";

const OrderDetail = () => {
    const context = useContext(MyContext);
    const { getAllProduct,getAllOrder,deleteProduct } = context;
    return (
        <div>
               <div>
            <div className="py-5">
                {/* text  */}
                <h1 className="text-xl font-bold ">All Orders</h1>
            </div>

            {/* table  */}
            <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border border-collapse border-blue-200 sm:border-separate" >
                        <tbody>
                            <tr>
                                <th scope="col" className="h-12 px-6 font-bold border-l border-blue-200 text-md first:border-l-0 text-slate-700 bg-slate-100 fontPara">
                                    S.No
                                </th>
                                <th scope="col"
                                    className="h-12 px-6 font-bold border-l border-blue-200 text-md fontPara first:border-l-0 text-slate-700 bg-slate-100">
                                    Order ID
                                </th>
                                <th scope="col"
                                    className="h-12 px-6 font-bold border-l border-blue-200 text-md fontPara first:border-l-0 text-slate-700 bg-slate-100">
                                    Image
                                </th>
                                <th scope="col"
                                    className="h-12 px-6 font-bold border-l border-blue-200 text-md fontPara first:border-l-0 text-slate-700 bg-slate-100">
                                    Title
                                </th>
                                <th scope="col"
                                    className="h-12 px-6 font-bold border-l border-blue-200 text-md fontPara first:border-l-0 text-slate-700 bg-slate-100">
                                    Category 
                                </th>
                                <th scope="col"
                                    className="h-12 px-6 font-bold border-l border-blue-200 text-md fontPara first:border-l-0 text-slate-700 bg-slate-100">
                                    Price
                                </th>
                                <th scope="col"
                                    className="h-12 px-6 font-bold border-l border-blue-200 text-md fontPara first:border-l-0 text-slate-700 bg-slate-100">
                                    Quantity
                                </th>
                                <th scope="col"
                                    className="h-12 px-6 font-bold border-l border-blue-200 text-md fontPara first:border-l-0 text-slate-700 bg-slate-100">
                                    Total Price
                                </th>
                                <th scope="col"
                                    className="h-12 px-6 font-bold border-l border-blue-200 text-md fontPara first:border-l-0 text-slate-700 bg-slate-100">
                                    Order Status
                                </th>
                                <th scope="col"
                                    className="h-12 px-6 font-bold border-l border-blue-200 text-md fontPara first:border-l-0 text-slate-700 bg-slate-100">
                                    UserName
                                </th>
                                <th scope="col"
                                    className="h-12 px-6 font-bold border-l border-blue-200 text-md fontPara first:border-l-0 text-slate-700 bg-slate-100">
                                    Address
                                </th>
                                <th scope="col"
                                    className="h-12 px-6 font-bold border-l border-blue-200 text-md fontPara first:border-l-0 text-slate-700 bg-slate-100">
                                    PinCode
                                </th>
                                <th scope="col"
                                    className="h-12 px-6 font-bold border-l border-blue-200 text-md fontPara first:border-l-0 text-slate-700 bg-slate-100">
                                    Mobile Number
                                </th>
                                <th scope="col"
                                    className="h-12 px-6 font-bold border-l border-blue-200 text-md fontPara first:border-l-0 text-slate-700 bg-slate-100">
                                    E-Mail
                                </th>
                                <th scope="col"
                                    className="h-12 px-6 font-bold border-l border-blue-200 text-md fontPara first:border-l-0 text-slate-700 bg-slate-100">
                                    Date
                                </th>
                                <th scope="col"
                                    className="h-12 px-6 font-bold border-l border-blue-200 text-md fontPara first:border-l-0 text-slate-700 bg-slate-100">
                                    Action
                                </th>
                            </tr>
                            {getAllOrder.map((order) => {
                                console.log(order)
                                return (
                                    <>
                                        {order.cartItems.map((item, index) => {
                                            const { id, productImageUrl, title, category, price, quantity } = item
                                            return (
                                                <tr key={index} className="">
                                                    <td className="h-12 px-6 transition duration-300 border-t border-l border-blue-200 text-md first:border-l-0 stroke-slate-500 text-slate-500 ">
                                                        {index + 1}
                                                    </td>
                                                    <td className="h-12 px-6 transition duration-300 border-t border-l border-blue-200 text-md first:border-l-0 stroke-slate-500 text-slate-500 ">
                                                        {id}
                                                    </td>
                                                    <td className="h-12 px-6 transition duration-300 border-t border-l border-blue-200 text-md first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        <img src={productImageUrl} alt="img" />
                                                    </td>
                                                    <td className="h-12 px-6 transition duration-300 border-t border-l border-blue-200 text-md first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        {title}
                                                    </td>
                                                    <td className="h-12 px-6 transition duration-300 border-t border-l border-blue-200 text-md first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        {category}
                                                    </td>
                                                    <td className="h-12 px-6 transition duration-300 border-t border-l border-blue-200 text-md first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        ₹{price}
                                                    </td>
                                                    <td className="h-12 px-6 transition duration-300 border-t border-l border-blue-200 text-md first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        {quantity}
                                                    </td>
                                                    <td className="h-12 px-6 transition duration-300 border-t border-l border-blue-200 text-md first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        ₹{price * quantity}
                                                    </td>
                                                    <td className="h-12 px-6 text-green-600 transition duration-300 border-t border-l border-blue-200 text-md first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        {order.status}
                                                    </td>
                                                    <td className="h-12 px-6 transition duration-300 border-t border-l border-blue-200 text-md first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        {order.addressInfo.name}
                                                    </td>
                                                    <td className="h-12 px-6 transition duration-300 border-t border-l border-blue-200 text-md first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        {order.addressInfo.address}
                                                    </td>
                                                    <td className="h-12 px-6 transition duration-300 border-t border-l border-blue-200 text-md first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        {order.addressInfo.pincode}
                                                    </td>
                                                    <td className="h-12 px-6 transition duration-300 border-t border-l border-blue-200 text-md first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        {order.addressInfo.mobileNumber}
                                                    </td>
                                                    <td className="h-12 px-6 transition duration-300 border-t border-l border-blue-200 text-md first:border-l-0 stroke-slate-500 text-slate-500 ">
                                                        {order.email}
                                                    </td>
                                                    <td className="h-12 px-6 transition duration-300 border-t border-l border-blue-200 text-md first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        {order.date}
                                                    </td>
                                                    <td className="h-12 px-6 text-red-500 transition duration-300 border-t border-l border-blue-200 cursor-pointer text-md first:border-l-0 stroke-slate-500 text-slate-500 "

                                                        onClick={()=>deleteProduct(order.id)}
                                                    >
                                                        Delete
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
        </div>
        </div>
    );
}

export default OrderDetail;