import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { UserContext } from "../../App";

export default function PrivateRoute({ children }) {
    const { userData } = useContext(UserContext);
    return userData ? children : <Navigate to="/auth/login/" />;
}


