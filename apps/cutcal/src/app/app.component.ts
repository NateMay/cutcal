import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { Message } from '@cutcal/api-interfaces'
import { Nutrition } from '@cutcal/nutrition'

@Component({
  selector: 'cc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  nutrition: Nutrition<number>
  showFiller = false

  hello$ = this.http.get<Message>('/api/hello')
  constructor(private http: HttpClient) {}
}
