import React, { useEffect, useRef, useState } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import Toggleable from './components/Toggleable'
import { useDispatch } from 'react-redux'
import { errorNotification, successNotification } from './reducers/notificationReducer'
import { createBlog, getAllBlog } from './reducers/blogReducer'
import BlogList from './components/BlogList'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const dispatch = useDispatch()

    const blogFormRef = useRef()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('user')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            setUser(user)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem(
                'user', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            dispatch(errorNotification('Wrong credentials'))
        }
    }

    const handleNewBlog = async (blogObject) => {
        try {
            dispatch(createBlog(blogObject))
            dispatch(successNotification('New blog add'))
            blogFormRef.current.toggleVisibility()
        } catch (e) {
            dispatch(errorNotification('Error when creating a new blog :('))
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('user')
        blogService.setToken(null)
        setUser(null)
    }

    useEffect(() => {
        dispatch(getAllBlog())
    }, [dispatch])

    const loggedInView = () => (
        <div>
            <h2>blogs</h2>
            {user.name} is logged in
            <button onClick={handleLogout}>Logout</button>
            <Toggleable buttonLabel="New blog" ref={blogFormRef}>
                <NewBlogForm handleNewLogin={handleNewBlog}/>
            </Toggleable>
            <BlogList/>
        </div>
    )

    return (
        <div>
            <Notification />
            {
                !user ?
                    <LoginForm handleLogin={handleLogin} password={password} setPassword={setPassword}
                        setUsername={setUsername}
                        username={username}/>
                    : loggedInView()
            }
        </div>
    )
}

export default App
