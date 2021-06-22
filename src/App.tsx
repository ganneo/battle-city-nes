import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Layer, Circle, Stage } from "react-konva";
import Konva from "konva";
import { clearInterval } from "timers";

function App() {
  const MOVE_RATE = 4;
  const [xState, setXState] = useState(200);
  const [yState, setYState] = useState(300);
  const stageRef = useRef<Konva.Stage>(null);

  let LEFT = false;
  let RIGHT = false;
  let UP = false;
  let DOWN = false;

  useEffect(() => {
    const container = stageRef.current!.container();
    container.onkeydown = (event) => {
      if (event.key === "a") {
        LEFT = true;
      } else if (event.key === "d") {
        RIGHT = true;
      } else if (event.key === "w") {
        UP = true;
      } else if (event.key === "s") {
        DOWN = true;
      }
    };
    container.onkeyup = (event) => {
      if (event.key === "a") {
        LEFT = false;
      } else if (event.key === "d") {
        RIGHT = false;
      } else if (event.key === "w") {
        UP = false;
      } else if (event.key === "s") {
        DOWN = false;
      }
    };

    const update = () => {
      if (LEFT) {
        setXState((prevState) => prevState - MOVE_RATE);
      } else if (RIGHT) {
        setXState((prevState) => prevState + MOVE_RATE);
      } else if (UP) {
        setYState((prevState) => prevState - MOVE_RATE);
      } else if (DOWN) {
        setYState((prevState) => prevState + MOVE_RATE);
      }
    };

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
        ref={stageRef}
        tabIndex={0}
      >
        <Layer x={xState} y={yState}>
          <Circle radius={100} fill="green" />
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
