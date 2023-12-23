import axios from 'axios';

const token = '99|t06jWvOWMg4aCoiW8y5Vbe309UcQwwC7riJt3DY4f4fe3bd1';

export const getProducts = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/products');
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const addProduct = async (data) => {
    return await axios.post(
        'http://127.0.0.1:8000/api/product/add-product',
        data,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        },
    );
};

export const updateProduct = async (data) => {
    return axios.put(
        `http://127.0.0.1:8000/api/product/update-product/${data.productId}`,
        data,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        },
    );
};

export const deleteProduct = async (id) => {
    return await axios.delete(
        `http://127.0.0.1:8000/api/product/delete-product/${id}`,
    );
};

export const handleGetTop10SoldOut = async () => {
    try {
        const response = await axios.get(
            'http://127.0.0.1:8000/api/top-products',
        );
        return response.data;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

export const handleGetTop10HighestPrice = async () => {
    try {
        const response = await axios.get(
            'http://127.0.0.1:8000/api/top-productsHighestPrice',
        );
        return response.data;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

export const handleGetAllProductImageById = async (productId) => {
    try {
        const response = await axios.get(
            `http://127.0.0.1:8000/api/product-image/${productId}`,
        );
        return response.data;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

export const handleGetProductById = async (productId) => {
    try {
        const response = await axios.get(
            `http://127.0.0.1:8000/api/product/${productId}`,
        );
        return response.data;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

export const handleGetProductByStyleId = async (styleId) => {
    try {
        const response = await axios.get(
            `http://127.0.0.1:8000/api/products-by-style/${styleId}`,
        );
        return response.data;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};
