import TankModel from "./TankModel";
import Position from "./Position";
import Appearance from "./Appearance";
import Konva from "konva";
import Direction from "./Direction";

class ControllableTankModel extends TankModel {
  private _registeredMoveKeys: Set<string>;

  constructor(
    _position: Position,
    _lifePoint: number,
    _appearance: Appearance,
    _direction: Direction,
    _speed: number,
    private _upKey: string,
    private _downKey: string,
    private _leftKey: string,
    private _rightKey: string,
    private _stage: Konva.Stage
  ) {
    super(_position, _lifePoint, _appearance, _direction, _speed);
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
}

export default ControllableTankModel;
