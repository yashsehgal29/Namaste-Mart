import Layout from "../components/layout/Layout";
import MyContext from "../context/MyContext";
import { useContext } from "react";
import Loader from "../components/Loader/Loader"
// const products = [
//     {
//         id: 1,
//         name: 'Nike Air Force 1 07 LV8',
//         imageSrc:
//             'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png',
//         href: '#',
//         price: '₹61,999',
//         color: 'Orange',
//         imageAlt: 'Nike Air Force 1 07 LV8',
//         quantity: 1,
//     },
// ]

const UserDashboard = () => {
    
    const user = JSON.parse(localStorage.getItem('users'));

    const context = useContext(MyContext);
    const { loader, getAllOrder } = context
    return (
        <Layout>
            <div className="container px-4 py-5 mx-auto lg:py-8">
                {/* Top  */}
                <div className="top ">
                    {/* main  */}
                    <div className="py-5 border rounded-xl">
                        {/* image  */}
                        <div className="flex justify-center">
                            <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="" />
                        </div>
                        {/* text  */}
                        <div className="">
                            <h1 className="text-lg text-center "><span className="font-bold ">Name :</span> {user.name}</h1>
                            <h1 className="text-lg text-center "><span className="font-bold ">Email :</span>{user.email}</h1>
                            <h1 className="text-lg text-center ">
                                <span className="font-bold ">Date : </span>
                                {user?.date}
                            </h1>
                            {/* Role  */}
                            <h1 className="text-lg text-center ">
                                <span className="font-bold ">Role : </span>
                                {user.role}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* bottom  */}
                <div className="bottom">
                    {/* main 1 */}
                    <div className="max-w-6xl px-2 mx-auto my-4 md:my-6 md:px-0">
                        {/* text  */}
                        <h2 className="text-2xl font-bold lg:text-3xl">Order Details</h2>
                        <div className="relative flex justify-center top-10">
                        {loader && <Loader/>}
                        </div>
                        {/* main 2 */}
                        {getAllOrder.filter((obj) => obj.userid === user?.uid).map((order, index) => {
                            // console.log(order);
                            return (
                                <div key={index}>
                                    {order.cartItems.map((item, index) => {
                                        // console.log('item', item);
                                        const { id, date, quantity, price, title, productImageUrl, category } = item
                                        // console.log('order', order)
                                        const { status } = order
                                        return (
                                            <div key={index} className="flex flex-col mt-5 overflow-hidden border border-blue-100 rounded-xl md:flex-row">
                                                {/* main 3  */}
                                                <div className="w-full bg-blue-100 border-r border-blue-100 md:max-w-xs">
                                                    {/* left  */}
                                                    <div className="p-8">
                                                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                                                            <div className="mb-4">
                                                                <div className="text-sm font-semibold text-black">Order Id</div>
                                                                <div className="text-sm font-medium text-gray-900">#{id}</div>
                                                            </div>
                                                            <div className="mb-4">
                                                                <div className="text-sm font-semibold">Date</div>
                                                                <div className="text-sm font-medium text-gray-900">{date}</div>
                                                            </div>
                                                            <div className="mb-4">
                                                                <div className="text-sm font-semibold">Total Amount</div>
                                                                <div className="text-sm font-medium text-gray-900">₹ {price * quantity}</div>
                                                            </div>
                                                            <div className="mb-4">
                                                                <div className="text-sm font-semibold">Order Status</div>                              
                                                                  <div className="text-sm font-medium text-green-800 first-letter:uppercase">{status}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* right  */}
                                                <div className="flex-1">
                                                    <div className="p-8">
                                                        <ul className="divide-y divide-gray-200 -my-7">
                                                            <li
                                                                className="flex flex-col justify-between space-x-5 py-7 md:flex-row"
                                                            >
                                                                <div className="flex items-stretch flex-1">
                                                                    <div className="flex-shrink-0">
                                                                        <img
                                                                            className="object-contain w-40 h-40 border border-gray-200 rounded-lg"
                                                                            src={productImageUrl}
                                                                            alt="img"
                                                                        />
                                                                    </div>
                                                                    <div className="flex flex-col justify-between ml-5">
                                                                        <div className="flex-1">
                                                                            <p className="text-sm font-bold text-gray-900">{title}</p>
                                                                            <p className="mt-1.5 text-sm font-medium text-gray-500">{category}</p>
                                                                        </div>
                                                                        <p className="mt-4 text-sm font-medium text-gray-500">x {quantity}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col items-end justify-between ml-auto">
                                                                    <p className="text-sm font-bold text-right text-gray-900">₹ {price}</p>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UserDashboard;