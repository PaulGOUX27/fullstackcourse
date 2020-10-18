import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from "./components/LoginForm";
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from "./components/NewBlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [type, setType] = useState('success')
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')

  const SUCCESS_NOTIF = 'success'
  const ERROR_NOTIF = 'error'

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

  const handleNewBlog = async (event) => {
    event.preventDefault();
    try {
      const blog = { title, author, url}
      await blogService.create(blog)
      setSuccessMessage('New blog add')
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
    setType(SUCCESS_NOTIF);
    setMessage(msg);
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const setErrorMessage = (msg) => {
    setType(ERROR_NOTIF);
    setMessage(msg);
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
        <NewBlogForm author={author}
                     handleNewLogin={handleNewBlog}
                     setAuthor={setAuthor}
                     setTitle={setTitle}
                     setUrl={setUrl}
                     title={title}
                     url={url}/>
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
