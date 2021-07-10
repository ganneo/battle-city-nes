import Position from "./Position";
import Direction from "./Direction";

class MovableModel {
  constructor(
    private _position: Position,
    protected _direction: Direction,
    private _speed: number,
    private _height: number,
    private _width: number,
    private _color: string
  ) {}

  get position(): Position {
    return this._position;
  }

  set position(value: Position) {
    this._position = value;
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

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
  }

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
  }

  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }

  updatePosition() {
    switch (this.direction) {
      case Direction.UP:
        this.position.y = this.position.y - this.speed;
        break;
      case Direction.DOWN:
        this.position.y = this.position.y + this.speed;
        break;
      case Direction.LEFT:
        this.position.x = this.position.x - this.speed;
        break;
      case Direction.RIGHT:
        this.position.x = this.position.x + this.speed;
        break;
      default:
        break;
    }
  }

  survive(movableItems: MovableModel[]) {
    return !movableItems.some(
      (movableItem) =>
        movableItem.position.x + movableItem.width / 2 >
          this.position.x - this.width / 2 &&
        movableItem.position.x - movableItem.width / 2 <
          this.position.x + this.width / 2 &&
        movableItem.position.y + movableItem.height / 2 >
          this.position.y - this.height / 2 &&
        movableItem.position.y - movableItem.height / 2 <
          this.position.y + this.height / 2
    );
  }
}

export default MovableModel;
