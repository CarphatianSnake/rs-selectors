/**
 * @jest-environment jsdom
 */

import StorageController from 'game/storageController';
import LocalStorageMock from './__mock__/index.mock';
import { LevelStatus, ProgressData } from '../../types';

Object.defineProperty(window, 'localStorage', { value: new LocalStorageMock() });
const testData: { level: number; progress: ProgressData[] } = { level: 1, progress: [LevelStatus.DONE, null] };

beforeEach(() => {
  window.localStorage.clear();
});

test('Testing initial storage with empty localStorage', () => {
  const controller = new StorageController();

  expect(controller.level).toBe(0);
  expect(controller.progress).toStrictEqual([]);
});

test('Testing initial storage with some data at localStorage', () => {
  window.localStorage.setItem('game', JSON.stringify(testData));
  const controller = new StorageController();

  expect(controller.level).toBe(testData.level);
  expect(controller.progress).toStrictEqual(testData.progress);
});

test('Test controller setters', () => {
  const controller = new StorageController();
  const testLevelSetter = (): number => {
    controller.setLevel = testData.level;
    return controller.level;
  };
  const testProgressSetter = (): ProgressData[] => {
    controller.setProgress(0, LevelStatus.DONE);
    controller.setProgress(1, LevelStatus.HELPED);
    controller.setProgress(2, null);
    return controller.progress;
  };

  expect(testLevelSetter()).toBe(testData.level);
  expect(testProgressSetter()).toStrictEqual([LevelStatus.DONE, LevelStatus.HELPED, null]);
});

test('Test controller data reset', () => {
  window.localStorage.setItem('game', JSON.stringify(testData));
  const controller = new StorageController();

  const getData = (): { level: number; progress: ProgressData[] } => {
    const { level, progress } = controller;
    return { level, progress };
  };

  const getDataBeforeReset = getData;
  const getDataAfterReset = (): { level: number; progress: ProgressData[] } => {
    controller.resetData();
    return getData();
  };

  expect(getDataBeforeReset()).toStrictEqual(testData);
  expect(getDataAfterReset()).toStrictEqual({ level: 0, progress: [] });
});
