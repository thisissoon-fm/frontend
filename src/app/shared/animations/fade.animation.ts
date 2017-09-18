import {
  trigger, transition, style, animate,
  state, query, group, stagger, keyframes
} from '@angular/animations';

export const fadeAnimation = trigger('fade', [
  state('void', style({ opacity: 0 })),
  state('in', style({ opacity: 1 })),
  state('out', style({ opacity: 0 })),
  transition('* => in', [
    animate('350ms ease-out', style({ opacity: 1 }))
  ]),
  transition('* => out', [
    animate('350ms ease-out', style({ opacity: 0 }))
  ])
]);
