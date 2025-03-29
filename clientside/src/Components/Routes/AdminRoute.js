import React from 'react'
import { useState, useEffect } from "react";
import { usePass } from "../../Context/lakeContext";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";

const AdminRoute = () => {
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(true);
    const { pass } = usePass();

    useEffect(() => {
        const passCheck = async () => {
            try {
                const { data } = await axios.get('/api/user/admin-pass');
                setOk(data.ok);
            } catch (error) {
                setOk(false);
            } finally {
                setLoading(false); // Set loading to false after check
            }
        }
        if(pass?.token) passCheck();
    }, [pass?.token])

    if (loading) return <Loader />;
    return ok && <Outlet/> 
}

export default AdminRoute