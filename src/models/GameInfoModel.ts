class GameInfoModel {
  private _startTime: Date;
  private readonly _players: string[];

  constructor(private _gameName: string) {
    this._startTime = new Date();
    this._players = [];
  }

  get gameName(): string {
    return this._gameName;
  }

  set gameName(value: string) {
    this._gameName = value;
  }

  get startTime(): Date {
    return this._startTime;
  }

  set startTime(value: Date) {
    this._startTime = value;
  }

  get players(): string[] {
    return this._players;
  }

  addPlayer: (player: string) => string = (player) => {
    if (!this._players.includes(player)) {
      this._players.push(player);
      return player;
    }

    return "";
  };

  static parseJSON: (obj: any) => GameInfoModel = (obj) => {
    const gameInfoModel = new GameInfoModel(obj.gameName);
    gameInfoModel.startTime = new Date(obj.startTime);
    obj.players.forEach((player: string) => gameInfoModel.addPlayer(player));
    return gameInfoModel;
  };
}

export default GameInfoModel;
