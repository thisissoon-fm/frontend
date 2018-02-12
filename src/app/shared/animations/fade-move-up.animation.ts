import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

export const fadeMoveUpAnimation = trigger('fadeMoveUp', [
  transition('* => *', [
    query(':leave', stagger(75, [
      style({opacity: 1, transform: 'translateY(0)'}),
      animate('.4s ease-out', style({opacity: 0, transform: 'translateY(75px)'}))
    ]), {optional: true, limit: 10}),

    query(':enter', style({ opacity: 0, transform: 'translateY(75px)' }), {optional: true}),

    query(':enter', stagger(75, [
      animate('.4s ease-out', style({opacity: 1, transform: 'translateY(0)'}))
    ]), {optional: true, limit: 10}),
  ])
]);
