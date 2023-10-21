import "./SearchBar.css";
export const SearchBar = ({ onSearchSubmit }) => {
  const inputOnKeyPress = (e) => {
    if (e.key !== "Enter") return;

    onSearchSubmit(e.target.value);
  };
  return (
    <div className="SearchBar">
      <input
        type="text"
        onKeyPress={inputOnKeyPress}
        placeholder="Search for podcast title"
      />
    </div>
  );
};
