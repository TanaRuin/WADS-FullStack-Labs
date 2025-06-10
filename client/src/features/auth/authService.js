import axios from 'axios'

const API_URL = '/service/user'

// signup user
const signup = async (userData) => {
    const response = await axios.post(API_URL + "/signup", userData)
    return response.data
}

// signin user
const signin = async (userData) => {
    const response = await axios.post(API_URL + "/signin", userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// activate email
const activateEmail = async (token) => {
    const response = await axios.post(API_URL + "/activation", { activation_token: token })
    return response.data
}

// get user info
const getUserInfo = async () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const response = await axios.get(API_URL + "/user-infor", {
        headers: {
            Authorization: `Bearer ${user?.token}`
        }
    })
    return response.data
}

const authService = {
    signup,
    signin,
    activateEmail,
    getUserInfo
}

export default authService

