import api from './api.js';


const registerUser = async ({ businessName, email, password,file}) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('businessName', businessName);
    formData.append('avatar', file);
    
       
    try {
     
        const response = await api.post('/register', formData);
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
      
        const response = await api.post('/login' , data)
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
     console.log('token',token)
     if (!token) {
        console.log('token not found');
        return null;
      }
      const response = await api.get('/current-user' , {
        withCredentials:true,
        headers: {
            Authorization: `Bearer ${token}` 
        }
      })
      console.log('response getcurrent-user' , response);
      return response.data
  } catch (error) {
    console.log('get current user:' , error|| 'get current-user fatched faild')
  }
    return null
}

const logoutUser = async () => {
    try {
        const token = localStorage.getItem('accessToken');
        localStorage.removeItem('accessToken');
        const logOut = await api('/logout', {}, {
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

export {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser
}