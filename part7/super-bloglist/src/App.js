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
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Blog from './components/Blog'

const App = () => {
    const user = useSelector(state => state.user)
    const blogs = useSelector(state => state.blogs)
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

    const match = useRouteMatch('/blogs/:id')
    const blog = match
        ? blogs.find(anecdote => anecdote.id === match.params.id)
        : null

    const loggedInView = () => {
        return (
            <div>
                <h2>blogs</h2>
                {user.name} is logged in
                <button onClick={handleLogout}>Logout</button>
                <Toggleable buttonLabel="New blog" ref={blogFormRef}>
                    <NewBlogForm handleNewLogin={handleNewBlog}/>
                </Toggleable>
                <Switch >
                    <Route path="/blogs/:id">
                        <Blog blog={blog}/>
                    </Route>
                    <Route path="/">
                        <BlogList/>
                    </Route>
                </Switch>
            </div>
        )}

    return (
        <div className="container">
            <Notification/>
            {!user ? <LoginForm/> : loggedInView()}
        </div>
    )
}

export default App
