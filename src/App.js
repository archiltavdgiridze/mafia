import { Route, Routes } from "react-router-dom";
import "./App.css";
import StartingPage from "./components/StartingPage/StartingPage";
import InputPlayerNames from "./components/Day/Settings/InputPlayerNames/InputPlayerNames";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StartingPage />} />
        <Route path="/input_player_names" element={<InputPlayerNames />} />
      </Routes>
    </div>
  );
}

export default App;
