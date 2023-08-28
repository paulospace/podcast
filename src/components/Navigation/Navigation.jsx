import { useNavigate } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  const navigate = useNavigate();
  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      navigate(`/search?q=${e.target.value}`);
    }
  };
  return (
    <div className="Navigation">
      <div className="Navigation-Links"></div>
      <div className="Navigation-search">
        <input
          type="text"
          className="Navigation-search-input"
          onKeyPress={onKeyPress}
        />
      </div>
    </div>
  );
};

export default Navigation;
