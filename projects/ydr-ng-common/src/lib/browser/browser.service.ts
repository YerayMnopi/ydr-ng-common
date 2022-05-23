import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { fromEvent, merge, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';

import { Breakpoint } from './breakpoint.type';


@Injectable({
  providedIn: 'root'
})
export class BrowserService {
  /**
   * Tracks the changes of the active breakpoint of the layout
   */
  private activeBreakpointChanges: Observable<Breakpoint>;

  /**
   * Tracks the clicks made by the user in the document
   */
  private documentClicks: Observable<Event>;

  /**
   * Tracks the changes of the scroll of the window
   */
  private scrollChanges: Observable<number>;

  /**
   * Tracks the changes of the width of the window
   */
  private viewportWidthChanges: Observable<number>;

  constructor() {
    this.disableDragAndDropDefault().subscribe();
  }

  /**
   * Returns true if the app is running in a browser (not in the node server).
   */
  checkIsBrowserPlatform(): boolean {
    return true;
  }

  /**
   * Gets the current value of the window offset Y and its changes
   */
  
  getScroll(): Observable<number> {
    if (!this.scrollChanges) {
      this.scrollChanges = fromEvent(this.getWindow(), 'scroll').pipe(
        startWith(() => this.getWindow().pageYOffset),
        map(() => this.getWindow().pageYOffset)
      );
    }

    return this.scrollChanges;
  }

  /**
   * Gets the clicks made by the user in the document
   */
  
  getClicks(): Observable<Event> {
    if (!this.documentClicks) {
      this.documentClicks = fromEvent(this.getWindow().document, 'click');
    }

    return this.documentClicks;
  }

  /**
   * Gets the current value of the window width and its changes
   */
  
  getViewportWidthChanges(): Observable<number> {
    if (!this.viewportWidthChanges) {
      this.viewportWidthChanges = fromEvent(this.getWindow(), 'resize').pipe(
        debounceTime(500),
        startWith(() => this.getWindow().innerWidth),
        map(() => this.getWindow().innerWidth)
      );
    }

    return this.viewportWidthChanges;
  }

  /**
   * Gets the active breakpoint of the layout and its changes.
   */
  getActiveBreakpointChanges(): Observable<Breakpoint> {
    if (!this.activeBreakpointChanges) {
      this.activeBreakpointChanges = this.getViewportWidthChanges().pipe(
        map(() => this.getActiveBreakpoint()),
        distinctUntilChanged()
      );
    }

    return this.activeBreakpointChanges;
  }

  /**
   * Gets the specified css variable value.
   * @param key Css var key to get
   */
  getCssVariable(key: string): string {
    return this.getWindow().document.documentElement.style.getPropertyValue('--' + key);
  }

  /**
   * Returns the browser Window object.
   */
  getWindow() {
    return window;
  }

  /**
   * Gets the value from local storage for the specified key.
   * @param key key of the value to get
   */
  removeFromLocalStorage(key: string) {
    this.getWindow().localStorage.removeItem(key);
    this.getWindow().localStorage.removeItem(`${key}-lifetime`);
    this.getWindow().localStorage.removeItem(`${key}-timestamp`);
  }

  /**
   * Event occurs when the browser window has been resized.
   * @param fn Funtion to execute when an event occurs
   * @param scope Scope to continue excution
   */
  onResize(fn: Function, scope: any): void {
    this.getWindow().onresize = () => {
      fn.apply(scope);
    };
  }

  /**
   * Gets the value from local storage for the specified key.
   * @param key key of the value to get
   */
  retrieveFromLocalStorage(key: string): any {
    if (this.checkItemHasExpired(key)) {
      return null;
    }

    const item = this.getWindow().localStorage.getItem(key);

    return item ? JSON.parse(item) : null;
  }

  /**
   * Save a key value pair in browser local storage
   * @param key key of the value to save
   * @param value value to save
   * @param lifetimeSeconds Expiration time for saved data
   */
  saveInLocalStorage(key: string, value: any, lifetimeSeconds?: number) {
    this.getWindow().localStorage.setItem(key, JSON.stringify(value));

    if (lifetimeSeconds) {
      this.getWindow().localStorage.setItem(`${key}-timestamp`, Date.now().toString());
      this.getWindow().localStorage.setItem(`${key}-lifetime`, lifetimeSeconds.toString());
    }
  }

  /**
   * Build the file and download it
   */
  createObjectUrlAndDownload(report: Blob, reportName: string) {
    const url = this.getWindow().URL.createObjectURL(report);
    const a = this.getWindow().document.createElement('a');
    this.getWindow()
      .document.getElementsByTagName('body')[0]
      .appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = reportName;
    a.click();
    this.getWindow().URL.revokeObjectURL(url);
    a.remove();
  }

  /**
   * It downloads a file from the given link
   */
  downloadFromUrl(url: string): HTMLAnchorElement {
    const a = this.getWindow().document.createElement('a');
    this.getWindow()
      .document.getElementsByTagName('body')[0]
      .appendChild(a);
    a.setAttribute('style', 'display: none');
    a.setAttribute('target', '_blank');
    a.href = url;
    a.click();
    a.remove();
    return a;
  }

  /**
   * Save a key value pair in browser session storage
   * @param key key of the value to save
   * @param value value to save
   */
  saveInSessionStorage(key: string, value: any) {
    this.getWindow().sessionStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Gets the value from session storage for the specified key.
   * @param key key of the value to get
   */
  retrieveFromSessionStorage(key: string): any {
    if (this.checkItemHasExpired(key)) {
      return null;
    }

    const item = this.getWindow().sessionStorage.getItem(key);

    return item ? JSON.parse(item) : null;
  }

  /**
   * Gets the active breakpoint of the window width
   */
  private getActiveBreakpoint(): Breakpoint {
    const viewportWidth = this.getWindow().innerWidth;

    if (viewportWidth <= Breakpoint.SmallPhone) {
      return Breakpoint.SmallPhone;
    } else if (Breakpoint.SmallPhone < viewportWidth && viewportWidth <= Breakpoint.Phone) {
      return Breakpoint.Phone;
    } else if (Breakpoint.Phone < viewportWidth && viewportWidth <= Breakpoint.Tablet) {
      return Breakpoint.Tablet;
    } else {
      return Breakpoint.Desktop;
    }
  }

  /**
   * Checks if a local storage item has expired
   * @param key key of the item to check
   */
  private checkItemHasExpired(key: string): boolean {
    const storedLifetime = this.getWindow().localStorage.getItem(`${key}-lifetime`);

    if (storedLifetime) {
      const storedTimestamp = this.getWindow().localStorage.getItem(`${key}-timestamp`);
      const hasExpired =
        Date.now() - parseInt(storedTimestamp, 1) >
        parseInt(storedLifetime, 1) * 1000;

      if (hasExpired) {
        this.removeFromLocalStorage(key);
        return true;
      }
    }

    return false;
  }

  /**
   * Util for drag and drop files into de the browser. Stops the browser from
   * reading the file and leaving the app.
   */
  private disableDragAndDropDefault(): Observable<void> {
    return merge(fromEvent(this.getWindow(), 'dragover'), fromEvent(this.getWindow(), 'drop')).pipe(
      map((event: Event) => {
        event.preventDefault();
      })
    );
  }
}
