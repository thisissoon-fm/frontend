import {
  trigger, transition, style, animate,
  state, query, stagger, keyframes
} from '@angular/animations';

export const navFadeAnimation = trigger('navFade', [
  state('void', style({ opacity: 0 })),
  state('in', style({ opacity: 1 })),
  state('out', style({ opacity: 0, display: 'none' })),
  transition('* => in', [
    query('.nav-item-animate', style({ opacity: 0 }), { optional: true, limit: 10 }),
    style({ opacity: 1, display: 'block' }),
    query('.nav-item-animate', stagger(75, [
      animate('.4s .5s linear', style({opacity: 1}))
    ]), { optional: true, limit: 10 })
  ]),
  transition('* => out', [
    query('.nav-item-animate', stagger(75, [
      animate('.4s linear', style({opacity: 0}))
    ]), { optional: true, limit: 10 })
  ])
]);
