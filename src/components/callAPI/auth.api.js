import axios from "axios"

export const handleRegister = async (userName, userEmail, userPassword) => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/auth/register", {
            userName: userName,
            userEmail: userEmail,
            userPassword: userPassword
        })
        // console.log("response :", response.data)
        // console.log(" token: ", response.data.createToken)
        const expirationTime = new Date().setDate(new Date().getDate() + 1)

        const tokenInfo = {
            token: response.data.token,
            expirationTime: expirationTime
        }
        // console.log("date :", new Date().getTime())
        localStorage.setItem("accessToken", JSON.stringify(tokenInfo))
        return {
            message: response.data.message,
            isRegisterSuccess: true
        }

    } catch (error) {
        console.error("Đã có lỗi :", error)
        return {
            message: error.response.data.message,
            isRegisterSuccess: false
        }
    }

}

export const handleLogin = async (userEmail, userPassword) => {

    try {
        const response = await axios.post("http://127.0.0.1:8000/api/auth/login", {
            userPassword: userPassword,
            userEmail: userEmail
        })
        // console.log(response.data)

        const expirationTime = new Date().setDate(new Date().getDate() + 1)

        const tokenInfo = {
            token: response.data.token,
            user: response.data.user,
            expirationTime: expirationTime
        }
        // console.log("date :", new Date().getTime())
        localStorage.setItem("accessToken", JSON.stringify(tokenInfo))
        return {
            message: response.data.message,
            isLoginSuccess: true
        }
    } catch (error) {
        console.error("Đã có lỗi :", error)

        // console.log(error.response.data.message)

        return {
            message: error.response.data.message,
            isLoginSuccess: false
        }
    }

}



export const handleForgotPassword = async (userEmail) => {
    try {
        const response = await axios.post("http://localhost:3001/auth/forgot-password", {
            userEmail: userEmail
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

export const handleResetPassword = async (email, token, newPassword) => {
    try {
        const response = await axios.post(`http://localhost:3001/auth/reset-password?email=${email}&token=${token}&newPassword=${newPassword}`)

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

export const handleGetPersonalInformation = async (token) => {

    if (token) {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/auth/user-infor", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return response.data.user

        } catch (error) {
            return {
                userInformation: error.response.data.message,
                isSuccess: false
            }
        }

    }

}

export const handleUpdateUserInformation = async (userPhoneNumber, userAddress, userEmail) => {
    try {
        axios.post('http://localhost:3001/auth/updateInformation', {
            userPhoneNumber: userPhoneNumber,
            userAddress: userAddress,
            userEmail: userEmail
        })
        console.log('updaded information successfully')
    } catch (error) {
        console.error('an error occurred while updating')
    }
}

export const handleUpdatePassword = async (email, oldPassword, newPassword) => {
    try {
        const token = JSON.parse(localStorage.getItem("accessToken")).token;

        const response = await axios.post('http://localhost:3001/auth/update-password', {
            email: email,
            oldPassword: oldPassword,
            newPassword: newPassword
        },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

        console.log('update successfully', response.data.isPassword)
        return response.data.isPassword
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const handleLogout = () => {
    localStorage.removeItem('userInFormation')
    localStorage.removeItem('accessToken')
}

export const handleLoginGoogle = () => {
    //handle login google with token in URL
    const url = new URL(window.location.href);
    const token = url.searchParams.get('token');
    if (token) {

        const expirationTime = new Date().setDate(new Date().getDate() + 1)

        const tokenInfo = {
            token: token,
            expirationTime: expirationTime
        }
        // console.log("date :", new Date().getTime())
        localStorage.setItem("accessToken", JSON.stringify(tokenInfo))
        //
    }
}

