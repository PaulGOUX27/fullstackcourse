import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {voteFor} from "../reducers/anecdoteReducer";
import {notificationChange, removeNotification} from "../reducers/notificationReducer";


const Anecdote = ({anecdote, handleVote}) => {
    return (
        <>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote.id)}>vote</button>
            </div>
        </>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes.sort(function (a, b) {
        return b.votes - a.votes
    }))

    const vote = (id) => {
        dispatch(voteFor(id))
        dispatch(notificationChange('Vote successfully'))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }

    return (
        <>
            {anecdotes.map(anecdote =>
                <Anecdote key={anecdote.id}
                          anecdote={anecdote} handleVote={vote}/>
            )}
        </>
    )
}

export default AnecdoteList
