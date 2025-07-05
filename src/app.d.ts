/// <reference types="@blueos" />
type Router = typeof import('@blueos.app.appmanager.router');
type Accelerometer = typeof import('@blueos.app.sensor.accelerometer');
type Gyroscope = typeof import('@blueos.app.sensor.gyroscope');
type HeartRate = typeof import('@blueos.app.health.heartrate');
type Workout = typeof import('@blueos.app.health.workout');
type Notification = typeof import('@blueos.app.notification');
type Database = typeof import('@blueos.app.storage.database');

/**
 * 全局类型定义
 */

/**
 * 常量定义
 */
interface Constants {
  MODE: {
    SINGLES: string;
    DOUBLES: string;
    MIXED: string;
  };
  THEME: {
    PRIMARY: string;
    SECONDARY: string;
    WARNING: string;
    SUCCESS: string;
    BACKGROUND: string;
    TEXT: string;
  };
  HEART_RATE: {
    MIN: number;
    MAX: number;
  };
}

/**
 * 数据库管理器
 */
interface DatabaseManager {
  memoryDb: any;
  useNative: boolean;
  isInitialized: boolean;
  dbName: string;
  init(dbName: string): Promise<void>;
  executeSql(options: any): Promise<any>;
}

/**
 * Storage API
 */
interface StorageOptions {
  key: string;
  value?: any;
  success?: (data?: any) => void;
  fail?: (data?: any, code?: number) => void;
  complete?: () => void;
  default?: string;
}

interface StorageAPI {
  get(options: StorageOptions): void;
  getSync(options: {key: string}): any;
  set(options: StorageOptions): void;
  delete(options: StorageOptions): void;
  clear(options: Omit<StorageOptions, 'key'>): void;
  length: number;
}

/**
 * 全局变量扩展
 */
interface Window {
  router: any;
  accelerometer: any;
  gyroscope: any;
  heartrate: any;
  workout: any;
  notification: any;
  database: any;
  dbManager: DatabaseManager;
  dbInitPromise: Promise<any>;
  CONSTANTS: Constants;
  storage: StorageAPI;
  onerror: (error: Error) => boolean;
}

declare global {
  const router: Window['router'];
  const accelerometer: Window['accelerometer'];
  const gyroscope: Window['gyroscope'];
  const heartrate: Window['heartrate'];
  const workout: Window['workout'];
  const notification: Window['notification'];
  const database: Window['database'];
  const dbManager: Window['dbManager'];
  const dbInitPromise: Window['dbInitPromise'];
  const CONSTANTS: Window['CONSTANTS'];
  const storage: Window['storage'];
  const onerror: Window['onerror'];
  
  namespace NodeJS {
    interface Global {
      router: Window['router'];
      accelerometer: Window['accelerometer'];
      gyroscope: Window['gyroscope'];
      heartrate: Window['heartrate'];
      workout: Window['workout'];
      notification: Window['notification'];
      database: Window['database'];
      dbManager: Window['dbManager'];
      dbInitPromise: Window['dbInitPromise'];
      CONSTANTS: Window['CONSTANTS'];
      storage: Window['storage'];
      onerror: Window['onerror'];
    }
  }
}