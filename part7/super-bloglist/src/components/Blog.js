import React  from 'react'
import { deleteBlog, voteBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Blog = ({ blog }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleDeleteBlog = async (blog) => {
        dispatch(deleteBlog(blog))
        history.push('/')
    }
    const handleLike = async (blog) => {
        dispatch(voteBlog(blog))
    }

    if(!blog) return (<div>Blog not found</div>)

    return (
        <div className="blog">
            <h2>{blog.title}</h2>
            <div>
                {blog.description}
            </div>
            <div>
                Like {blog.likes}
                <button onClick={() => {
                    handleLike(blog)
                }}>Like
                </button>
            </div>
            <div>
            added by{blog.author}
            </div>
            <div>
                <button onClick={() => {
                    handleDeleteBlog(blog)
                }}>Delete
                </button>
            </div>
        </div>
    )

}

export default Blog
