import { useState, useEffect } from "react";
import Persons from "./components/Persons.jsx";
import PersonForm from "./components/PersonForm.jsx";
// import axios from "axios";
import requests from "./services/requests.js";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [inputFilter, setInputFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
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
      const personUpdate = persons.find((person) => person.name === newName);
      const idPerson = personUpdate.id;

      const newPersonUpdate = { ...personUpdate, number: newNumber };

      if (
        window.confirm(
          `${newName} is already added to phonebook.Do you want to update the old number?`
        )
      ) {
        requests
          .update(idPerson, newPersonUpdate)
          .then((response) => {
            setPersons(persons.map((p) => (p.id === idPerson ? response : p)));
          })
          .catch((error) => {
            // console.log(error.response.data.error);
            setErrorMessage(`\n${error.response.data.error}`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
        return;
      }
    }

    requests
      .add(newObj)
      .then((person) => {
        setMessage(`Added ${person.name} on the catalogue.`);
        setPersons(persons.concat(person));
        setTimeout(() => {
          setNewName("");
          setNewNumber("");
          setMessage(null);
        }, 3999);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data);
        setErrorMessage(`${error.response.data.error}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 7000);
      });
  };

  // useEffect(hook, []);
  const hook = () => {
    requests.getAll().then((people) => {
      setPersons(people);
    });
  };
  useEffect(hook, []);

  const handleDelete = (id) => {
    // const toDelete = persons.filter((person) => person.id);

    requests.deletion(id);
    setPersons(persons.filter((person) => person.id !== id));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Error errorMessage={errorMessage} />
      <Notification message={message} />
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
      <Persons
        persons={persons}
        inputFilter={inputFilter}
        clickDelete={handleDelete}
      />
    </div>
  );
};
const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="message">{message}</div>;
};

const Error = ({ errorMessage }) => {
  if (errorMessage === null) {
    return null;
  }

  return <div className="error">{errorMessage}</div>;
};
export default App;
