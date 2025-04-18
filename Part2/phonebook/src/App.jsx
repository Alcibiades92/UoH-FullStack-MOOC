import { useState, useEffect } from "react";
import Persons from "./components/Persons.jsx";
import PersonForm from "./components/PersonForm.jsx";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
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
  // useEffect(hook, []);
  const hook = () => {
    const promise = axios.get("http://localhost:3002/persons");
    promise.then((response) => {
      setPersons(response.data);
    });
  };
  useEffect(hook, []);

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
