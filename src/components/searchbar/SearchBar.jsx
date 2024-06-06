import { useContext, useState } from "react";
import MyContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";

// Search Data


const SearchBar = () => {
   // Search State 
    const [search, setSearch] = useState("");
    const context = useContext(MyContext)
    const { getAllProduct } = context;

   // Filter Search Data
     const filterSearchData = getAllProduct.filter((obj) => obj.title.toLowerCase().includes(search)).slice(0, 8)
    const navigate = useNavigate();
  return (
    <div className="">
    {/* search input  */}
    <div className="flex justify-center input">
        <input
            type="text"
            placeholder='Search here'
            onChange={(e) => setSearch(e.target.value)}
            className='px-2 py-2 text-[#051367] placeholder-[#051367] bg-[#DFF6FF] rounded-lg outline-none  w-96 lg:w-96 md:w-96'
        />
    </div>

    {/* search drop-down  */}
    <div className="flex justify-center ">
        {search && <div className="absolute outline-double z-50 block px-2 py-2 my-1 bg-[#DFF6FF] rounded-lg w-96 md:w-96 lg:w-96">
            {filterSearchData.length > 0 ?
                <div>
                    {filterSearchData.map((item, index) => {
                        return (
                            <div key={index} className="px-2 py-2 mb-2 bg-[#90d3ed] rounded-lg"
                                onClick={()=>navigate(`/productinfo/${item.id}`)}
                            >
                                <div className="flex items-center gap-2 font-semibold">
                                    <img className="w-10 bg-white" src={item.productImageUrl} alt="product img" />
                                    {item.title}
                                </div>
                            </div>
                        )
                    })}
                </div>
                :

                <>
                    <div className="flex justify-center">
                        <img className="w-20 " src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png" alt="img" />
                    </div>
                </>}
        </div>
        }
    </div>
</div>
  );
}

export default SearchBar;