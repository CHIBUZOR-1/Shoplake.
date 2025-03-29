import { useState, useEffect } from "react";
import { usePass } from "../../Context/lakeContext";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";

const UserRoute = () => {
    const [ok, setOk] = useState(false);
    const {pass} = usePass();

    useEffect(() => {
        const passCheck = async () => {
            const response = await axios.get('/api/user/user-pass');
            
            if(response.data.ok) {
                setOk(true);
            } else {
                setOk(false);
            }
        }
        if(pass?.token) passCheck();
    }, [pass?.token])

    return ok? <Outlet/> : <Loader />

}

export default UserRoute;