class LocalStorageMock {
  private data: { [key: string]: string } = {};

  public getItem(key: string): string | null {
    return this.data[key] || null;
  }

  public setItem(key: string, value: string): void {
    this.data[key] = value;
  }

  public clear(): void {
    this.data = {};
  }
}

export default LocalStorageMock;
