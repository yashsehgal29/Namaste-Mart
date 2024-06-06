/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import MyContext from './MyContext';
import { collection, onSnapshot, orderBy, query,deleteDoc,doc } from 'firebase/firestore';
import { firedb } from '../firebase/FirebaseConfig';
import toast from 'react-hot-toast';

function MyState({ children }) {
    // Loading State 
    const [loader, setloader] = useState(false);

    // User State
    const [getAllProduct, setGetAllProduct] = useState([]);

    const getAllProductFunction = async () => {
        setloader(true);
        try {
            const q = query(
                collection(firedb, "products"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllProduct(productArray);
                setloader(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setloader(false);
        }
    }
const [getAllOrder, setGetAllOrder] = useState([]);



    const getAllOrderFunction = async () => {
        setloader(true);
        try {
            const q = query(
                collection(firedb, "order"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let orderArray = [];
                QuerySnapshot.forEach((doc) => {
                    orderArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllOrder(orderArray);
                setloader(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setloader(false);
        }
    }
    const deleteProduct = async (id) => {
        setloader(true)
        try {
            await deleteDoc(doc(firedb, 'order', id))
            toast.success('Order Deleted successfully')
            getAllOrderFunction();
            setloader(false)
        } catch (error) {
            console.log(error)
            setloader(false)
        }
    }
    const [getAllUser, setGetAllUser] = useState([]);

    const getAllUserFunction = async () => {
        setloader(true);
        try {
            const q = query(
                collection(firedb, "user"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let userArray = [];
                QuerySnapshot.forEach((doc) => {
                    userArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllUser(userArray);
                setloader(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setloader(false);
        }
    }

    useEffect(() => {
        getAllProductFunction();
        getAllOrderFunction();
        getAllUserFunction();
    }, []);
    return (
        <MyContext.Provider value={{
            loader,
            setloader,
            getAllProduct,
            getAllProductFunction,
            getAllOrder,
            deleteProduct,
            getAllUser
        }}>
            {children}
        </MyContext.Provider>
    )
}

export default MyState