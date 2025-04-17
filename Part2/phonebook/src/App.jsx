import { useState } from "react";
import Persons from "./components/Persons.jsx";
import PersonForm from "./components/PersonForm.jsx";

const App = () => {
  const initial = [
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ];
  const [persons, setPersons] = useState(initial);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [inputFilter, setInputFilter] = useState("");
  const handleInputFilter = (event) => {
    setInputFilter(event.target.value.toLowerCase());
    // const lower = inputFilter.toLowerCase();
  };
  const handleInputName = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newObj = { name: newName, number: newNumber };
    if (persons.some((person) => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat(newObj));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <span>Filter </span>
      <input value={inputFilter} onChange={handleInputFilter} />
      <PersonForm
        persons={persons}
        inputFilter={inputFilter}
        handleInputName={handleInputName}
        newNumber={newNumber}
        newName={newName}
        handleNumberInput={handleNumberInput}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} inputFilter={inputFilter} />
    </div>
  );
};

export default App;
