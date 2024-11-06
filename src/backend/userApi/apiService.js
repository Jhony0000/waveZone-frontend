import axios from 'axios'

const user_api_url = 'http://localhost:8000/api/v1/users';


const registerUser = async ({email,password,FulName,userName,avatar,coverImg}) => {

    const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('FulName', FulName);
        formData.append('userName', userName);

        if (avatar?.[0]) {
            formData.append('avatar', avatar[0]);
        }

        if (coverImg) {
            formData.append('coverImg', coverImg[0]);
        }

    try {

      const response = await axios.post(`${user_api_url}/register` , formData , { withCredentials: true })
      return response.data;
    } catch (error) {
        console.log('regester user error' , error)
        throw error.response.data
    }
    
}

const loginUser = async (data) => {
    try {
        // console.log('data' , data)
        const response = await axios.post(`${user_api_url}/login` , data )
        const { accessToken, refereshToken } = response.data.data;

        if (accessToken && refereshToken) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refereshToken);
            console.log('Tokens stored successfully'); // এই লাইনটি যোগ করুন
        } else {
            console.log('Access token or refresh token is undefined');
        }
        return response.data.data
    } catch (error) {
        console.log('login user error' , error)
    }
}

const getCurrentUser = async () => {
  try {
     const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${user_api_url}/current-user` , {
        headers: {
            Authorization: `Bearer ${token}` // টোকেন যুক্ত করা
        }
      })
      console.log('response' , response);
      return response.data
  } catch (error) {
    console.log('get current user:' , error?.message || 'get current-user fatched faild')
  }
    return null
}

export {registerUser,loginUser,getCurrentUser}