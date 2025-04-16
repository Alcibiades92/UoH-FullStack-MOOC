import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const handleSetGood = () => {
    setGood(good + 1);
  };
  const handleSetNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleSetBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Title text="Give feedback" />
      <Button onClick={handleSetGood} text="Good" />
      <Button onClick={handleSetNeutral} text="Neutral" />
      <Button onClick={handleSetBad} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Title = ({ text }) => {
  return <h1>{text}</h1>;
};

const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      <p>good: {good}</p>
      <p>neutral :{neutral}</p>
      <p>bad :{bad}</p>
    </div>
  );
};
export default App;
