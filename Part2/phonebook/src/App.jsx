import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const handleInput = (e) => {
    setNewName(e.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newObj = { name: newName };
    setPersons(persons.concat(newObj));
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  );
};
const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person person={person} key={person.name} />
      ))}
    </div>
  );
};

const Person = ({ person }) => {
  return <p>{person.name}</p>;
};
export default App;
