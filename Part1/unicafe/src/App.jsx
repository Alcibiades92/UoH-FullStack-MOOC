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
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={(good / all) * 100} percent="%" />
    </div>
  );
};

const StatisticLine = ({ text, value, percent }) => {
  return (
    <p>
      {text} : {value} {percent}
    </p>
  );
};

export default App;
