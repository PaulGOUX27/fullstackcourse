import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, handleClick}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistic = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({good, neutral, bad}) => {

    const all = good + neutral + bad;

    if(all === 0) {
        return (
            <div>
                <h1>Statistics</h1>
                <div>
                    No feedback given
                </div>
            </div>
        )
    }

    return (
            <div>
                <h1>Statistics</h1>
                <table>
                    <tbody>
                        <Statistic text="Good" value ={good} />
                        <Statistic text="Neutral" value={neutral}/>
                        <Statistic text="Bad" value={bad}/>
                        <Statistic text="All" value={all}/>
                        <Statistic text="Average" value={(good - bad) / all}/>
                        <Statistic text="Positive" value={(good * 100 / all) + ' %'}/>
                    </tbody>
                </table>
            </div>
        )
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => setGood(good + 1);
    const handleNeutralClick = () => setNeutral(neutral + 1);
    const handleBadClick = () => setBad(bad + 1);

    return (
        <div>
            <h1>Give feedback</h1>
                <div>
                    <Button handleClick={handleGoodClick} text="Good"/>
                    <Button handleClick={handleNeutralClick} text="Neutral"/>
                    <Button handleClick={handleBadClick} text="Bad"/>
                </div>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root')
)