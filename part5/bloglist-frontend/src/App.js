import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import Toggleable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [type, setType] = useState('success')
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const SUCCESS_NOTIF = 'success'
  const ERROR_NOTIF = 'error'

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
      setErrorMessage('Wrong credentials')
    }
  }

  const handleNewBlog = async (blogObject) => {
    try {
      await blogService.create(blogObject)
      setSuccessMessage('New blog add')
      blogFormRef.current.toggleVisibility()
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    } catch (e) {
      setErrorMessage('Error when creating a new blog :(')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    blogService.setToken(null)
    setUser(null)
  }

  const setSuccessMessage = (msg) => {
    setType(SUCCESS_NOTIF)
    setMessage(msg)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const setErrorMessage = (msg) => {
    setType(ERROR_NOTIF)
    setMessage(msg)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const loggedInView = () => (
    <div>
      <h2>blogs</h2>
      { user.name } is logged in
      <button onClick={handleLogout}>Logout</button>
      <Toggleable buttonLabel="New note" ref={blogFormRef}>
        <NewBlogForm handleNewLogin={handleNewBlog} />
      </Toggleable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <Notification message={message} type={type}/>
      {
        !user ?
          <LoginForm handleLogin={handleLogin} password={password} setPassword={setPassword} setUsername={setUsername}
            username={username}/>
          : loggedInView()
      }
    </div>
  )
}

export default App
