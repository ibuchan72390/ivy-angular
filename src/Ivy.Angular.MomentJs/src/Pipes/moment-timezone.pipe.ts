
/*
 * This will act as a replacement for the angular-moment-timezone package
 * It appears that with the upgrade to Angular 5.0, this no longer works.
 *
 * We already have the moment.service.ts to wrap up some custom MomentJS functionality.
 * If we add a new function that is capable of converting a date to a TimeZone, then we
 * can simply re-apply this in the filter.
 */

import { Pipe, PipeTransform } from "@angular/core";
import { MomentService } from '../Services/moment.service';

@Pipe({ name: 'ivyMomentTz' })
export class IvyAngularMomentTimezonePipe implements PipeTransform {

    constructor(
        private momentSvc: MomentService) {
    }

    transform(value: Date, tz: string): Date {

        if (!value) return value;
        
        return this.momentSvc.changeToTimezone(value, tz);
    }
}