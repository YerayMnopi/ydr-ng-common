import {
    trigger,
    style,
    animate,
    transition,
    query,
    animateChild,
    group
  } from '@angular/animations';

export const fallOutAnimation = [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%'
    })
  ], { optional: true }),
  query(':enter', [
    style({ top: '-100%' })
  ], { optional: true }),
  query(':leave', animateChild(), { optional: true }),
  group([
    query(':leave', [
      animate('300ms ease-out',
      style({ top: '100%' })),
    ], { optional: true }),
    query(':enter', [
      animate('300ms ease-out', style({ top: '0' }))
    ], { optional: true })
  ]),
  query(':enter', animateChild(), { optional: true }),
];