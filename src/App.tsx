import React, { useEffect, useReducer, useRef } from "react";
import "./App.css";
import { Layer, Stage } from "react-konva";
import Position from "./models/Position";
import Direction from "./models/Direction";
import ControllableTank from "./components/tank/ControllableTank";
import ControllableTankModel from "./models/ControllableTankModel";
import Konva from "konva";
import BulletModel from "./models/BulletModel";
import Bullet from "./components/bullet/Bullet";
import TankModel from "./models/TankModel";
import Action from "./models/ActionType";
import { ActionType } from "./models/ActionType";

interface PositionStateType {
  tankModels: TankModel[];
  bulletModels: BulletModel[];
}

function App() {
  const stageRef = useRef<Konva.Stage>(null);

  const initPosition: PositionStateType = { tankModels: [], bulletModels: [] };
  const initPositionFunc: (stage: Konva.Stage) => PositionStateType = (
    stage
  ) => {
    const greenTank = new ControllableTankModel(
      new Position(0, 0),
      2,
      Direction.NONE,
      4,
      "w",
      "s",
      "a",
      "d",
      "l",
      stage,
      100,
      100,
      "green"
    );
    const yellowTank = new ControllableTankModel(
      new Position(800, 400),
      2,
      Direction.NONE,
      4,
      "8",
      "5",
      "4",
      "6",
      ".",
      stage,
      100,
      100,
      "black"
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

  useEffect(() => {
    positionDispatcher({ type: ActionType.INITIALIZED });

    const interval = setInterval(() => {
      positionDispatcher({ type: ActionType.POSITION_UPDATED });
    }, 30);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const fireHandler = (bullet: BulletModel) => {
    positionDispatcher({ type: ActionType.BULLET_FIRED, payload: bullet });
  };

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
