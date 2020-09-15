import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, handleClick}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Anecdote = ({anecdotes, index, voteArray}) => {
    return (
        <div>
            <div>{anecdotes[index]}</div>
            <div>Has {voteArray[index]} vote{voteArray[index] > 1 ? 's' : ''}</div>
        </div>
    )
}

const App = ({anecdotes}) => {
    const [selected, setSelected] = useState(0);
    const [voteArray, setVoteArray] = useState(Array(anecdotes.length).fill(0));

    const handleRandomClick = () => {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        setSelected(Math.floor(Math.random() * Math.floor(anecdotes.length)));
    }

    const handleVoteClick = () => {
        const newVoteArray = [...voteArray];
        newVoteArray[selected]++;
        setVoteArray(newVoteArray);
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <Anecdote index={selected} voteArray={voteArray} anecdotes={anecdotes}/>
            <Button handleClick={handleVoteClick} text="Vote"/>
            <Button handleClick={handleRandomClick} text="Next anecdote"/>
            <h1>Anecdote with most votes</h1>
            <Anecdote index={voteArray.indexOf(Math.max(...voteArray))} voteArray={voteArray} anecdotes={anecdotes}/>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)