import axios from 'axios';

export const getProducts = async () => {
    try {
        const response = await axios.get('http://localhost:3001/product/getProducts')
        return response.data;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const handleGetTop10SoldOut = async () => {
    try {
        const response = await axios.get('http://localhost:3001/product/top10ProductSoldOut');
        return response.data;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const handleGetTop10HighestPrice = async () => {
    try {
        const response = await axios.get('http://localhost:3001/product/top10HighestPrice')
        return response.data
    } catch (error) {
        console.log(error.message)
        throw error;
    }
}

export const handleGetAllProductImageById = async (productId) => {

    try {
        const response = await axios.get(`http://localhost:3001/product/getProductImageById/${productId}`)
        return response.data

    } catch (error) {
        console.log(error.message)
        throw error;
    }

}

export const handleGetProductById = async (productId) => {

    try {
        const response = await axios.get(`http://localhost:3001/product/getProductById/${productId}`)
        return response.data

    } catch (error) {
        console.log(error.message)
        throw error;
    }

}


export const handleGetProductByStyleId = async (styleId) => {

    try {
        const response = await axios.get(`http://localhost:3001/product/getProductByStyleId/${styleId}`)
        return response.data

    } catch (error) {
        console.log(error.message)
        throw error;
    }

}
