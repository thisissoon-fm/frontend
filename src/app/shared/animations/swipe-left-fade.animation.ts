import { trigger, transition, style, animate, state, query, stagger } from '@angular/animations';

export const swipeLeftFadeAnimation = trigger('swipeLeftFade', [
  transition('* => in', [
    state('out', style({display: 'none'})),

    query('.swipe-left-fade', style({ opacity: 0, transform: 'translateX(40px)' })),

    query('.swipe-left-fade', stagger(75, [
      animate('.4s .2s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
    ])),

    query('.swipe-left-fade', [
      animate(1000, style('*'))
    ])
  ]),

  transition('* => out', [
    query('.swipe-left-fade', style({ opacity: 1, transform: 'translateX(0)' })),

    query('.swipe-left-fade', stagger(75, [
      animate('.4s ease-out', style({ opacity: 0, transform: 'translateX(40px)' })),
    ])),
  ])
]);
