import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Layer, Stage } from "react-konva";
import { clearInterval } from "timers";
import Position from "./models/Position";
import Appearance from "./models/Appearance";
import Direction from "./models/Direction";
import ControllableTank from "./components/tank/ControllableTank";
import ControllableTankModel from "./models/ControllableTankModel";
import Konva from "konva";

function App() {
  const stageRef = useRef<Konva.Stage>(null);

  const [tanksState, setTanksState] = useState<ControllableTankModel[] | null>(
    null
  );

  const update = () =>
    setTanksState((prevTanks) => {
      return prevTanks!.map((tank) => {
        switch (tank.direction) {
          case Direction.UP:
            tank.position.y = tank.position.y - tank.speed;
            break;
          case Direction.DOWN:
            tank.position.y = tank.position.y + tank.speed;
            break;
          case Direction.LEFT:
            tank.position.x = tank.position.x - tank.speed;
            break;
          case Direction.RIGHT:
            tank.position.x = tank.position.x + tank.speed;
            break;
          default:
            break;
        }

        return tank;
      });
    });

  useEffect(() => {
    const stage = stageRef.current!;
    const tank1 = new ControllableTankModel(
      new Position(100, 200),
      2,
      new Appearance("green"),
      Direction.NONE,
      4,
      "w",
      "s",
      "a",
      "d",
      stage
    );
    const tank2 = new ControllableTankModel(
      new Position(300, 200),
      2,
      new Appearance("yellow"),
      Direction.NONE,
      4,
      "8",
      "5",
      "4",
      "6",
      stage
    );

    const tanks = [tank1, tank2];
    setTanksState(tanks);

    const interval = setInterval(update, 10);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="App">
      <Stage
        height={window.innerHeight}
        width={window.innerWidth}
        tabIndex={0}
        ref={stageRef}
      >
        <Layer>
          {tanksState?.map((tank) => (
            <ControllableTank controllableTank={tank} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
