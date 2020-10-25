import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {voteFor} from "../reducers/anecdoteReducer";


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
    const anecdotes = useSelector(state => state.sort(function(a, b) {return b.votes - a.votes}))

    const vote = (id) => {
        dispatch(voteFor(id))
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
