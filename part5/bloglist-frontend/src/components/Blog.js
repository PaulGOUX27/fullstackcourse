import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleDeleteBlog }) => {
  const [detail, setDetail] = useState(false)

  const handleChangeDetail = () => {
    setDetail(!detail)
  }

  if(!detail) {
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
      <button onClick={() => {handleLike(blog)}}>Like</button>
      <br/>
      {blog.author}
      <br/>
      <button onClick={() => {handleDeleteBlog(blog)}}>Delete</button>
    </div>
  )

}

export default Blog
