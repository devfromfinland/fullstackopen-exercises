import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, handler}) => {
  return <button onClick={handler}>{text}</button>
}

const Statistic = ({text, value}) => {
  return <tr>
    <td>{text}</td>
    <td>{value} {text === 'positive' && '%'}</td>
  </tr>
}

const Statistics = ({good, bad, neutral}) => {
  const all = good + bad + neutral

  if (all === 0) return <>
    <h1>statistics</h1>
    <p>No feedback given</p>
  </>
  else return <>
    <h1>statistics</h1>
    <table>
      <tbody>
        <Statistic text='good' value={good}/>
        <Statistic text='neutral' value={neutral}/>
        <Statistic text='bad' value={bad}/>
        <Statistic text='all' value={all}/>
        <Statistic text='average' value={(good - bad) / all}/>
        <Statistic text='positive' value={good * 100 / all}/>
      </tbody>
    </table>
  </>

}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)

  const handleBad = () => setBad(bad + 1)

  const handleNeutral = () => setNeutral(neutral + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handler={handleGood} text='good'/>
      <Button handler={handleNeutral} text='neutral'/>
      <Button handler={handleBad} text='bad'/>

      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)