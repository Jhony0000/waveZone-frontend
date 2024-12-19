import axios from 'axios'

const blogApiUrl = 'http://localhost:8000/api/v1/blog';


const uplodBlog = async({title,Image,content,userId})=> {
    try {
        const formData = new FormData()
        formData.append('title',title)
        formData.append('Image',Image)
        formData.append('content',content)
        formData.append('userId',userId)
     
        const token = localStorage.getItem('accessToken');
        const response = await axios.post(`${blogApiUrl}/uplod-blog`,formData,{
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

const getUserBlog = async (userId) => {
    try {
        const token = localStorage.getItem('accessToken')
       
        return await axios.get(`${blogApiUrl}/getUserAll-blog`,{
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

const editeBlog = async ({id,title}) => {
  console.log('title is ' , title)
     try {
        // const formData = new FormData()
        // formData.append('title',title)
        
        const token = localStorage.getItem('accessToken')

        return await axios.post(`${blogApiUrl}/update-blog`,{title},{
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

const deleteBlog = async(blogId) => {
    try {
        const token = localStorage.getItem('accessToken')
        console.log(token)
        return await axios.post(`${blogApiUrl}/delete-blog`,{blogId},{
            withCredentials:true,
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log('delete video error : ' , error)
    }
}
const getBlogMixFeed = async(userId) => {
    try {
        console.log('user id',userId)
        const token = localStorage.getItem('accessToken')
        return await axios.get(`${blogApiUrl}/blog-feed`,{
            params: {
                page: 1,
                limit: 10,
                userId: userId 
            },
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log('getBlogMixFeed Error : ' , error)
    }
}

const updateBlogView = async(blogId) => {
    console.log('blog id',blogId)
    try {
        const token = localStorage.getItem('accessToken')
        console.log(token)
        return await axios.post(`${blogApiUrl}/update-blog-view`,{blogId},{
            withCredentials:true,
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log('update blog view error : ' , error)
    }
}


const searchUserBlog = async(title) => {
    
    try {
        const token = localStorage.getItem('accessToken')
        console.log(token)
        return await axios.post(`${blogApiUrl}/search-user-blog`,{title},{
            withCredentials:true,
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log('update blog view error : ' , error)
    }
}
const getBlog = async(blogId) => {
    
    try {
        const token = localStorage.getItem('accessToken')
        console.log(token)
        return await axios.post(`${blogApiUrl}/get-blog`,{blogId},{
            withCredentials:true,
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log('get blog api error : ' , error)
    }
}
export{uplodBlog,getUserBlog,editeBlog,deleteBlog,getBlogMixFeed,updateBlogView,searchUserBlog,getBlog};