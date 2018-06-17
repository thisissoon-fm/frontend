import {
  trigger,
  transition,
  style,
  animate,
  query
} from '@angular/animations';

export const routeAnimation = trigger('routeAnimation', [
  transition('* <=> *', [
    query(':enter', style({ opacity: 0 }), { optional: true }),
    query(
      ':leave',
      [
        style({ opacity: 1 }),
        animate('.4s linear', style({ opacity: 0 })),
        style({ display: 'none' })
      ],
      { optional: true }
    ),
    query(':enter', [animate('.4s linear', style({ opacity: 1 }))], {
      optional: true
    })
  ])
]);
