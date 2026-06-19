import { useState } from "react";
import { ThemeContext } from "./context/ThemeContext";
import StudentManagement from "./pages/StudentManagement";
import './App.css'
function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{darkMode,toggleTheme}}
    >
      <StudentManagement />
    </ThemeContext.Provider>
  );
}

export default App;