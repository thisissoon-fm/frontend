import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

export const fadeMoveUpAnimation = trigger('fadeMoveUp', [
  transition('* => *', [
    query(':leave', stagger(200, [
      style({opacity: 1, transform: 'translateY(0)'}),
      animate('.35s ease-out', style({opacity: 0, transform: 'translateY(75px)'}))
    ]), {optional: true}),

    query(':enter', style({ opacity: 0, transform: 'translateY(75px)' }), {optional: true}),

    query(':enter', stagger(200, [
      animate('.35s ease-out', style({opacity: 1, transform: 'translateY(0)'}))
    ]), {optional: true}),
  ])
]);
