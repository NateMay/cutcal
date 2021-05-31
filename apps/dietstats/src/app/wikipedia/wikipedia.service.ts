import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { WikiDescription } from '@cutcal/core';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {
  constructor(private readonly http: HttpClient) {}

  getDescription(link: string): Observable<WikiDescription> {
    return this.http.post<WikiDescription>('/api/wikipedia', { link })
  }

  getMessage(): Observable<WikiDescription> {
    return this.http.get<WikiDescription>('/api/hello')
  }
}
