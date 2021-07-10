import React from "react";
import { Rect } from "react-konva";
import TankModel from "../../models/TankModel";

interface TankProps {
  tankModel: TankModel;
}

const Tank: React.FC<TankProps> = (props) => {
  return (
    <Rect
      height={props.tankModel.height}
      width={props.tankModel.width}
      cornerRadius={5}
      shadowBlur={10}
      x={props.tankModel.position.x - props.tankModel.width / 2}
      y={props.tankModel.position.y - props.tankModel.height / 2}
      fill={props.tankModel.color}
    />
  );
};

export default Tank;
