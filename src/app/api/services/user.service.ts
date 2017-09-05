import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { User } from '../models';

@Injectable()
export class UserService {

  private endpointUrl = `${environment.apiUrlPlayer}users/`;

  constructor(private http: HttpClient) { }

  public me(): Observable<User> {
    return this.http.get<User>(`${this.endpointUrl}authenticated`);
  }

  public get(id: string): Observable<User> {
    return this.http.get<User>(`${this.endpointUrl}${id}`);
  }
}
