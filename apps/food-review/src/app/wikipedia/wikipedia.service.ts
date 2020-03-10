import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '@cutcal/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {

  constructor(private http: HttpClient) { }

  getDescription(link: string): Observable<Message> {
    return this.http.post<Message>('/api/wikipedia', { link })
  }

  getMessage(): Observable<Message>  {
    return this.http.get<Message>('/api/hello')
  }

}
