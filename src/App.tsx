import React from "react";
import "./App.css";
import Tank from "./components/tank/Tank";

function App() {
  const canvasEle = document.getElementById("canvas")! as HTMLCanvasElement;

  return (
    <div className="App">
      <Tank
        ctx={canvasEle.getContext("2d")!}
        size={[10, 20]}
        position={[70, 40]}
      />
    </div>
  );
}

export default App;
