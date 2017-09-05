import { Injectable } from '@angular/core';

/**
 * Reference for local storage, can be replaced with
 * any appropriate store service depending on the
 * platform
 *
 * @export
 * @class LocalStorageService
 */
@Injectable()
export class LocalStorageService {
  /**
   * Returns value associated with key in
   * browser local storage
   *
   * @param {string} key
   * @returns {string}
   * @memberof LocalStorageService
   */
  getItem(key: string): string {  return ''; }
}
