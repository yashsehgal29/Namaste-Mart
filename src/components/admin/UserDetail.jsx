import { useContext } from "react";
import MyContext from "../../context/MyContext";


const UserDetail = () => {
    const context = useContext(MyContext);
    const { getAllUser } = context;
    return (
        <div>
            <div>
                <div className="flex items-center justify-between py-5">
                    {/* text  */}
                    <h1 className="text-xl font-bold ">All User</h1>
                </div>

                {/* table  */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border border-collapse border-blue-200 sm:border-separate" >
                        <tbody>
                            <tr>
                                <th scope="col"
                                    className="h-12 px-6 font-bold border-l border-blue-200 text-md first:border-l-0 text-slate-700 bg-slate-100 fontPara">
                                    S.No.
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 font-bold border-l border-blue-200 text-md first:border-l-0 text-slate-700 bg-slate-100 fontPara">
                                    Name
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 font-bold border-l border-blue-200 text-md first:border-l-0 text-slate-700 bg-slate-100 fontPara">
                                    Email
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 font-bold border-l border-blue-200 text-md first:border-l-0 text-slate-700 bg-slate-100 fontPara">
                                    Uid
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 font-bold border-l border-blue-200 text-md first:border-l-0 text-slate-700 bg-slate-100 fontPara">
                                   Role
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 font-bold border-l border-blue-200 text-md first:border-l-0 text-slate-700 bg-slate-100 fontPara">
                                    Date
                                </th>

                            </tr>
                            {
                                getAllUser.map((value, index) => {
                                    return (
                                        <tr key={index} className="">
                                            <td
                                                className="h-12 px-6 transition duration-300 border-t border-l border-blue-200 text-md first:border-l-0 stroke-slate-500 text-slate-500 ">
                                                {index + 1}
                                            </td>

                                            <td
                                                className="h-12 px-6 transition duration-300 border-t border-l border-blue-200 text-md first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                {value.name}
                                            </td>

                                            <td className="h-12 px-6 transition duration-300 border-t border-l border-blue-200 cursor-pointer text-md first:border-l-0 stroke-slate-500 text-slate-500 ">
                                                {value.email}
                                            </td>

                                            <td className="h-12 px-6 transition duration-300 border-t border-l border-blue-200 cursor-pointer text-md first:border-l-0 stroke-slate-500 text-slate-500 ">
                                                {value.uid}
                                            </td>

                                            <td className="h-12 px-6 transition duration-300 border-t border-l border-blue-200 cursor-pointer text-md first:border-l-0 stroke-slate-500 text-slate-500 ">
                                                {value.role}
                                            </td>

                                            <td className="h-12 px-6 transition duration-300 border-t border-l border-blue-200 cursor-pointer text-md first:border-l-0 stroke-slate-500 text-slate-500 ">
                                                {value.date}
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserDetail;