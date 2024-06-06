 import React, { useContext } from 'react'
 import { useNavigate, useParams } from 'react-router-dom'
 import Layout from '../components/layout/Layout'
import MyContext from '../context/MyContext';
import Loader from '../components/Loader/Loader';
import ProductCard from '../components/ProductCard/ProductCard'
const Categorypage = () => {
    const {categoryname}=useParams();
    const context=useContext(MyContext);
    const {getAllProduct,loader}=context;
    const navigate=useNavigate()
    const filterProduct = getAllProduct.filter((obj)=> obj.category.includes(categoryname));
  return (
    <Layout>
      <div className="mt-10">
                {/* Heading  */}
                <div className="">
                    <h1 className="mb-5 text-2xl font-semibold text-center first-letter:uppercase">{categoryname}</h1>
                </div>
                {loader ?

                    <div className="flex justify-center">
                        <Loader />
                    </div>

                    :

                    <section className=" body-font">
                        {/* main 2 */}
                        <div className="container px-5 py-5 mx-auto">
                            {/* main 3  */}
                            <div className="flex flex-wrap gap-1 p-4 justify-evenly lg:p-10 lg:gap-4">
                                {filterProduct.length > 0 ?
                                    <>
                                        {filterProduct.map((item, index) => {
                                            const { id, title, price, productImageUrl,description } = item;
                                            return (
                                                <div key={id} className="w-1/3 mb-5 md:w-1/2 lg:w-1/3 xl:w-1/5">
                                                         <ProductCard image={productImageUrl} p_name={title} p_desc={description} p_price={price} p_id={id} p_item={item } />
                                                </div>
                                            )
                                        })}
                                    </>

                                    :

                                    <div>
                                        <div className="flex justify-center">
                                            <img className="mb-2 " src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png" alt="" />
                                        </div>
                                        <h1 className="text-xl ">No {categoryname} product found</h1>
                                    </div>
                                }
                            </div>
                        </div>
                    </section>

                }
            </div>
    </Layout>
  )
}

export default Categorypage
