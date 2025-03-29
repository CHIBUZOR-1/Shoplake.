import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import { allList } from "../helpers/helper";
import cart from "../helpers/cart";

const LakeContext = createContext();


const LakeContextProvider = ({children}) => {
    const [CartItems, setCartItems] = useState({});
    const [list, setList] = useState([]);
    const [pass, setPass] = useState({
        user: null,
        token: null
    });

    
    axios.defaults.headers.common['Authorization'] = pass.token;

    useEffect(()=> {
        const loadData = async() => {
            const data = localStorage.getItem("pass");
            const pData = JSON.parse(data);
            if(data) {
                setPass({
                    ...pass,
                    user: pData.user,
                    token: pData.token
                });
                
            }
            await goods();
            
            
        }
        loadData();
        
        // eslint-disable-next-line
    }, []);

    useEffect(()=> {
        const handleCart = async () => {
            if (pass.token) {
                // User is logged in, fetch cart
                await cartz();
            } else {
                // User is logged out, clear cart
                setCartItems({});
            }
        };
        handleCart();
    }, [pass.token])

    const goods = async() => {
        const res = await allList();
        setList(res.contxtLst);
        
    }

    const cartz = async() => {
        const res = await cart();
        setCartItems(res);
        
    }

    const addToCart = async(itemId) => {
        if(!CartItems[itemId]) {
            setCartItems((prev) => ({...prev,[itemId]:1}));
        } else {
            setCartItems((prev) => ({...prev,[itemId]: prev[itemId]+1}));
        }
        if(pass.user) {
            await axios.post('/api/cart/add', {itemId});
        } else {
            return null;
        }
    }
     const removeFromCart = async(itemId) => {
        
        if(pass.user) {
            await axios.post('/api/cart/remove', {itemId});
            setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}));
        }
     }

     const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in CartItems) {
            if(CartItems[item] > 0) {
                let itemInfo = list.find(prod => prod._id === item.toString());
                totalAmount += itemInfo?.new_price * CartItems[item];
            } 
        }
        return totalAmount;
        
     }
     const getTotalCartItems = () => {
        let totalItem = 0;
        for(const item in CartItems) {
            if(CartItems[item] > 0) {
                totalItem += CartItems[item];
            }
        }
        return totalItem;
     }



    const contextValue = {
        CartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        pass,
        list,
        setPass,
        getTotalCartItems
    }
    return (
        <LakeContext.Provider value={contextValue}>
            {children}
        </LakeContext.Provider>
    );
}

const usePass = () => useContext(LakeContext);

export { usePass, LakeContextProvider };

