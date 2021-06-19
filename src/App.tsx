import React, { useState } from "react";
import "./App.css";
import { Layer, Rect, Stage } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import Position, { DEFAULT_POSITION } from "./models/Position";

function App() {
  const [positionState, setPositionState] = useState<Position>(
    DEFAULT_POSITION
  );

  const dragStartHandler = (e: KonvaEventObject<DragEvent>) => {
    e.target.setAttrs({
      shadowOffset: {
        x: 10,
        y: 20,
      },
      scale: {
        x: 3,
        y: 5,
      },
    });
  };

  const dragEndHandler = (e: KonvaEventObject<DragEvent>) => {
    e.target.setAttrs({
      shadowOffset: {
        x: 0,
        y: 0,
      },
      scale: {
        x: 1,
        y: 1,
      },
    });

    setPositionState(new Position(e.target.x(), e.target.y()));
  };

  const MOVE_RATE = 100;

  return (
    <div
      className="App"
      id="app"
      onKeyPress={(event) => {
        if (event.key === "w") {
          setPositionState(
            (oldState) => new Position(oldState.x, oldState.y - MOVE_RATE)
          );
          return;
        }
        if (event.key === "a") {
          setPositionState(
            (oldState) => new Position(oldState.x - MOVE_RATE, oldState.y)
          );
          return;
        }
        if (event.key === "s") {
          setPositionState(
            (oldState) => new Position(oldState.x, oldState.y + MOVE_RATE)
          );
          return;
        }
        if (event.key === "d") {
          setPositionState(
            (oldState) => new Position(oldState.x + MOVE_RATE, oldState.y)
          );
          return;
        }
      }}
      tabIndex={0}
    >
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Rect
            width={20}
            height={30}
            fill="red"
            x={positionState.x}
            y={positionState.y}
            shadowBlur={5}
            draggable
            onDragStart={dragStartHandler}
            onDragEnd={dragEndHandler}
          />
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
