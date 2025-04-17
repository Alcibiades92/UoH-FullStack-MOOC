export const PersonForm = ({
  handleSubmit,
  newName,
  handleInputName,
  newNumber,
  handleNumberInput,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleInputName} />
        <br />
        number: <input value={newNumber} onChange={handleNumberInput} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
