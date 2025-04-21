export function DisplaySome({ countriesName, setAbbr }) {
  return (
    <div>
      {countriesName.map((name) => (
        <div key={name}>
          {name}
          <button onClick={() => setAbbr(name)}>More info</button>
        </div>
      ))}
    </div>
  );
}
