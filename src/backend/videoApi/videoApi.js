import axios from 'axios'

const videoApiUrl = 'http://localhost:8000/api/v1/videos';


const uplodVdieo = async({title,videoFile,userId})=> {
    try {
        console.log('video file',videoFile)
        const formData = new FormData()
        formData.append('title',title)
        formData.append('videoFile',videoFile)
        const token = localStorage.getItem('accessToken');
        const response = await axios.post(`${videoApiUrl}/uplod-video`,formData,{
            params:{userId},
            withCredentials:true,
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        console.log('uplod video erro' , error)
    }
}

const getUserVideo = async (userId) => {
    try {
        const token = localStorage.getItem('accessToken')
       
        return await axios.get(`${videoApiUrl}/getUserAll-video`,{
            params: { userId },
            withCredentials:true,
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
    } catch (error) {
        console.log("getUserVideo error : " , error)
    }
}

const editeVideo = async ({id,title}) => {
  console.log('title is ' , title)
     try {
        // const formData = new FormData()
        // formData.append('title',title)
        
        const token = localStorage.getItem('accessToken')

        return await axios.post(`${videoApiUrl}/update-video`,{title},{
            params:{id},
            withCredentials:true,
            headers:{
                   Authorization:`Bearer ${token}`
            }
        })
     } catch (error) {
        console.log('edite error' , error)
     }
}

const deleteVideo = async({videoId}) => {
    try {
        console.log('video id',videoId)
        const token = localStorage.getItem('accessToken')
        return await axios.delete(`${videoApiUrl}/delete-video`,{
            params:{videoId},
            withCredentials:true,
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log('delete video error : ' , error)
    }
}
const getMixFeed = async(userId) => {
    try {
        console.log('user id',userId)
        const token = localStorage.getItem('accessToken')
        return await axios.get(`${videoApiUrl}/video-feed`,{
            params: {
                page: 1,
                limit: 10,
                userId: userId 
            },
            withCredentials:true,
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log('getMixFeed Error : ' , error)
    }
}

const updateVideoView = async({videoId,userId}) => {
    try {
        // console.log('user id',userId)
        const token = localStorage.getItem('accessToken')
        return await axios.post(`${videoApiUrl}/update-video-view`,{videoId,userId},{
            withCredentials:true,
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log('update video view Error : ' , error)
    }
}

const videoComment = async({videoId,userId,content}) => {
    try {
        // console.log('user id',userId)
        const token = localStorage.getItem('accessToken')
        return await axios.post(`${videoApiUrl}/video-comment`,{videoId,userId,content},{
            withCredentials:true,
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log('video comment Error : ' , error)
    }
}

const getAllVideoComments = async(videoId) => {
    try {
        // console.log('user id',userId)
        const token = localStorage.getItem('accessToken')
        return await axios.post(`${videoApiUrl}/get-all-vide-comments`,{videoId},{
            withCredentials:true,
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log('get all video comments Error : ' , error)
    }
}

const searchUserVideo = async(title) => {
    try {
        // console.log('user id',userId)
        const token = localStorage.getItem('accessToken')
        return await axios.post(`${videoApiUrl}/user-video-search`,{title},{
            withCredentials:true,
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log('user video search api Error : ' , error)
    }
}

const getVideo = async(videoId) => {
    console.log(videoId)
    try {
        const token = localStorage.getItem('accessToken')
        return await axios.post(`${videoApiUrl}/get-video`,{videoId},{
            withCredentials:true,
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log('get video api error',error)
    }
}

const deleteUserAllVideo = async(userId) => {
    try {
        // console.log('video id',videoId)
        const token = localStorage.getItem('accessToken')
        return await axios.delete(`${videoApiUrl}/delete-all-user-Video/${userId}`,{
        
            withCredentials:true,
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log('delete user all video error : ' , error)
    }
}
export{
    uplodVdieo,
    getUserVideo,
    editeVideo,
    deleteVideo,
    getMixFeed,
    updateVideoView,
    videoComment,
    searchUserVideo,
    getAllVideoComments,
    getVideo,
    deleteUserAllVideo
};