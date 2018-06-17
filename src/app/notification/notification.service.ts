import { Injectable } from '@angular/core';

/**
 * Reference to notification web api, can be replaced with
 * a platform specific notification service depending on the platform
 *
 * @export
 * @class NotificationService
 */
@Injectable()
export class NotificationService {
  /**
   * Current notification permission status from the browser
   *
   * @type {('default' | 'denied' | 'granted')}
   * @memberof NotificationService
   */
  public get permission(): 'default' | 'denied' | 'granted' {
    return this.nativeNotification.permission;
  }
  /**
   * Instance of native platform notification api/lib
   *
   * @type {*}
   * @memberof NotificationService
   */
  public nativeNotification: any;
  /**
   * Request permission from browser to display notifications
   *
   * @param {Function} [callback]
   * @memberof NotificationService
   */
  public requestPermission(callback?: Function): any {
    return this.nativeNotification.requestPermission(callback);
  }
  /**
   * Push new message notification
   *
   * @param {string} msg
   * @param {NotificationOptions} [options]
   * @returns
   * @memberof NotificationService
   */
  public push(msg: string, options?: NotificationOptions): any {
    if (this.permission === 'default') {
      return this.requestPermission(
        () => new this.nativeNotification(msg, options)
      );
    } else if (this.permission === 'granted') {
      return new this.nativeNotification(msg, options);
    }
  }
}
