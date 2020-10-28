import React, { useState } from 'react'
import { deleteBlog, voteBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog }) => {
    const [detail, setDetail] = useState(false)
    const dispatch = useDispatch()

    const handleDeleteBlog = async (blog) => {
        dispatch(deleteBlog(blog))
    }
    const handleLike = async (blog) => {
        dispatch(voteBlog(blog))
    }

    const handleChangeDetail = () => {
        setDetail(!detail)
    }

    if (!detail) {
        return (<div className="blog">
            {blog.title} {blog.author}
            <button onClick={handleChangeDetail}>View</button>
        </div>)
    }

    return (
        <div className="blog">
            {blog.title}
            <button onClick={handleChangeDetail}>Hide</button>
            <br/>
            {blog.description}
            <br/>
            Like {blog.likes}
            <button onClick={() => {
                handleLike(blog)
            }}>Like
            </button>
            <br/>
            {blog.author}
            <br/>
            <button onClick={() => {
                handleDeleteBlog(blog)
            }}>Delete
            </button>
        </div>
    )

}

export default Blog
