import { Observable, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

export class SseService<T> {
  private eventSource: EventSource;
  
  constructor() { }

  GetExchangeData(endpoint: string): Observable<T> {
    if (typeof(EventSource) === 'undefined') {
      return
    }
  
    this.eventSource = new EventSource(endpoint);

    this.eventSource.onerror = function(e) {
      console.log(e);
      if (this.readyState==0) {
        console.log('Reconnecting…');
      }
    }
  
    return fromEvent(this.eventSource, 'message').pipe(
      map((event: any) => {
        return JSON.parse(event.data);
      })
    );

  }

  stopExchangeUpdates() {
    this.eventSource.close();
  }
}
