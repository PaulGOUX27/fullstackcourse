import React from "react";
import {voteFor} from "../reducers/anecdoteReducer";
import {notificationChange} from "../reducers/notificationReducer";
import {connect} from "react-redux";


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

const AnecdoteList = (props) => {
    const vote = (anecdote) => {
        props.voteFor(anecdote)
        props.notificationChange(`you voted '${anecdote.content}'`, 10)
    }

    return (
        <>
            {props.anecdotes.map(anecdote =>
                <Anecdote key={anecdote.id}
                          anecdote={anecdote} handleVote={vote}/>
            )}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes.sort(function (a, b) {
            return b.votes - a.votes
        })
    }
}

const mapDispatchToProps = {
    voteFor,
    notificationChange
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList
