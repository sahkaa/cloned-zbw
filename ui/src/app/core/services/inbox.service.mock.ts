import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

export class InboxServiceMock {

  public getBadgeCount(): Observable<number> {
    return of(12);
  }

}
