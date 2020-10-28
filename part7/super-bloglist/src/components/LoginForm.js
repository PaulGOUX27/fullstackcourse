import React, { useState } from 'react'
import { login } from '../reducers/userReducer'
import { errorNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { Button, Form } from 'react-bootstrap'

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
        <Form onSubmit={handleLogin} id="login-form">
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                    id="username"
                />
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                    id="password"
                />
                <Button variant="primary" type="submit" id="login-button">Login</Button>
            </Form.Group>
        </Form>
    )
}

export default LoginForm
