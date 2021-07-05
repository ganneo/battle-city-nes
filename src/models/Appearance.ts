class Appearance {
  constructor(private _color: string) {}

  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }
}

export default Appearance;
