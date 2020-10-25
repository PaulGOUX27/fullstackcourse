import React from "react";
import {createAnecdote} from "../reducers/anecdoteReducer";
import {connect} from "react-redux";
import {notificationChange} from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.content.value
        event.target.content.value = ''
        props.createAnecdote(content)
        props.notificationChange(`new anecdote '${content}'`, 10)
    }

    return (
        <form onSubmit={addAnecdote}>
            <div><input name="content"/></div>
            <button type="submit">create</button>
        </form>
    )
}

const ConnectedAnecdoteForm = connect(null, {createAnecdote, notificationChange})(AnecdoteForm)
export default ConnectedAnecdoteForm
