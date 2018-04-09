import { trigger, state, transition, animate, style, AnimationTriggerMetadata } from '@angular/animations';

export class AnimationHelper {

    static genCollapse(key: string, speedInMs: number): AnimationTriggerMetadata {

        return trigger(key, [
            state('0', style({ height: '0px' })),
            state('1', style({ height: '*' })),
            transition('0 => 1', animate(speedInMs + 'ms ease-in')),
            transition('1 => 0', animate(speedInMs + 'ms ease-out'))
        ]);
    }

    static genSlideLeft(key: string, speedInMs: number): AnimationTriggerMetadata {

        return trigger(key, [
            state('0', style({ transform: 'translate3d(0, 0, 0)' })),
            state('1', style({ transform: 'translate3d(-1000%, 0, 0)' })),
            transition('0 => 1', animate(speedInMs + 'ms ease-in')),
            transition('1 => 0', animate(speedInMs + 'ms ease-out'))
        ]);
    }

    static genSlideLeftHide(key: string, speedInMs: number): AnimationTriggerMetadata {

        return trigger(key, [
            state('0', style({ transform: 'translate3d(0, 0, 0)', display: '' })),
            state('1', style({ transform: 'translate3d(-1000%, 0, 0)', display: 'none' })),
            transition('0 => 1', animate(speedInMs + 'ms ease-in')),
            transition('1 => 0', animate(speedInMs + 'ms ease-out'))
        ]);
    }

    static genSlideRight(key: string, speedInMs: number): AnimationTriggerMetadata {

        return trigger(key, [
            state('0', style({ right: 'translate3d(0, 0, 0)' })),
            state('1', style({ right: 'translate3d(1000%, 0, 0)' })),
            transition('0 => 1', animate(speedInMs + 'ms ease-in')),
            transition('1 => 0', animate(speedInMs + 'ms ease-out'))
        ]);
    }

    static genSlideRightHide(key: string, speedInMs: number): AnimationTriggerMetadata {

        return trigger(key, [
            state('0', style({ right: 'translate3d(0, 0, 0)', display: ''  })),
            state('1', style({ right: 'translate3d(1000%, 0, 0)', display: 'none'  })),
            transition('0 => 1', animate(speedInMs + 'ms ease-in')),
            transition('1 => 0', animate(speedInMs + 'ms ease-out'))
        ]);
    }
}