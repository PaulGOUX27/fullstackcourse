import React from "react";
import {createAnecdote} from "../reducers/anecdoteReducer";
import {useDispatch} from "react-redux";

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.content.value
        event.target.content.value = ''
        dispatch(createAnecdote(content))
    }

    return (
        <form onSubmit={addAnecdote}>
            <div><input name="content"/></div>
            <button type="submit">create</button>
        </form>
    )
}

export default AnecdoteForm
