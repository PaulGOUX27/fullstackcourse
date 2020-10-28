import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

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
            <h2>Create new blog</h2>
            <Form onSubmit={addNote}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={title} onChange={({ target }) => setTitle(target.value)}
                        id="title"/>
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" value={author} onChange={({ target }) => setAuthor(target.value)}
                        id="author"/>
                    <Form.Label>Url</Form.Label>
                    <Form.Control type="text" value={url} onChange={({ target }) => setUrl(target.value)}
                        id="url"/>
                    <Button variant="primary" type="submit" id="add-note">Create</Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default NewBlogForm
