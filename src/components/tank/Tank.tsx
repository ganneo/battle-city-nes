import React from "react";
import { Rect, Text } from "react-konva";
import TankModel from "../../models/TankModel";

interface TankProps {
  tankModel: TankModel;
  username: string | null;
}

const Tank: React.FC<TankProps> = (props) => {
  return (
    <React.Fragment>
      <Rect
        height={props.tankModel.height}
        width={props.tankModel.width}
        cornerRadius={5}
        shadowBlur={10}
        x={props.tankModel.position.x - props.tankModel.width / 2}
        y={props.tankModel.position.y - props.tankModel.height / 2}
        fill={props.tankModel.color}
      />
      <Text
        text={props.username ? props.username : ""}
        x={props.tankModel.position.x - props.tankModel.width / 2}
        y={props.tankModel.position.y - props.tankModel.height / 2}
        width={props.tankModel.width}
        height={props.tankModel.height}
        align={"center"}
        verticalAlign={"middle"}
        fontSize={30}
      />
    </React.Fragment>
  );
};

export default Tank;
