/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../context/MyContext";
import { useContext, useState } from "react";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import toast from "react-hot-toast";
import {auth,firedb} from'../firebase/FirebaseConfig'
import Loader from '../components/Loader/Loader'
import { Timestamp,addDoc,collection } from "firebase/firestore";
const Signup = () => {
    const context=useContext(MyContext);
    const {loader,setloader}=context;
    const navigate=useNavigate()

    const [usersignup, setusersignup] = useState(
        {
            name:"",
            email:"",
            password: "",
            role:"user"
        }
    );
    const userSignupHandle=async()=>{
        if(usersignup.name===""|| usersignup.email==""|| usersignup.password==""){
            toast.error("All Fields are required");
        }
        setloader(true);
        try {
            const users=await createUserWithEmailAndPassword(auth,usersignup.email,usersignup.password);
            //creating user iobject
            const user={
                name:usersignup.name,
                email:usersignup.email,
                uid:users.user.uid,
                role:usersignup.role,
                time:Timestamp.now(),
                date: new Date().toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }
                )
            }
            //create user Reference/coellection
            const userreference=collection(firedb,'user');
            addDoc(userreference,user);

            //after adding the data set the input values to blanks
            setusersignup({
                name:"",
                email:"",
                password:"",
            })

            toast.success("Signup Succesfully!!");
            setloader(false);
            navigate('/login')
        } catch (error) {
            console.log(error)
            setloader(false)
        }
        
    }
    return (
        <div className='flex items-center justify-center h-screen bg-[#DFF6FF]'>
            {loader && <Loader/>}
            {/* Login Form  */}
            <div className="px-1 py-6 bg-[#DFF6FF] border shadow-xl border-blue-gray-100 login_Form lg:px-8 rounded-xl">

                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-2xl font-bold text-center '>
                        Signup
                    </h2>
                </div>

                {/* Input One  */}
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder='Full Name'
                        className='px-2 py-2 border placeholder-[#2659cf] shadow-md rounded-md outline-none  w-96'
                        onChange={(e)=>{
                            setusersignup({
                                ...usersignup,
                                name:e.target.value,
                            })
                        }}
                    />
                </div>

                {/* Input Two  */}
                <div className="mb-3" >
                    <input
                        type="email"
                        placeholder='Email Address'
                        className='px-2 py-2 placeholder-[#2659cf] shadow-md border-[#2962e7] rounded-md outline-none w-96'
                        onChange={(e)=>{
                            setusersignup({
                                ...usersignup,
                                email:e.target.value,
                            })
                        }}
                    />
                </div>

                {/* Input Three  */}
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        className='px-2 py-2 placeholder-[#2659cf] shadow-md border-[#2962e7] rounded-md outline-none w-96'
                        onChange={(e)=>{
                            setusersignup({
                                ...usersignup,
                                password:e.target.value,
                            })
                        }}
                    />
                </div>

                {/* Signup Button  */}
                <div className="mb-5">
                    <button
                        type='button'
                        onClick={userSignupHandle}
                        className='w-full py-2 font-bold text-center text-white bg-[#2D31FA] rounded-md shadow-md hover:bg-[#1c1eab] '
                    >
                        Signup
                    </button>
                </div>

                <div>
                    <h2 className='text-black'>Have an account <Link className='font-bold text-[#2D31FA] ' to={'/login'}>Login</Link></h2>
                </div>

            </div>
        </div>
    );
}

export default Signup;