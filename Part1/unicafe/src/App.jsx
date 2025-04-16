import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const handleSetGood = () => {
    const updatedGood = good + 1;
    setGood(good + 1);
    setAll(updatedGood + neutral + bad);
  };
  const handleSetNeutral = () => {
    const updatedNeutral = neutral + 1;

    setNeutral(updatedNeutral);
    setAll(good + updatedNeutral + bad);
  };
  const handleSetBad = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    setAll(good + neutral + updatedBad);
  };

  return (
    <div>
      <Title text="Give feedback" />
      <Button onClick={handleSetGood} text="Good" />
      <Button onClick={handleSetNeutral} text="Neutral" />
      <Button onClick={handleSetBad} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Title = ({ text }) => {
  return <h1>{text}</h1>;
};

const Statistics = ({ good, neutral, bad, all }) => {
  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  if (all === 0) {
    return <p>No feedback given yet</p>;
  }
  return (
    <div>
      <p>good: {good}</p>
      <p>neutral :{neutral}</p>
      <p>bad :{bad}</p>
      <p>all : {all}</p>
      <p>average : {average}</p>
      <p>positive: {(good / all) * 100}%</p>
    </div>
  );
};
export default App;
