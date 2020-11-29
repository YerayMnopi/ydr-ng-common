import { Observable, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

export class SseService {
  private eventSource: EventSource;
  
  constructor(private endpoint: string) { }

  GetExchangeData(): Observable<any> {
    if (typeof(EventSource) === 'undefined') {
      return
    }
  
    this.eventSource = new EventSource(this.endpoint);

    this.eventSource.onerror = function(e) {
      console.log(e);
      if(this.readyState==0) {
        console.log('Reconnecting…');
      }
    }
  
    return fromEvent(this.eventSource, 'message').pipe(
      map((event: any) => {
        return JSON.parse(event.data);
      })
    );

    /*
    this.evs.addEventListener(
      "timestamp",
      function(e) {
        console.log("Timestamp event Received.Ready State is " + this.readyState);
        subject.next(e["data"]);
      }
    )*/

  }

  stopExchangeUpdates() {
    this.eventSource.close();
  }
}
