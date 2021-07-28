import React, { useState } from "react";
import "./App.css";
import Login from "./components/login/Login";
import UserInfoModel from "./models/UserInfoModel";
import axios from "axios";
import { GAME1_ENDPOINT } from "./utils/Constants";
import Game from "./components/game/Game";

function App() {
  const [userState, setUserState] = useState<UserInfoModel | null>(null);

  const joinGameHandler = async (username: string, gameName: string) => {
    setUserState(new UserInfoModel(username, gameName));

    const oldGame1 = await axios.get(GAME1_ENDPOINT);

    await axios.post(GAME1_ENDPOINT, {
      ...oldGame1.data,
      players: [...oldGame1.data.players, username],
    });
  };

  return (
    <div className="App">
      <div style={{ display: !userState ? "block" : "none" }}>
        <Login onJoinGame={joinGameHandler} />
      </div>
      <div style={{ display: !userState ? "none" : "block" }}>
        <Game userState={userState} />
      </div>
    </div>
  );
}

export default App;
