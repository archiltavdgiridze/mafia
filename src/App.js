import { Route, Routes } from "react-router-dom";
import "./App.css";
import StartingPage from "./components/StartingPage/StartingPage";
import InputPlayerNames from "./components/Day/Settings/InputPlayerNames/InputPlayerNames";
import InputRoles from "./components/Day/Settings/InputRoles/InputRoles";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StartingPage />} />
        <Route path="/input_player_names" element={<InputPlayerNames />} />
        <Route path="/input_player_roles" element={<InputRoles />} />
      </Routes>
    </div>
  );
}

export default App;
