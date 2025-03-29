import axios from "axios"

const cart = async() => {
    const bag = await axios.get('/api/cart/cart');
    return bag.data.data;
}

export default cart;