import React, { useEffect } from "react";
import ControllableTankModel from "../../models/ControllableTankModel";
import Tank from "./Tank";
import Direction from "../../models/Direction";
import BulletModel from "../../models/BulletModel";
import Position from "../../models/Position";

interface ControllableTankProps {
  controllableTank: ControllableTankModel;
  onFire: (bullet: BulletModel) => void;
  username: string | null;
}

function ControllableTank(props: ControllableTankProps) {
  useEffect(() => {
    const container = props.controllableTank.stage.container();
    const keyDownHandler = (event: KeyboardEvent) => {
      switch (event.key) {
        case props.controllableTank.upKey:
          props.controllableTank.direction = Direction.UP;
          break;
        case props.controllableTank.downKey:
          props.controllableTank.direction = Direction.DOWN;
          break;
        case props.controllableTank.leftKey:
          props.controllableTank.direction = Direction.LEFT;
          break;
        case props.controllableTank.rightKey:
          props.controllableTank.direction = Direction.RIGHT;
          break;
        default:
          break;
      }
    };
    const keyPressHandler = (event: KeyboardEvent) => {
      if (props.controllableTank.shootKey === event.key) {
        props.onFire(
          new BulletModel(
            new Position(
              props.controllableTank.position.x,
              props.controllableTank.position.y
            ),
            props.controllableTank,
            props.controllableTank.fireDirection,
            8,
            10,
            10,
            props.controllableTank.color
          )
        );
      }
    };
    const keyUpHandler = (event: KeyboardEvent) => {
      if (props.controllableTank.registeredMoveKeys.has(event.key)) {
        props.controllableTank.direction = Direction.NONE;
      }
    };
    container.addEventListener("keydown", keyDownHandler);
    container.addEventListener("keyup", keyUpHandler);
    container.addEventListener("keypress", keyPressHandler);

    return () => {
      container.removeEventListener("keydown", keyDownHandler);
      container.removeEventListener("keyup", keyUpHandler);
      container.removeEventListener("keypress", keyPressHandler);
    };
  }, [props]);

  return (
    <React.Fragment>
      <Tank tankModel={props.controllableTank} username={props.username} />
    </React.Fragment>
  );
}

export default ControllableTank;
