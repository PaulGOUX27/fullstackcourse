import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = {}, action) => {
    switch (action.type) {
    case 'LOGIN':
        return action.data
    case 'LOGOUT':
        return null
    default:
        return state
    }
}

export const login = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({
            username, password,
        })
        window.localStorage.setItem(
            'user', JSON.stringify(user)
        )
        blogService.setToken(user.token)
        dispatch({
            type: 'LOGIN',
            data: user
        })
    }
}

export const logout = () => {
    window.localStorage.removeItem('user')
    blogService.setToken(null)
    return {
        type: 'LOGOUT'
    }
}

export const loginFromLocalStorage = () => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        blogService.setToken(user.token)
        return {
            type: 'LOGIN',
            data: user
        }
    }
    return {
        type: '_'
    }
}


export default userReducer
