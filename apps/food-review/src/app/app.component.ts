import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { Message } from '@cutcal/api-interfaces'
@Component({
  selector: 'cutcal-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'food-review'

  hello$ = this.http.get<Message>('/api/hello')
  constructor(private http: HttpClient) {}
}
