import { Route, Routes } from "react-router-dom";
import StartingPage from "./components/StartingPage/StartingPage";
import InputPlayerNames from "./components/Day/Settings/InputPlayerNames/InputPlayerNames";
import InputRoles from "./components/Day/Settings/InputRoles/InputRoles";
import SetLimits from "./components/Day/Settings/SetLimits/SetLimits";
import RoleShow from "./components/Day/RoleShow/RoleShow";
import TalkTime from "./components/Day/TalkTime/TalkTime";
import RoleQueue from "./components/Night/RoleQueue/RoleQueue";
import MafiaShoots from "./components/Night/MafiaShoots/MafiaShoots";
import ActionComp from "./reComps/ActionComp/ActionComp";
import DocSaves from "./components/Night/DocSaves/DocSaves";
import CopChecks from "./components/Night/CopChecks/CopChecks";
import KillerKills from "./components/Night/KillerKills/KillerKills";
import GameSessionStorage from "./reComps/GameSessionComp/GameSessionStorage";
import "./App.css";
import MafiaAction from "./reComps/MafiaAction/MafiaAction";
import DonChecks from "./components/Night/DonChecks/DonChecks";
import Summary from "./components/Night/Summary/Summary";

function App() {
  return (
    <div className="App" style={{ position: "relative" }}>
      <div className="day_theme">
        <Routes>
          <Route path="/" element={<StartingPage />} />
          <Route path="/input_player_names" element={<InputPlayerNames />} />
          <Route path="/input_player_roles" element={<InputRoles />} />
          <Route path="/set_limits" element={<SetLimits />} />
          <Route path="/role_show" element={<RoleShow />} />
          <Route path="/talk_time" element={<TalkTime />} />
          <Route path="/game-session" element={<GameSessionStorage />} />
          <Route path="/test" element={<MafiaAction />} />
        </Routes>
      </div>
      <div className="night_theme">
        <Routes>
          <Route path="/night/role_queue" element={<RoleQueue />} />
          <Route path="/night/mafia_shoots" element={<MafiaShoots />} />
          <Route path="/night/doc_saves" element={<DocSaves />} />
          <Route path="/night/cop_checks" element={<CopChecks />} />
          <Route path="/night/don_checks" element={<DonChecks />} />
          <Route path="/night/killer_kills" element={<KillerKills />} />
          <Route path="/night/summary" element={<Summary />} />
          <Route path="/action" element={<ActionComp />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
