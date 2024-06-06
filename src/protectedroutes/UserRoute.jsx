/* eslint-disable react/prop-types */
import { Navigate } from "react-router"

export const UserRoute = ({children}) => {
    const user = JSON.parse(localStorage.getItem('users'))
    if (user?.role === "user") {
      return children
    }
    else {
      return <Navigate to={'/login'}/>
    }
}
