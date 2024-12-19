import axios from "axios";

const notification_api_url = 'http://localhost:8000/api/v1/notification';

const getUserNotification = async(userId) => {
    try {
        const token = localStorage.getItem('accessToken');
        return await axios.post(`${notification_api_url}/get-user-notification`,{userId},{
            withCredentials:true,
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
    } catch (error) {
        console.log('get all message api error',error)
    }
}

const deleteNotification = async(notificationId) => {
    try {
        const token = localStorage.getItem('accessToken');
        return await axios.post(`${notification_api_url}/delete-notification`,{notificationId},{
            withCredentials:true,
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
    } catch (error) {
        console.log('notification api error',error)
    }
}
const readNotification = async(userId) => {
    try {
        const token = localStorage.getItem('accessToken');
        return await axios.post(`${notification_api_url}/readNotification`,{userId},{
            withCredentials:true,
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
    } catch (error) {
        console.log('readNotification api error',error)
    }
}
const nonReadNotification = async(userId) => {
    try {
        const token = localStorage.getItem('accessToken');
        return await axios.post(`${notification_api_url}/nonreadNotification`,{userId},{
            withCredentials:true,
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
    } catch (error) {
        console.log('non read notification api error',error)
    }
}

export {
    getUserNotification,
    deleteNotification,
    readNotification,
    nonReadNotification
};
