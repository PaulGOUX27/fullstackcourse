import React from "react";
import {createAnecdote} from "../reducers/anecdoteReducer";
import {useDispatch} from "react-redux";
import {notificationChange} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.content.value
        event.target.content.value = ''
        dispatch(createAnecdote(content))
        dispatch(notificationChange(`new anecdote '${content}'`), 10)
    }

    return (
        <form onSubmit={addAnecdote}>
            <div><input name="content"/></div>
            <button type="submit">create</button>
        </form>
    )
}

export default AnecdoteForm
