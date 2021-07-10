import Position from "./Position";
import Direction from "./Direction";
import MovableModel from "./MovableModel";

class TankModel extends MovableModel {
  private _fireDirection: Direction;
  constructor(
    _position: Position,
    private _lifePoint: number,
    _direction: Direction,
    _speed: number,
    _height: number,
    _width: number,
    _color: string
  ) {
    super(_position, _direction, _speed, _height, _width, _color);
    this._fireDirection = Direction.UP;
  }

  get lifePoint(): number {
    return this._lifePoint;
  }

  set lifePoint(value: number) {
    this._lifePoint = value;
  }

  override get direction() {
    return this._direction
  }

  override set direction(direction: Direction) {
    this._direction = direction;
    if (direction !== Direction.NONE) {
      this._fireDirection = direction;
    }
  }

  get fireDirection(): Direction {
    return this._fireDirection;
  }
}

export default TankModel;
