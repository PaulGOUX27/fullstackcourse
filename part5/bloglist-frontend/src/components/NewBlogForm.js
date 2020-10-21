import React, { useState } from 'react'

const NewBlogForm = ({ handleNewLogin }) => {
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    handleNewLogin({ title, author, url })
    setUrl('')
    setAuthor('')
    setTitle('')
  }

  return (
    <div>
      <form onSubmit={addNote}>
        <h2>Create new blog</h2>
        <div>
                    Title :
          <input type="text" value={title} onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
                    Author :
          <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
                    Url :
          <input type="text" value={url} onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlogForm
