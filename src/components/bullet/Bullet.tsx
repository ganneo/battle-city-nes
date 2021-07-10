import React from "react";
import BulletModel from "../../models/BulletModel";
import { Rect } from "react-konva";

interface BulletProps {
  bulletModel: BulletModel;
}

function Bullet(props: BulletProps) {
  return (
    <Rect
      height={props.bulletModel.height}
      width={props.bulletModel.width}
      fill={props.bulletModel.color}
      x={props.bulletModel.position.x - props.bulletModel.width / 2}
      y={props.bulletModel.position.y - props.bulletModel.height / 2}
    />
  );
}

export default Bullet;
