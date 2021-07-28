import { Layer, Stage } from "react-konva";
import ControllableTankModel from "../../models/ControllableTankModel";
import ControllableTank from "../tank/ControllableTank";
import Bullet from "../bullet/Bullet";
import React, { useEffect, useReducer, useRef } from "react";
import BulletModel from "../../models/BulletModel";
import Action, { ActionType } from "../../models/ActionType";
import Konva from "konva";
import Position from "../../models/Position";
import Direction from "../../models/Direction";
import TankModel from "../../models/TankModel";
import UserInfoModel from "../../models/UserInfoModel";

interface gameProps {
  userState: UserInfoModel | null;
}

interface PositionStateType {
  tankModels: TankModel[];
  bulletModels: BulletModel[];
}

const Game = (props: gameProps) => {
  const stageRef = useRef<Konva.Stage>(null);

  const initPosition: PositionStateType = { tankModels: [], bulletModels: [] };
  const initPositionFunc: (stage: Konva.Stage) => PositionStateType = (
    stage
  ) => {
    const greenTank = new ControllableTankModel(
      new Position(50, 50),
      2,
      Direction.NONE,
      4,
      "w",
      "s",
      "a",
      "d",
      "x",
      stage,
      100,
      100,
      "green"
    );
    const yellowTank = new ControllableTankModel(
      new Position(1630, 865),
      2,
      Direction.NONE,
      4,
      "i",
      "k",
      "j",
      "l",
      ".",
      stage,
      100,
      100,
      "blue"
    );

    const tanks = [greenTank, yellowTank];
    return { tankModels: tanks, bulletModels: [] };
  };

  const updatePosition: (
    prevPositions: PositionStateType,
    action: Action
  ) => PositionStateType = (prevPositions, action) => {
    if (action.type === ActionType.POSITION_UPDATED) {
      const tankModels = prevPositions.tankModels
        .filter((tank) =>
          tank.survive(
            prevPositions.bulletModels.filter((bullet) => bullet.tank !== tank)
          )
        )
        .map((tank) => {
          tank.updatePosition();
          return tank;
        });

      const bulletModels = prevPositions.bulletModels
        .filter((bullet) =>
          bullet.survive([
            ...prevPositions.bulletModels.filter(
              (otherBullet) => otherBullet.tank !== bullet.tank
            ),
            ...prevPositions.tankModels.filter((tank) => tank !== bullet.tank),
          ])
        )
        .map((bullet) => {
          bullet.updatePosition();
          return bullet;
        });

      return { tankModels: tankModels, bulletModels: bulletModels };
    }

    if (action.type === ActionType.INITIALIZED) {
      return initPositionFunc(stageRef.current!);
    }

    if (action.type === ActionType.BULLET_FIRED) {
      return {
        tankModels: prevPositions.tankModels,
        bulletModels: [
          ...prevPositions.bulletModels,
          action.payload as BulletModel,
        ],
      };
    }

    return prevPositions;
  };

  const [positionState, positionDispatcher] = useReducer(
    updatePosition,
    initPosition
  );

  const fireHandler = (bullet: BulletModel) => {
    positionDispatcher({ type: ActionType.BULLET_FIRED, payload: bullet });
  };

  useEffect(() => {
    positionDispatcher({ type: ActionType.INITIALIZED });

    const interval = setInterval(() => {
      positionDispatcher({ type: ActionType.POSITION_UPDATED });
    }, 30);
    return () => {
      clearInterval(interval);
    };
  }, [props.userState]);

  return (
    <Stage
      height={window.innerHeight}
      width={window.innerWidth}
      tabIndex={0}
      ref={stageRef}
    >
      <Layer>
        {positionState.tankModels.map((tank, index) => {
          if (tank instanceof ControllableTankModel) {
            return (
              <ControllableTank
                controllableTank={tank}
                onFire={fireHandler}
                key={index}
                username={props.userState ? props.userState.username : null}
              />
            );
          }
          return null;
        })}
        {positionState.bulletModels.map((bullet, index) => {
          return <Bullet bulletModel={bullet} key={index} />;
        })}
      </Layer>
    </Stage>
  );
};

export default Game;
