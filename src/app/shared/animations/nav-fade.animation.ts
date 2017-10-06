import {
  trigger, transition, style, animate,
  state, query, stagger, keyframes
} from '@angular/animations';

export const navFadeAnimation = trigger('navFade', [
  state('void', style({ opacity: 0 })),
  state('in', style({ opacity: 1 })),
  state('out', style({ opacity: 0, display: 'none' })),
  transition('* => in', [
    query('.nav-item-animate', style({ opacity: 0 })),
    style({ opacity: 1, display: 'block' }),
    query('.nav-item-animate', stagger('100ms', [
      animate('350ms ease-out', keyframes([
        style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
        style({opacity: 1, transform: 'translateY(0)', offset: 1.0})
      ]))
    ]))
  ]),
  transition('* => out', [
    query('.nav-item-animate', stagger('100ms', [
      animate('350ms ease-out', keyframes([
        style({opacity: 1, transform: 'translateY(0)', offset: 0}),
        style({opacity: 0, transform: 'translateY(-75%)', offset: 1.0})
      ]))
    ]))
  ])
]);
