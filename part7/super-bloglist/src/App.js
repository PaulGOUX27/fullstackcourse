import React, { useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Toggleable from './components/Toggleable'
import { useDispatch, useSelector } from 'react-redux'
import { errorNotification, successNotification } from './reducers/notificationReducer'
import { createBlog, getAllBlog } from './reducers/blogReducer'
import BlogList from './components/BlogList'
import { loginFromLocalStorage, logout } from './reducers/userReducer'

const App = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const blogFormRef = useRef()

    useEffect(() => {
        dispatch(loginFromLocalStorage())
        dispatch(getAllBlog())
    }, [dispatch])

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
        dispatch(logout())
    }

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
            <Notification/>
            {!user ? <LoginForm/> : loggedInView()}
        </div>
    )
}

export default App
