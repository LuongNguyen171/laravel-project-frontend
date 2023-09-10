import axios from "axios"


export const createBill = async (userEmail, userName, userPhoneNumber, userAddress,
    productId, quantityPurchased, datePurchase) => {
    try {
        const response = await axios.post("http://localhost:3001/bill/createBill", {
            userEmail: userEmail,
            userName: userName,
            userPhoneNumber: userPhoneNumber,
            userAddress: userAddress,
            productId: productId,
            quantityPurchased: quantityPurchased,
            datePurchase: datePurchase
        })
        console.log(response.data)

        return {
            message: response.data.message,
            isSuccess: true
        }

    } catch (error) {
        console.error("Đã có lỗi :", error)
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

export const handleSendPorductOder = async (userEmail, userName) => {
    try {
        const response = await axios.post('http://localhost:3001/bill/product-order', {
            userEmail: userEmail,
            userName: userName

        })
        console.log(response.data);
        return response.data

    } catch (error) {
        console.error(error);
        throw error;
    }
}