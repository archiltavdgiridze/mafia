import { createSlice } from "@reduxjs/toolkit";

// roleID reference (see RoleShow.jsx):
// 1 მოქალაქე (citizen)   2 დეტექტივი (cop)   3 ექიმი (doctor)
// 4 მაფიოზი (mafia)      5 დონი (don)        6 მანიაკი (maniac)
const MAFIA_ROLE_IDS = [4, 5];

const initialNight = {
  mafia: null,
  maniac: null,
  doctor: null,
  cop: null,
  don: null,
};

const initialState = {
  phase: "setup", // 'setup' | 'day' | 'night'
  round: 1,
  players: [],
  night: { ...initialNight },
  log: [], // one entry per resolved night: { round, deaths, copCheck, donCheck }
  winner: null, // null | 'mafia' | 'citizens'
  foulLimit: 3,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame: (state, action) => {
      state.players = action.payload.map((p) => ({
        ...p,
        isAlive: true,
        isCheckedByCop: false,
        isCheckedByDon: false,
        foulCount: 0,
        isDeadForever: false,
      }));
      state.phase = "day";
      state.round = 1;
      state.night = { ...initialNight };
      state.log = [];
      state.winner = null;
    },
    setNightTarget: (state, action) => {
      const { role, targetId } = action.payload;
      if (!(role in state.night)) return;
      state.night[role] = targetId;
    },
    goToNight: (state) => {
      state.phase = "night";
    },
    resolveNight: (state) => {
      const { mafia, maniac, doctor, cop, don } = state.night;

      // Count how many independent killers targeted each player this night.
      const hits = {};
      if (mafia != null) hits[mafia] = (hits[mafia] || []).concat("mafia");
      if (maniac != null) hits[maniac] = (hits[maniac] || []).concat("maniac");

      const deaths = [];
      Object.entries(hits).forEach(([targetId, sources]) => {
        const id = Number(targetId);
        // Doctor can only cancel a single kill attempt on their target;
        // two independent killers hitting the same player still kills them.
        const saved = sources.length === 1 && doctor === id;
        if (!saved) deaths.push(id);
      });

      deaths.forEach((id) => {
        const player = state.players.find((p) => p.id === id);
        if (player) player.isAlive = false;
      });

      let copCheck = null;
      if (cop != null) {
        const player = state.players.find((p) => p.id === cop);
        if (player) {
          player.isCheckedByCop = true;
          copCheck = { targetId: cop, name: player.name, roleName: player.roleName };
        }
      }

      let donCheck = null;
      if (don != null) {
        const player = state.players.find((p) => p.id === don);
        if (player) {
          player.isCheckedByDon = true;
          donCheck = { targetId: don, name: player.name, roleName: player.roleName };
        }
      }

      state.log.push({ round: state.round, deaths, copCheck, donCheck });

      const mafiaAlive = state.players.filter(
        (p) => p.isAlive && MAFIA_ROLE_IDS.includes(p.roleId)
      ).length;
      const othersAlive = state.players.filter(
        (p) => p.isAlive && !MAFIA_ROLE_IDS.includes(p.roleId)
      ).length;

      if (mafiaAlive === 0) {
        state.winner = "citizens";
      } else if (mafiaAlive >= othersAlive) {
        state.winner = "mafia";
      }

      state.night = { ...initialNight };
      state.phase = "summary";
    },
    goToDay: (state) => {
      state.round += 1;
      state.phase = "day";
    },
    setFoulLimit: (state, action) => {
      state.foulLimit = action.payload;
    },
    addFoul: (state, action) => {
      const player = state.players.find((p) => p.id === action.payload);
      if (!player) return;
      player.foulCount = Math.min(player.foulCount + 1, state.foulLimit);
      if (player.foulCount >= state.foulLimit) {
        player.isDeadForever = true;
        player.isAlive = false;
      }
    },
    subtractFoul: (state, action) => {
      const player = state.players.find((p) => p.id === action.payload);
      if (!player) return;
      player.foulCount = Math.max(player.foulCount - 1, 0);
      if (player.foulCount < state.foulLimit && player.isDeadForever) {
        player.isDeadForever = false;
        player.isAlive = true;
      }
    },
  },
});

export const {
  startGame,
  setNightTarget,
  goToNight,
  resolveNight,
  goToDay,
  setFoulLimit,
  addFoul,
  subtractFoul,
} = gameSlice.actions;

export default gameSlice.reducer;

// Selectors
export const selectPhase = (state) => state.game.phase;
export const selectPlayers = (state) => state.game.players;
export const selectAlivePlayers = (state) =>
  state.game.players.filter((p) => p.isAlive);
export const selectNight = (state) => state.game.night;
export const selectWinner = (state) => state.game.winner;
export const selectLastLogEntry = (state) =>
  state.game.log[state.game.log.length - 1] || null;
export const selectHasRole = (roleId) => (state) =>
  state.game.players.some((p) => p.roleId === roleId);
export const selectPlayerById = (id) => (state) =>
  state.game.players.find((p) => p.id === id);
export const selectFoulLimit = (state) => state.game.foulLimit;
export { MAFIA_ROLE_IDS };
