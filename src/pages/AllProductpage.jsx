import React from 'react'
import Layout from '../components/layout/Layout'
import ProductCard from '../components/ProductCard/ProductCard'
import MyContext from '../context/MyContext';
import { useContext } from 'react';
import Loader from '../components/Loader/Loader';


const AllProductpage = () => {
    const context=useContext(MyContext);
    const { getAllProduct,loader}=context
  return (
    <Layout>
        <div className="py-8">

            {/* Heading  */}
            <div className="">
                <h1 className="mb-5 text-3xl font-semibold text-center ">All Products</h1>
            </div>
            
               {loader && 
               <div className='flex items-center justify-center mt-10'>
               <Loader/>
               </div>}
           
            
            {/* main  */}
           <div className="flex flex-wrap gap-1 p-4 justify-evenly lg:p-10 lg:gap-4">
            {getAllProduct.map(item => {
                const { id,title,price,productImageUrl,description } = item;
                return (
                    <div key={id} className="w-1/3 mb-5 md:w-1/2 lg:w-1/3 xl:w-1/5">
                        <ProductCard  image={productImageUrl} p_name={title} p_desc={description} p_price={price} p_id={id} p_item={item} />
                    </div>
                );
            })}
        </div>
        </div>
    </Layout>
  )
}

export default AllProductpage
