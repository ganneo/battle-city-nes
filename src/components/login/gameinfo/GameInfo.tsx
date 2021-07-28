import React from "react";
import GameInfoModel from "../../../models/GameInfoModel";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";

interface GameInfoProps {
  gameInfo: GameInfoModel;
  onJoin: (gameName: string) => void;
}

function GameInfo(props: GameInfoProps) {
  return (
    <Card style={{ width: "30%" }} className={"m-2"}>
      <Card.Body>
        <Card.Title>{props.gameInfo.gameName}</Card.Title>
        <Card.Text>
          Started at {props.gameInfo.startTime.toLocaleDateString("en-US")}{" "}
          {props.gameInfo.startTime.toLocaleTimeString("en-US")}
        </Card.Text>
        <Card.Text>Players: </Card.Text>
      </Card.Body>
      <ListGroup variant="flush">
        {props.gameInfo.players.map((player) => (
          <ListGroupItem key={player}>{player}</ListGroupItem>
        ))}
      </ListGroup>
      <Button
        variant={"primary"}
        onClick={() => props.onJoin(props.gameInfo.gameName)}
      >
        Join
      </Button>
    </Card>
  );
}

export default GameInfo;
