import { trigger, transition, style, animate, state } from '@angular/animations';

export const fadeAnimation = trigger('fade', [
  state('void', style({ opacity: 0 })),
  state('in', style({ opacity: 1 })),
  state('out', style({ opacity: 0 })),
  transition('* => in', [
    style({ opacity: 0 }),
    animate('.4s linear', style({ opacity: 1 }))
  ]),
  transition('* => out', [
    style({ opacity: 1 }),
    animate('.4s linear', style({ opacity: 0 }))
  ])
]);
