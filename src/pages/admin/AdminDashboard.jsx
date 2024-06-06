import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ProductDetails from '../../components/admin/ProductDetails';
import OrderDetail from '../../components/admin/OrderDetail';
import MyContext from '../../context/MyContext';
import { useContext } from 'react';
import UserDetail from '../../components/admin/UserDetail';

const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const context = useContext(MyContext);
    const {getAllProduct, getAllOrder, getAllUser} = context;
    return (
        <div className='h-screen bg-white'>
            {/* Top */}
            <div className="px-5 mt-5 mb-5 top">
                <div className="py-5 bg-blue-100 border border-blue-100 rounded-lg">
                    <h1 className="text-2xl font-bold text-center ">Admin Dashboard</h1>
                </div>
            </div>

            <div className="px-5">
                {/* Mid  */}
                <div className="mb-5 mid">
                    {/* main  */}
                    <div className="py-5 bg-blue-100 border border-blue-100 rounded-xl">
                        {/* image  */}
                        <div className="flex justify-center">
                            <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="" />
                        </div>
                        {/* text  */}
                        <div className="">
                            <h1 className="text-lg text-center "><span className="font-bold ">Name :</span> {user.name}</h1>
                            <h1 className="text-lg text-center "><span className="font-bold ">Email :</span>{user.email}</h1>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="">
                    <Tabs>
                        <TabList className="flex flex-wrap justify-center -m-4 text-center">
                            {/* Total Products */}
                            <Tab className="w-full p-4 cursor-pointer md:w-1/3 sm:w-1/2">
                                <div className="px-4 py-3 bg-blue-100 border border-blue-200 hover:bg-blue-200 rounded-xl" >
                                    <div className="inline-block w-12 h-12 mb-3 " >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={50}
                                            height={50}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-shopping-basket"
                                        >
                                            <path d="m5 11 4-7" />
                                            <path d="m19 11-4-7" />
                                            <path d="M2 11h20" />
                                            <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4" />
                                            <path d="m9 11 1 9" />
                                            <path d="M4.5 15.5h15" />
                                            <path d="m15 11-1 9" />
                                        </svg>

                                    </div>
                                    <h2 className="text-3xl font-medium title-font fonts1" >{ getAllProduct.length}</h2>
                                    <p className="font-bold " >Total Products</p>
                                </div>
                            </Tab>

                            {/* Total Order  */}
                            <Tab className="w-full p-4 cursor-pointer md:w-1/4 sm:w-1/2">
                                <div className="px-4 py-3 bg-blue-100 border border-blue-200 hover:bg-blue-200 rounded-xl" >
                                    <div className="inline-block w-12 h-12 mb-3 " >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={50}
                                            height={50}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-list-ordered"
                                        >
                                            <line x1={10} x2={21} y1={6} y2={6} />
                                            <line x1={10} x2={21} y1={12} y2={12} />
                                            <line x1={10} x2={21} y1={18} y2={18} />
                                            <path d="M4 6h1v4" />
                                            <path d="M4 10h2" />
                                            <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                                        </svg>
                                    </div>
                                    <h2 className="text-3xl font-medium title-font fonts1" >{getAllOrder.length }</h2>
                                    <p className="font-bold " >Total Order</p>
                                </div>
                            </Tab>

                            {/* Total User  */}
                            <Tab className="w-full p-4 cursor-pointer md:w-1/3 sm:w-1/2">
                                <div className="px-4 py-3 bg-blue-100 border border-blue-100 hover:bg-blue-200 rounded-xl" >
                                    <div className="inline-block w-12 h-12 mb-3 " >
                                        
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={50}
                                            height={50}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-users"
                                        >
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                            <circle cx={9} cy={7} r={4} />
                                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>

                                    </div>
                                    <h2 className="text-3xl font-medium title-font fonts1" >{ getAllUser.length}</h2>
                                    <p className="font-bold " >Total Users</p>
                                </div>
                            </Tab>
                        </TabList>

                        <TabPanel>
                            <ProductDetails/>
                        </TabPanel>

                        <TabPanel>
                           <OrderDetail/>
                        </TabPanel>

                        <TabPanel>
                            <UserDetail/>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;