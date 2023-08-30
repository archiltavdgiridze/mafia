import { Route, Routes } from "react-router-dom";
import "./App.css";
import StartingPage from "./components/StartingPage/StartingPage";
import InputPlayerNames from "./components/Day/Settings/InputPlayerNames/InputPlayerNames";
import InputRoles from "./components/Day/Settings/InputRoles/InputRoles";
import SetLimits from "./components/Day/Settings/SetLimits/SetLimits";
import RoleShow from "./components/Day/RoleShow/RoleShow";
import TalkTime from "./components/Day/TalkTime/TalkTime";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StartingPage />} />
        <Route path="/input_player_names" element={<InputPlayerNames />} />
        <Route path="/input_player_roles" element={<InputRoles />} />
        <Route path="/set_limits" element={<SetLimits />} />
        <Route path="/role_show" element={<RoleShow />} />
        <Route path="/talk_time" element={<TalkTime />} />

      </Routes>
    </div>
  );
}

export default App;
