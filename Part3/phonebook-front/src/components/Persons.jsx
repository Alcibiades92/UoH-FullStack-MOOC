const Persons = ({ persons, inputFilter, clickDelete }) => {
  const DeletePerson = (person) => {
    if (window.confirm(`Want to delete ${person.name}?`)) {
      clickDelete(person.id);
    }
  };

  return (
    <div>
      {!inputFilter
        ? persons.map((person) => (
            <Person person={person} key={person.id} onClick={DeletePerson} />
          ))
        : persons
            .filter((person) =>
              person.name.toLowerCase().includes(inputFilter.toLowerCase())
            )
            .map((person) => (
              <Person person={person} key={person.id} onClick={DeletePerson} />
            ))}
    </div>
  );
};

const Person = ({ person, onClick }) => {
  return (
    <p>
      {person.name} {person.number}
      {"                "}
      <button onClick={() => onClick(person)}>delete</button>
    </p>
  );
};

export default Persons;
