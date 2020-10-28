import React, { useState } from 'react'
import { login } from '../reducers/userReducer'
import { errorNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            dispatch(login(username, password))
            setUsername('')
            setPassword('')
        } catch (exception) {
            dispatch(errorNotification('Wrong credentials'))
        }
    }

    return (
        <form onSubmit={handleLogin} id="login-form">
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                    id="username"
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                    id="password"
                />
            </div>
            <button type="submit" id="login-button">login</button>
        </form>
    )
}

export default LoginForm
