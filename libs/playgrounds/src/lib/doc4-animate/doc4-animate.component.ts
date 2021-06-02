import { transition, trigger, useAnimation } from '@angular/animations'
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core'
import {
  AnimateComponent,
  AnimateSpeed,
  Animations,
  flip
} from '@cutcal/common-ui'

@Component({
  animations: [trigger('flip', [transition('* => *', useAnimation(flip))])],
  template: `
    <h2>Anmiation Directive</h2>
    <hr />
    <div fxLayout="row">
      <div fxFlex="50%">
        <h2>Enter Anmiations</h2>

        <div fxLayout="row wrap" fxLayoutGap="10px">
          <div
            *ngFor="let animation of enterAnimations"
            #enters
            [dsAnimate]="animation"
            [speed]="speed"
          >
            <button
              (click)="enters.replay = true"
              style="margin-bottom: 10px;"
              mat-raised-button
              color="primary"
            >
              {{ animation }}
            </button>
          </div>
        </div>
      </div>

      <div fxFlex="50%">
        <h2>Exit Anmiations</h2>

        <div fxLayout="row wrap" fxLayoutGap="10px">
          <div
            *ngFor="let animation of exitAnimations"
            #exits
            [dsAnimate]="animation"
            [speed]="speed"
          >
            <button
              (click)="replayExit(animation)"
              style="margin-bottom: 10px;"
              mat-raised-button
              color="primary"
            >
              {{ animation }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div fxLayout="row">
      <div fxFlex="50%">
        <h2>Acition Anmiations</h2>

        <div fxLayout="row wrap" fxLayoutGap="10px">
          <button
            [@flip]="flip"
            (click)="flip = !flip"
            style="margin-bottom: 10px;"
            mat-raised-button
            color="primary"
          >
            flip
          </button>
        </div>
      </div>
    </div>

    <hr />

    <mat-form-field>
      <mat-label>Speed</mat-label>
      <mat-select [(ngModel)]="speed">
        <mat-option *ngFor="let spd of speeds" [value]="spd">{{
          spd
        }}</mat-option>
      </mat-select>
    </mat-form-field>

    <button (click)="replayAll()" mat-raised-button color="primary">
      Replay Animations
    </button>
  `,
  styleUrls: ['./doc4-animate.component.css']
})
export class Doc4AnimateComponent implements OnInit {
  flip = false

  speed: AnimateSpeed = 'fast'

  speeds: AnimateSpeed[] = ['slower', 'slow', 'normal', 'fast', 'faster']

  showExit = true

  get timeout(): number {
    return {
      slower: 3200,
      slow: 2200,
      normal: 1200,
      fast: 700,
      faster: 500
    }[this.speed]
  }

  @ViewChildren('enters') enters!: QueryList<AnimateComponent>
  @ViewChildren('exits') exits!: QueryList<AnimateComponent>

  enterAnimations: Animations[] = [
    'landing',
    'pulse',
    'beat',
    'heartBeat',
    'fadeIn',
    'fadeInRight',
    'fadeInLeft',
    'fadeInUp',
    'fadeInDown',
    'zoomIn',
    'bumpIn',
    'flipInX',
    'flipInY'
  ]

  _exitAnimations: Animations[] = [
    'fadeOut',
    'fadeOutRight',
    'fadeOutLeft',
    'fadeOutDown',
    'fadeOutUp',
    'zoomOut',
    'flipOutX',
    'flipOutY'
  ]

  exitAnimations: Animations[] = []

  constructor() {}

  ngOnInit(): void {
    this.exitAnimations = this._exitAnimations
    setTimeout(() => this.replayExists(), 300)
  }

  replayAll(): void {
    this.enters.forEach((animation) => (animation.replay = true))
    this.replayExists()
  }

  replayExists(): void {
    this.exitAnimations = []
    setTimeout(() => (this.exitAnimations = this._exitAnimations), this.timeout)
  }

  replayExit(animation: Animations): void {
    this.exitAnimations = this.exitAnimations.filter((an) => an !== animation)
    setTimeout(() => (this.exitAnimations = this._exitAnimations), this.timeout)
  }
}
