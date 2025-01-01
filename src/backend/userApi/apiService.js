import axios from 'axios'

const user_api_url = 'http://localhost:8000/api/v1/users';

const registerUser = async ({ FulName, email, password, userName }) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('FulName', FulName);
    formData.append('userName', userName);
       
    try {
     
        const response = await axios.post(`${user_api_url}/register`, formData);
        // Access the access token from the response's message
        const { message: accessToken } = response.data;
  
        if (accessToken) {
            // Store the access token in localStorage
            localStorage.setItem('accessToken', accessToken);
       
        } else {
            console.log('Access token is undefined');
        }

        console.log('register user', response);
        return response.data.data;  // Returning user data (without access token)
    } catch (error) {
        console.log('register user error', error);
    }
};


const loginUser = async (data) => {
    try {
        // console.log('data' , data)
      
        const response = await axios.post(`${user_api_url}/login` , data)
        // console.log('tokens',response)
        const { accessToken, refreshToken } = response.data.data;
 
        if (accessToken && refreshToken) {
           
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            // Store the new tokens in localStorage
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
         
            // console.log('Tokens stored successfully'); 
        } else {
            console.log('Access token or refresh token is undefined');
        }
        console.log('login response',response)
        return response.data.data
    } catch (error) {
        console.log('login user error' , error)
    }
}

const getCurrentUser = async () => {
  try {
     const token = localStorage.getItem('accessToken');
    //  console.log('token',token)
     if (!token) {
        console.log('token not found');
        return null;
      }
      const response = await axios.get(`${user_api_url}/current-user` , {
        headers: {
            Authorization: `Bearer ${token}` 
        }
      })
      console.log('response getcurrent-user' , response);
      return response.data
  } catch (error) {
    console.log('get current user:' , error.message || 'get current-user fatched faild')
  }
    return null
}

const logOutUser = async () => {
    try {
        const token = localStorage.getItem('accessToken');
        localStorage.removeItem('accessToken');
        const logOut = await axios.post(`${user_api_url}/logout`, {}, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        console.log("Log out Successfully");
        return logOut;
    } catch (error) {
        console.log('logOutUser error:', error);
    }
    return null;
};


// edtite profail api

const updateAccount = async ({email,userName,FulName}) => {
    try {
        const token = localStorage.getItem('accessToken')
        console.log('account detels' , email,userName,FulName)
        const response = await axios.post(`${user_api_url}/update-account`,{FulName,userName,email} , {
            withCredentials:true,
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
        );
        return response
    } catch (error) {
        console.log('account tetels arror' , error)
    }
} 

const changeCoverImg = async(file) => {
    const formData = new FormData();
    formData.append('coverImg', file);
    try {
        const token = localStorage.getItem('accessToken');
        if(!token){
            console.log('coverImg Token',token)
        }
        const response = await axios.post(`${user_api_url}/coverImg`,formData,{
            withCredentials:true,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
              },
        })
        return response
    } catch (error) {
        console.log('change cover img error :', error)
    }
}

const changeAvatarImg = async(file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    console.log(file)
    try {
        const token = localStorage.getItem('accessToken');
        if(!token){
            console.log('coverImg Token',token)
        }
        const response = await axios.post(`${user_api_url}/avatar`,formData,{
            withCredentials:true,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`, 
              },
        })
        return response
    } catch (error) {
        console.log('change avatar img error :', error)
    }
}

const changePassword = async({oldPassword,newPassword}) => {
    try {
        console.log('oldPassword',oldPassword)
        console.log('newPassword',newPassword)
        const token = localStorage.getItem('accessToken')

       const response = await axios.post(`${user_api_url}/changed-Password`,{oldPassword,newPassword},{
        withCredentials:true,
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
       return response;
    } catch (error) {
        console.log('change password error :' , error)
    }
}

const deleteAccoutn = async() => {
    try {
        const token = localStorage.getItem('accessToken')
        console.log('delete account token ' , token)
      return  await axios.get(`${user_api_url}/delete-account`,{
        withCredentials:true,
        headers:{
            Authorization:`Bearer ${token}`
        }
        })
    } catch (error) {
        console.log('delete account error : ' , error)
    }
}

const getUserProfail = async({id,loggedInUserId}) => {
    console.log('id',id)
    try {
        const token = localStorage.getItem('accessToken')
        return await axios.post(`${user_api_url}/get-user-profail`,{id,loggedInUserId},
          {
            withCredentials:true,
            headers:{
                Authorization:`Bearer ${token}`
            }
          }    
        )
    } catch (error) {
        console.log('get user prfail api error : ' , error)
    }
}
const userFollow = async({followerId,followingId}) => {
    const formData = new FormData();
    formData.append('followerId',followerId)
    formData.append('followingId',followingId)
    console.log('folowersID',followerId)
    console.log('followingID',followingId)
    try {
        const token = localStorage.getItem('accessToken')
        const response = await axios.post(`${user_api_url}/user-follow`,{followerId,followingId},
          {
            withCredentials:true,
            headers:{
                Authorization:`Bearer ${token}`
            }
          }    
        )
        console.log('follower response',response)
    return response
    } catch (error) {
        console.log(' user follow api error : ' , error)
    }
}

const userSearch = async(searchResult) => {
    try {
        const token = localStorage.getItem('accessToken')
        return await axios.post(`${user_api_url}/user-search`,{searchResult},
          {
            withCredentials:true,
            headers:{
                Authorization:`Bearer ${token}`
            }
          }    
        )
    } catch (error) {
        console.log('user search api error : ' , error)
    }
}

export {
    registerUser,
    loginUser,
    getCurrentUser,
    logOutUser,
    updateAccount,
    changeCoverImg,
    changeAvatarImg,
    changePassword,
    deleteAccoutn,
    getUserProfail,
    userFollow,
    userSearch
}