import axios from "axios";

const message_api_url = 'http://localhost:8000/api/v1/message';

const searchUser= async(FulName) => {
    try {
        const token = localStorage.getItem('accessToken');
        console.log('token',token)
        return await axios.post(`${message_api_url}/search-user`,{FulName},{
            withCredentials:true,
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
    } catch (error) {
        console.log('search user api Error : ' , error)
    }
}

const SelectedUserForChat= async({partcipantUserID,createConversationID}) => {
    try {
        const token = localStorage.getItem('accessToken');
        console.log('token',token)
        return await axios.post(`${message_api_url}/select-user-for-chat`,{partcipantUserID,createConversationID},{
            withCredentials:true,
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
    } catch (error) {
        console.log('selected user fro chat api Error : ' , error)
    }
}

const sendMessage= async({content,chatId,sendId,createId}) => {
    try {
        const token = localStorage.getItem('accessToken');
        console.log('token',token)
        return await axios.post(`${message_api_url}/send-message`,{content,chatId,sendId,createId},{
            withCredentials:true,
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
    } catch (error) {
        console.log('send message api Error : ' , error)
    }
}

const getAllUserMessageProfail= async(userID) => {
    try {
        const token = localStorage.getItem('accessToken');
        console.log('token',token)
        return await axios.post(`${message_api_url}/get-all-user-message-profail`,{userID},{
            withCredentials:true,
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
    } catch (error) {
        console.log('get all message user profail error : ' , error)
    }
}

const getAllMessage = async(chatId) => {
    try {
        const token = localStorage.getItem('accessToken');
        return await axios.post(`${message_api_url}/get-all-message`,{chatId},{
            withCredentials:true,
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
    } catch (error) {
        console.log('get all message api error',error)
    }
}

export {searchUser,SelectedUserForChat,sendMessage,getAllUserMessageProfail,getAllMessage};