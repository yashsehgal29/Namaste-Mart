import React, { useContext } from 'react'
import ProductCard from '../ProductCard/ProductCard';
import MyContext from '../../context/MyContext';

const HomePageProduct = () => {
    const context=useContext(MyContext);
    const { getAllProduct}=context
    return (
        <div className="flex flex-wrap gap-1 p-4 justify-evenly lg:p-10 lg:gap-4">
            {getAllProduct.slice(0,8).map(item => {
                const { id,title,price,productImageUrl,description } = item;
                return (
                    <div key={id} className="w-1/3 mb-5 md:w-1/2 lg:w-1/3 xl:w-1/5">
                        <ProductCard image={productImageUrl} p_name={title} p_desc={description} p_price={price} p_id={id} p_item={item } />
                    </div>
                );
            })}
        </div>
    );
}

export default HomePageProduct;
