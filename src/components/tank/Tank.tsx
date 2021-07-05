import React from "react";
import { Rect } from "react-konva";
import TankModel from "../../models/TankModel";

interface TankProps {
  tankModel: TankModel;
}

const Tank: React.FC<TankProps> = (props) => {
  return (
    <Rect
      height={200}
      width={100}
      cornerRadius={5}
      shadowBlur={10}
      x={props.tankModel.position.x}
      y={props.tankModel.position.y}
      fill={props.tankModel.appearance.color}
    />
  );
};

export default Tank;
