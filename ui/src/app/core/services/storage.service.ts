import { Injectable } from '@angular/core';

/**
 * This service encapsulates the storage capabilities of the underlying environment,
 * in some execution contexts (e.g. Safari on BrowserStack tests) the local/session
 * storage is not available. This service provides a solution for that.
 *
 * In general this service, for persistent storage operations it first tries localStorage
 * but if not possible it does use instance storage, identically for non-persistent storage
 * it tries sessionStorage but if not possible it does use instance storage.
 */
@Injectable()
export class StorageService {

  private static TEST_STORAGE_ITEM_KEY: string = 'test';
  private static TEST_STORAGE_ITEM_VALUE: string = 'test';

  // The follwing variable storage is intentionally untyped because it does depends on the information stored
  /* tslint:disable */
  private instanceLocalStorage: any = {};
  private instanceSessionStorage: any = {};
  /* tslint:enable */

  public localStorageAvailable: boolean;
  public sessionStorageAvailable: boolean;

  public constructor() {
    this.localStorageAvailable = this.isStorageSupported(localStorage);
    this.sessionStorageAvailable = this.isStorageSupported(sessionStorage);
  }

  /**
   * Adds and item to the persistent/session storage depending on the parameter
   *
   * @param {string} key The key of the data to be saved
   * @param {string} data The actual data to be saved
   * @param {boolean} persistent Indicates if the storage has to persist or not
   */
  public setItem(key: string, data: string, persistent: boolean): void {
    if (persistent) {
      if (this.localStorageAvailable) {
        localStorage.setItem(key, data);
      } else {
        this.instanceLocalStorage[key] = data;
      }
    } else {
      if (this.sessionStorageAvailable) {
        sessionStorage.setItem(key, data);
      } else {
        this.instanceSessionStorage[key] = data;
      }
    }
  }

  /**
   * Obtains the content of an item identified by the key from the persistent/session
   * storage depending on the parameter
   *
   * @param {string} key The key of the data to be retrieved
   * @param {boolean} persistent Indicates if the storage has to persist or not
   * @return {string} The data stored in the storage for the specified key
   */
  public getItem(key: string, persistent: boolean): string | null {
    if (persistent) {
      if (this.localStorageAvailable) {
        return localStorage.getItem(key);
      } else {
        return this.instanceLocalStorage[key] === undefined ?
          null : this.instanceLocalStorage[key];
      }
    } else {
      if (this.sessionStorageAvailable) {
        return sessionStorage.getItem(key);
      } else {
        return this.instanceSessionStorage[key] === undefined ?
          null : this.instanceSessionStorage[key];
      }
    }
  }

  /**
   * Removes an item from the persistent/session storage depending on the parameter
   *
   * @param {string} key The key of the item to be removed
   * @param {boolean} persistent Indicates if referring to the persistent storage or not
   */
  public removeItem(key: string, persistent: boolean): void {
    if (persistent) {
      if (this.localStorageAvailable) {
        localStorage.removeItem(key);
      } else {
        delete this.instanceLocalStorage[key];
      }
    } else {
      if (this.sessionStorageAvailable) {
        sessionStorage.removeItem(key);
      } else {
        delete this.instanceSessionStorage[key];
      }
    }
  }

  /**
   * @param {Storage} storage The storage to be evaluated
   * @return {boolean} Returns true or false depending of the storage capability available or not
   */
  public isStorageSupported(storage: Storage): boolean {
    try {
      storage.setItem(StorageService.TEST_STORAGE_ITEM_KEY, StorageService.TEST_STORAGE_ITEM_VALUE);
      storage.removeItem(StorageService.TEST_STORAGE_ITEM_KEY);
      return true;
    } catch (e) {
      if (storage === localStorage) {
        console.log('WARN: Using instance storage because localStorage is not avaiable');
      } else {
        console.log('WARN: Using instance storage because instanceStorage is not avaiable');
      }

      return false;
    }
  }

}
