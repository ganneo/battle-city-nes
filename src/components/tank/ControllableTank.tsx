import React, { useEffect } from "react";
import ControllableTankModel from "../../models/ControllableTankModel";
import Tank from "./Tank";
import Direction from "../../models/Direction";

interface ControllableTankProps {
  controllableTank: ControllableTankModel;
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
    const keyUpHandler = (event: KeyboardEvent) => {
      if (props.controllableTank.registeredMoveKeys.has(event.key)) {
        props.controllableTank.direction = Direction.NONE;
      }
    };
    container.addEventListener("keydown", keyDownHandler);
    container.addEventListener("keyup", keyUpHandler);

    return () => {
      container.removeEventListener("keydown", keyDownHandler);
      container.removeEventListener("keyup", keyUpHandler);
    };
  }, [props.controllableTank]);

  return <Tank tankModel={props.controllableTank} />;
}

export default ControllableTank;
