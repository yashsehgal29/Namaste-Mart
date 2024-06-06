/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../context/MyContext";
import Loader from "../components/Loader/Loader";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query,QuerySnapshot,onSnapshot ,where} from "firebase/firestore";
import {auth, firedb } from "../firebase/FirebaseConfig";
const Login = () => {
    const context=useContext(MyContext);
    const {loader,setloader}=context;
    //navigate object
    const navigate=useNavigate();
    //user Sign in state
    const [userlogin, setuserlogin] = useState({
        name:"",
        password:"",
    });
    
    const loginhandle=async()=>{
        if(userlogin.email === "" || userlogin.password ===""){
            toast.error("All the Fields are Required !");
        }
        setloader(true);
        try{
         const users=await signInWithEmailAndPassword(auth,userlogin.email,userlogin.password);
        try {
            const q = query(
                    collection(firedb, "user"),
                    where('uid', '==', users?.user?.uid)
                );
            const data = onSnapshot(q, (QuerySnapshot) => {
                    let user;
                    QuerySnapshot.forEach((doc) => user = doc.data());
                    localStorage.setItem("users", JSON.stringify(user) )
                    setuserlogin({
                        email: "",
                        password: ""
                    })
                    toast.success("Login Successfully");
                    setloader(false);
                    if(user.role === "user") {
                        navigate('/userdashboard');
                    }else{
                        navigate('/admindashboard');
                    }
                });
           
            return ()=>data;
            
        }catch(error){
            console.log(error);
            setLoading(false);
        }
     }catch (error) {
            console.log(error)
            setloader(false);
            toast.error("Login Failed");
        }
    }
    return (
        <div className='flex items-center justify-center h-screen'>
            {loader&&<Loader/> }
            {/* Login Form  */}
            <div className="px-1 py-6 border shadow-md border-blue-gray-100 login_Form bg-[#DFF6FF] lg:px-8 rounded-xl">

                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-2xl font-bold text-center '>
                        Login
                    </h2>
                </div>

                {/* Input Two  */}
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder='Email Address'
                        className='px-2 py-2 placeholder-[#2659cf]  rounded-md outline-none shadow-md  w-96'
                        onChange={(e)=>{
                            setuserlogin({
                                ...userlogin,
                                email: e.target.value,
                            })
                        }}
                    />
                </div>

                {/* Input Three  */}
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        className='px-2 py-2 placeholder-[#2659cf] border-[#2962e7]rounded-md outline-none shadow-md w-96'
                        onChange={(e)=>{
                            setuserlogin({
                                ...userlogin,
                                password: e.target.value,
                            })
                        }}
                    />
                </div>

                {/* Signup Button  */}
                <div className="mb-5">
                    <button
                        type='button'
                        className='w-full py-2 font-bold text-center text-white bg-[#2D31FA] rounded-md shadow-md hover:bg-[#1c1eab] '
                        onClick={loginhandle}
                    >
                        Login
                    </button>
                </div>

                <div>
                    <h2 className='text-black'>Don't Have an account <Link className='font-bold text-[#2D31FA] ' to={'/signup'}>Signup</Link></h2>
                </div>

            </div>
        </div>
    );
}

export default Login;