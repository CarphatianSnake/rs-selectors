import { checkLevel } from 'utils';
import { ProgressData, IStorageData, SetProgress } from 'types';

class StorageController {
  private data: IStorageData = { level: 0, progress: [] };

  constructor() {
    this.getData();
  }

  public getData(): void {
    const data = localStorage.getItem('game');

    if (!data) {
      this.setData();
    } else {
      const parsedData: IStorageData = JSON.parse(data);
      this.data = {
        level: checkLevel(+parsedData.level),
        progress: parsedData.progress,
      };
    }
  }

  public setData = (): void => {
    localStorage.setItem('game', JSON.stringify(this.data));
  };

  public set setLevel(level: number) {
    this.data.level = level;
    this.setData();
  }

  public get level(): number {
    return this.data.level;
  }

  public setProgress: SetProgress = (currentLevel, status) => {
    this.data.progress[currentLevel] = status;
    this.setData();
  };

  public get progress(): ProgressData[] {
    return this.data.progress;
  }

  public resetData = (): void => {
    this.data = {
      level: 0,
      progress: [],
    };
    this.setData();
  };
}

export default StorageController;
