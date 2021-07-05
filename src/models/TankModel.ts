import Position from "./Position";
import Appearance from "./Appearance";
import Direction from "./Direction";

class TankModel {
  constructor(
    private _position: Position,
    private _lifePoint: number,
    private _appearance: Appearance,
    private _direction: Direction,
    private _speed: number
  ) {}

  get position(): Position {
    return this._position;
  }

  set position(value: Position) {
    this._position = value;
  }

  get lifePoint(): number {
    return this._lifePoint;
  }

  set lifePoint(value: number) {
    this._lifePoint = value;
  }

  get appearance(): Appearance {
    return this._appearance;
  }

  set appearance(value: Appearance) {
    this._appearance = value;
  }

  get direction(): Direction {
    return this._direction;
  }

  set direction(value: Direction) {
    this._direction = value;
  }

  get speed(): number {
    return this._speed;
  }

  set speed(value: number) {
    this._speed = value;
  }
}

export default TankModel;
