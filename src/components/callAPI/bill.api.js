import axios from "axios"


export const createBill = async (userEmail, userName, userPhoneNumber, userAddress,
    productId, quantityPurchased, datePurchase) => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/bill/create-bill", {
            userEmail: userEmail,
            userName: userName,
            userPhoneNumber: userPhoneNumber,
            userAddress: userAddress,
            productId: productId,
            quantityPurchased: quantityPurchased,
            DatePurchase: datePurchase
        })

        return {
            message: response.data.message,
            isSuccess: true
        }

    } catch (error) {
        return {
            message: error.response.data.message,
            isSuccess: false
        }
    }

}

export const handleGetBillUserByEmail = async (userEmail) => {
    try {
        const response = await axios.get(`http://localhost:3001/bill/getBillByUserEmail?userEmail=${userEmail}`);
        console.log("response: ", response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const handleSendBillConfirm = async (userEmail, userName, products) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/mail/confirm-Bill', {
            userEmail: userEmail,
            userName: userName,
            products: products

        })
        console.log(response.data);
        return response.data

    } catch (error) {
        console.error(error);
        throw error;
    }
}