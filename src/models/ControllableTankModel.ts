import TankModel from "./TankModel";
import Position from "./Position";
import Konva from "konva";
import Direction from "./Direction";

class ControllableTankModel extends TankModel {
  private _registeredMoveKeys: Set<string>;

  constructor(
    _position: Position,
    _lifePoint: number,
    _direction: Direction,
    _speed: number,
    private _upKey: string,
    private _downKey: string,
    private _leftKey: string,
    private _rightKey: string,
    private _shootKey: string,
    private _stage: Konva.Stage,
    _height: number,
    _width: number,
    _color: string
  ) {
    super(_position, _lifePoint, _direction, _speed, _height, _width, _color);
    this._registeredMoveKeys = new Set([_upKey, _downKey, _leftKey, _rightKey]);
  }

  get upKey(): string {
    return this._upKey;
  }

  set upKey(value: string) {
    this._upKey = value;
  }

  get downKey(): string {
    return this._downKey;
  }

  set downKey(value: string) {
    this._downKey = value;
  }

  get leftKey(): string {
    return this._leftKey;
  }

  set leftKey(value: string) {
    this._leftKey = value;
  }

  get rightKey(): string {
    return this._rightKey;
  }

  set rightKey(value: string) {
    this._rightKey = value;
  }

  get stage(): Konva.Stage {
    return this._stage;
  }

  set stage(value: Konva.Stage) {
    this._stage = value;
  }

  get registeredMoveKeys(): Set<string> {
    return this._registeredMoveKeys;
  }

  set registeredMoveKeys(value: Set<string>) {
    this._registeredMoveKeys = value;
  }

  get shootKey(): string {
    return this._shootKey;
  }

  set shootKey(value: string) {
    this._shootKey = value;
  }
}

export default ControllableTankModel;
