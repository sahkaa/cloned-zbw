import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const topbarState: AnimationTriggerMetadata = trigger('topbarState', [
  state('open', style({
    width: '175px'
  })),
  state('closed', style({
    width: '48px'
  })),
  transition('open => closed', animate('300ms ease-out')),
  transition('closed => open', animate('300ms ease-out'))
]);

export const logoState: AnimationTriggerMetadata = trigger('logoState', [
  state('visible', style({opacity: '1'})),
  transition(':enter', [
    style({opacity: '0'}),
    animate('250ms 50ms ease-out')
  ])
]);

export const sidebarState: AnimationTriggerMetadata = trigger('sidebarState', [
  state('expanded', style({transform: 'translateX(0)'})),
  transition(':enter', [
    style({transform: 'translateX(-185px)'}),
    animate('300ms ease-out')
  ]),
  transition(':leave', [
    animate('300ms ease-out', style({transform: 'translateX(-100%)'}))
  ])
]);

export const overlayState: AnimationTriggerMetadata = trigger('overlayState', [
  state('visible', style({opacity: 0.7})),
  transition(':enter', [
    style({opacity: 0}),
    animate('300ms ease-out')
  ]),
  transition(':leave', [
    animate('300ms ease-out', style({opacity: 0}))
  ])
]);
