import { useContext, useState ,useEffect} from "react";
import MyContext from "../../context/MyContext";
import { useNavigate, useParams } from "react-router-dom";
import { firedb,auth } from "../../firebase/FirebaseConfig";
import { getDoc,Timestamp,doc,setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
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
    },
    {
        name:'Sports'
    }
]

const UpdateProductPage = () => {
  const context=useContext(MyContext);
  const navigate=useNavigate();
  const{loader,getAllProductFunction,setloader}=context;
  const {id}=useParams();
    console.log(id);
  const [product, setproduct] = useState({
    title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
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
  const getSingleProductFunction = async () => {
        setloader(true);
        try {
            const productTemp = await getDoc(doc(firedb, "products", id))
            const product = productTemp.data();
            setproduct({
                title: product?.title,
                price: product?.price,
                productImageUrl: product?.productImageUrl,
                category: product?.category,
                description: product?.description,
                quantity : product?.quantity,
                time: product?.time,
                date: product?.date
            })
            setloader(false);

        } catch (error) {
            console.log(error);
            setloader(false);
        }
    }
    const updateProduct = async () => {
        setloader(true)
        try {

            await setDoc(doc(firedb, 'products', id), product)
            toast.success("Product Updated successfully")
            getAllProductFunction();
            setloader(false)
            navigate('/admindashboard')

        } catch (error) {
            console.log(error)
            setloader(false)
        }
    }
    useEffect(() => {
        getSingleProductFunction();
    }, []);

    return (
        <div>
            <div className='flex items-center justify-center h-screen'>
              {loader && <Loader/>}
                {/* Login Form  */}
                <div className="px-8 py-6 border border-blue-200 shadow-md login_Form rounded-xl">

                    {/* Top Heading  */}
                    <div className="mb-5">
                        <h2 className='text-2xl font-bold text-center '>
                            Update Product
                        </h2>
                    </div>

                    {/* Input One  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="title"
                            placeholder='Product Title'
                            value={product.title}
                            className='px-2 py-2 placeholder-blue-200 border border-blue-300 rounded-md outline-none t w-96'
                            onChange={(e) => {
                                setproduct({
                                    ...product,
                                    title: e.target.value
                                })
                            }}
                        />
                    </div>

                    {/* Input Two  */}
                    <div className="mb-3">
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            placeholder='Product Price'
                            className='px-2 py-2 placeholder-blue-200 border border-blue-300 rounded-md outline-none w-96'
                            onChange={(e) => {
                                setproduct({
                                    ...product,
                                    price: e.target.value
                                })
                            }}
                        />
                    </div>

                    {/* Input Three  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="productImageUrl"
                            value={product.productImageUrl}
                            placeholder='Product Image Url'
                            className='px-2 py-2 placeholder-blue-200 border border-blue-300 rounded-md outline-none w-96'
                            onChange={(e) => {
                                setproduct({
                                    ...product,
                                    productImageUrl: e.target.value
                                })
                            }}
                        />
                    </div>

                    {/* Input Four  */}
                    <div className="mb-3">
                        <select
                            className="w-full px-1 py-2 border border-blue-300 rounded-md outline-none "
                            value={product.category}
                            onChange={(e) => {
                                setproduct({
                                    ...product,
                                    category: e.target.value
                                })
                            }}
                            >
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
                            name="description" placeholder="Product Description" rows="5" className="w-full px-2 py-1 placeholder-blue-200 border border-blue-300 rounded-md outline-none "
                            onChange={(e) => {
                                setproduct({
                                    ...product,
                                    description: e.target.value
                                })
                            }}>
                        </textarea>
                    </div>

                    {/* Update Product Button  */}
                    <div className="mb-3">
                        <button
                        onClick={updateProduct}
                            type='button'
                            className='w-full py-2 font-bold text-center text-white bg-blue-200 rounded-md 0 hover:bg-blue-400 '
                        >
                            Update Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProductPage;