const Persons = ({ persons, inputFilter }) => {
  return (
    <div>
      {!inputFilter
        ? persons.map((person) => <Person person={person} key={person.name} />)
        : persons
            .filter((person) =>
              person.name.toLowerCase().includes(inputFilter.toLowerCase())
            )
            .map((person) => <Person person={person} key={person.name} />)}
    </div>
  );
};

const Person = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

export default Persons;
