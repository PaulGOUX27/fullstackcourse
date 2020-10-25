import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {voteFor} from "../reducers/anecdoteReducer";
import {notificationChange} from "../reducers/notificationReducer";


const Anecdote = ({anecdote, handleVote}) => {
    return (
        <>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
        </>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes.sort(function (a, b) {
        return b.votes - a.votes
    }))

    const vote = (anecdote) => {
        dispatch(voteFor(anecdote))
        dispatch(notificationChange(`you voted '${anecdote.content}'`), 10)
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
