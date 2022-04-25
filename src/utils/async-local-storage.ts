import { AsyncLocalStorage } from 'async_hooks';

export const asyncLocalStorage = new AsyncLocalStorage<Map<any, any>>();

export const getAslValue = <K, V>(key: K): V =>
  asyncLocalStorage.getStore()?.get(key);

export const setAslValue = <K, V>(key: K, value: V) =>
  asyncLocalStorage.getStore()?.set(key, value);
