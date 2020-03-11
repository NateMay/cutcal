import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core'

@Component({
  selector: 'highcharts-chart',
  template: '',
})
export class MockHighChartsComponent {
  @Input() update!: any
  @Input() Highcharts!: any
  @Input() options!: any
  @Input() callbackFunction!: any
  @Output() updateChange = new EventEmitter<any>()
}

@NgModule({
  imports: [CommonModule],
  declarations: [MockHighChartsComponent],
  exports: [MockHighChartsComponent],
})
export class MockHighChartsModule {}
