import axios from "axios"

const prodList = async () => {
    const {data} = await axios.get('/api/product/product_list');
    return data;
}
export const allList = async () => {
    const {data} = await axios.get('/api/product/all-prod');
    return data;
}

export default prodList;