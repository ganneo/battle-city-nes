import MovableModel from "./MovableModel";
import TankModel from "./TankModel";
import Position from "./Position";
import Direction from "./Direction";

class BulletModel extends MovableModel {
  constructor(
    _position: Position,
    private _tank: TankModel,
    _direction: Direction,
    _speed: number,
    _height: number,
    _width: number,
    _color: string
  ) {
    super(_position, _direction, _speed, _height, _width, _color);
  }

  get tank(): TankModel {
    return this._tank;
  }

  set tank(value: TankModel) {
    this._tank = value;
  }
}

export default BulletModel;
