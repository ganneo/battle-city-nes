class Position {
  public constructor(private _x: number, private _y: number) {}

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }
}

export const DEFAULT_POSITION = new Position(10, 20);

export default Position;
