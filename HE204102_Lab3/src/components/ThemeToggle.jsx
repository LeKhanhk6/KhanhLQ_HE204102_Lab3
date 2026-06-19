import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function ThemeToggle() {
  const { darkMode, toggleTheme } =
    useContext(ThemeContext);

  return (
    <button
      className="theme-btn"
      onClick={toggleTheme}
    >
      {darkMode
        ? "Light Mode"
        : "Dark Mode"}
    </button>
  );
}

export default ThemeToggle;