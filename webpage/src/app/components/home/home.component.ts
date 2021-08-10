import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('changePage', [
      state('open', style({
        height: '100%',
      })),
      state('closed', style({
        height: '20%',
      })),
      transition('open => closed', [
        animate('0.4s')
      ])
    ]),
  ],
})
export class HomeComponent {
  hasEnter = false;

  enter() {
    this.hasEnter = true;
  }
}
