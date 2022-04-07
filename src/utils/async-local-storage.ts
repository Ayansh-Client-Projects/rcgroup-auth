import { AsyncLocalStorage } from 'async_hooks';

export const asyncLocalStorage = new AsyncLocalStorage<Map<any, any>>();

export const getAslValue = (key: any) => asyncLocalStorage.getStore()?.get(key);

export const setAslValue = (key: any, value: any) =>
  asyncLocalStorage.getStore()?.set(key, value);
