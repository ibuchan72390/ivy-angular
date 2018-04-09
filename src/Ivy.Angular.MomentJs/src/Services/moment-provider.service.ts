import { Injectable } from '@angular/core';

import * as momentTz from 'moment-timezone';
import * as moment from 'moment';

/**
 * This will allow us to Mock out the Moment libraries so that we can properly test them
 * Otherwise, we would not be able to properly spy on the Moment methods and properties without it.
 */

@Injectable()
export class MomentProviderService {

    getMoment(): any {
        return moment;
    }

    getMomentTz(): any {
        return momentTz;
    }

    getMomentDate(date: Date, format: string): any {
        return moment(date, format);
    }
}