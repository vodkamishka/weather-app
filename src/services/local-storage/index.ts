class LocalStorageService {
  private _stringify(value: string[]): string {
    return JSON.stringify(value);
  }

  private _parse(value: string): string[] | void {
    if (value) {
      return JSON.parse(value);
    }
  }

  private _getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  public set(key: string, value: string): void {
    const prevValue = this.get(key);
    localStorage.setItem(
      key,
      this._stringify(prevValue ? [...prevValue, value] : [value])
    );
  }

  public changeData(key: string, value: string[]): void {
    localStorage.setItem(key, this._stringify(value));
  }

  public get(key: string): string[] | void {
    const isKeyExist = this._getItem(key);
    if (isKeyExist) {
      return this._parse(isKeyExist);
    }
  }
}

export default new LocalStorageService();
