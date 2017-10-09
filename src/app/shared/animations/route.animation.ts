import { trigger, transition, style, animate, query } from '@angular/animations';

export const routeAnimation = trigger('routeAnimation', [
  transition('* <=> *', [
    query(':enter', style({opacity: 0}), {optional: true}),
    query(':leave', [
      style({opacity: 1}),
      animate('350ms ease-out', style({opacity: 0})),
      style({ display: 'none' })
    ], {optional: true}),
    query(':enter', [
      animate('350ms ease-out', style({opacity: 1}))
    ], {optional: true})
  ])
]);
