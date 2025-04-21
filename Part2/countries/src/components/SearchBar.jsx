function SearchBar({ abbr, onInputChange }) {
  return (
    <>
      <label htmlFor="search-bar">Find countries</label>
      <input id="search-bar" value={abbr} onChange={onInputChange} />
    </>
  );
}

export default SearchBar;
