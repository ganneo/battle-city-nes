import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import GameInfoModel from "../../models/GameInfoModel";
import GameInfo from "./gameinfo/GameInfo";
import { Button, Container, FormControl, InputGroup } from "react-bootstrap";
import { GAMES_ENDPOINT } from "../../utils/Constants";

interface LoginProps {
  onJoinGame: (username: string, gameName: string) => void;
}

function Login(props: LoginProps) {
  const [games, setGamesState] = useState<GameInfoModel[]>([]);
  const usernameRef = useRef<HTMLInputElement>(null);
  const gameNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInterval(async () => {
      const response = await axios.get(GAMES_ENDPOINT);
      const gameInfoModels = response.data.map((obj: any) =>
        GameInfoModel.parseJSON(obj)
      );
      setGamesState(gameInfoModels);
    }, 1000);
  }, []);

  return (
    <Container className="mt-2">
      <InputGroup className="mb-2">
        <InputGroup.Text>Username</InputGroup.Text>
        <FormControl
          placeholder={"Username must be provided"}
          ref={usernameRef}
        />
      </InputGroup>
      <div className={"d-flex justify-content-center flex-wrap"}>
        {games.map((gameInfo) => {
          return (
            <GameInfo
              gameInfo={gameInfo}
              onJoin={(gameName) => {
                props.onJoinGame(usernameRef.current!.value, gameName);
              }}
              key={gameInfo.gameName}
            />
          );
        })}
      </div>
      <InputGroup className={"mt-2 mb-2"}>
        <InputGroup.Text>Game Name</InputGroup.Text>
        <FormControl ref={gameNameRef} />
        <Button
          variant={"primary"}
          onClick={() => {
            props.onJoinGame(
              usernameRef.current!.value,
              gameNameRef.current!.value
            );
          }}
        >
          Create a New Game
        </Button>
      </InputGroup>
    </Container>
  );
}

export default Login;
