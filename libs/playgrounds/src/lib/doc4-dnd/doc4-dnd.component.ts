import { Component } from '@angular/core'
import { DndPayload } from '@cutcal/common'

@Component({
  selector: 'cutcal-doc4-dnd',
  template: `
    <h2>Drag & Drop</h2>
    <hr />

    <div fxLayout="row" class="values" fxLayoutGap="10px">
      <div
        class="drag"
        *ngFor="let value of values"
        [dragImage]="'../../../../assets/images/expert.png'"
        [drag]="value"
        [dragImage]
      >
        {{ value }}
      </div>
    </div>

    <br />

    <div fxLayout="row" class="operators" fxLayoutGap="10px">
      <div
        class="drag"
        *ngFor="let operator of operators"
        [dragImage]="'../../../../assets/images/expert.png'"
        [drag]="operator"
      >
        {{ operator }}
      </div>
    </div>

    <br />
    <br />

    <div class="equation" fxLayout="row" fxLayoutGap="20px">
      <div class="drop" [drop]="null" (onDrop)="val1Drop($event)">
        {{ value1 }}
      </div>
      <div class="drop" [drop]="null" (onDrop)="operDrop($event)">
        {{ operator }}
      </div>
      <div class="drop" [drop]="null" (onDrop)="val2Drop($event)">
        {{ value2 }}
      </div>
      <div class="equals">=</div>
      <div class="result">{{ result }}</div>
    </div>
  `,
  styleUrls: ['./doc4-dnd.component.scss'],
})
export class Doc4DndComponent {
  value1: number = 3
  operator: string = '×'
  value2: number = 9
  result: number = 27

  values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  operators = ['×', '÷', '+', '-']

  constructor() {}

  calculate(): void {
    switch (this.operator) {
      case '×':
        this.result = this.value1 * this.value2
        break
      case '÷':
        this.result = this.value1 / this.value2
        break
      case '+':
        this.result = this.value1 + this.value2
        break
      case '-':
        this.result = this.value1 - this.value2
        break
    }
  }

  val1Drop(payload: DndPayload<number, null>): void {
    if (typeof payload.drag !== 'number') return
    this.value1 = payload.drag
    this.calculate()
  }
  val2Drop(payload: DndPayload<number, null>): void {
    if (typeof payload.drag !== 'number') return
    this.value2 = payload.drag
    this.calculate()
  }

  operDrop(payload: DndPayload<string, null>): void {
    if (typeof payload.drag !== 'string') return
    this.operator = payload.drag
    this.calculate()
  }
}
