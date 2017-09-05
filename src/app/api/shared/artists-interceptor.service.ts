import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpResponse,
  HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { Artist, QueueItem, Track } from '../models';

@Injectable()
export class ArtistsInterceptor implements HttpInterceptor {

  public concatArtists(artists: Artist[]): string {
    return artists
      .map((artist) => artist.name)
      .join(', ');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUrl = `${environment.apiUrlPlayer}player/current`;
    const queueUrl = `${environment.apiUrlPlayer}player/queue`;
    const trackUrl = `${environment.apiUrlPlayer}tracks`;
    if (
      (!req.url.startsWith(currentUrl)) &&
      (!req.url.startsWith(queueUrl)) &&
      (!req.url.startsWith(trackUrl))) {
      return next.handle(req);
    }

    return next.handle(req)
      .map((event: HttpEvent<QueueItem | QueueItem[] | Track>) => {
        if (event instanceof HttpResponse) {
          if (event.url.startsWith(currentUrl)) {
            const current = <QueueItem>event.body;
            current.track.artistsAsString = this.concatArtists(current.track.artists);
          } else if (event.url.startsWith(queueUrl)) {
            const queue = <QueueItem[]>event.body;
            queue.map((item) => item.track.artistsAsString = this.concatArtists(item.track.artists));
          } else if (event.url.startsWith(trackUrl)) {
            const track = <Track>event.body;
            track.artistsAsString = this.concatArtists(track.artists);
          }
        }
        return event;
      });
  }
}
