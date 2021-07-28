class UserInfoModel {
  constructor(private _username: string, private _gameName: string) {}

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get gameName(): string {
    return this._gameName;
  }

  set gameName(value: string) {
    this._gameName = value;
  }
}

export default UserInfoModel;
