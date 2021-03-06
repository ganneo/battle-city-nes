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

  clone() {
    return new Position(this._x, this._y);
  }
}

export default Position;
