import axios from 'axios';

// const token = '1|reHqU7EFBimOyxFsufNEpOtUbDuFVu9FZSuq1Lr340eafd00';

export const getUsers = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/users');
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
