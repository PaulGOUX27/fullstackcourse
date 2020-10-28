import React, { useEffect, useRef, useState } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import Toggleable from './components/Toggleable'
import { useDispatch } from 'react-redux'
import { errorNotification, successNotification } from './reducers/notificationReducer'

const App = () => {
    const [blogs, setBlogs] = useState([])
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
            await blogService.create(blogObject)
            dispatch(successNotification('New blog add'))
            blogFormRef.current.toggleVisibility()
            blogService.getAll().then(blogs =>
                setBlogs(blogs.sort(function (a, b) {
                    return b.likes - a.likes
                }))
            )
        } catch (e) {
            dispatch(errorNotification('Error when creating a new blog :('))
        }
    }

    const handleDeleteBlog = async (blog) => {
        await blogService.remove(blog)
        const newBlogs = blogs.filter((el) => el.id !== blog.id)
        setBlogs(newBlogs)
    }

    const handleLogout = () => {
        window.localStorage.removeItem('user')
        blogService.setToken(null)
        setUser(null)
    }

    const handleLike = async (blog) => {
        const newBlog = await blogService.update({ ...blog, likes: blog.likes + 1 })
        const newBlogs = [...blogs]
        newBlogs[blogs.findIndex((el) => el.id === blog.id)] = newBlog
        newBlogs.sort(function (a, b) {
            return b.likes - a.likes
        })
        setBlogs(newBlogs)
    }

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs.sort(function (a, b) {
                return b.likes - a.likes
            }))
        )
    }, [])

    const loggedInView = () => (
        <div>
            <h2>blogs</h2>
            {user.name} is logged in
            <button onClick={handleLogout}>Logout</button>
            <Toggleable buttonLabel="New note" ref={blogFormRef}>
                <NewBlogForm handleNewLogin={handleNewBlog}/>
            </Toggleable>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDeleteBlog={handleDeleteBlog}/>
            )}
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
