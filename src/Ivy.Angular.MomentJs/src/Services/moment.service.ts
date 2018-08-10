import { Injectable } from '@angular/core';

import { MomentProviderService } from './moment-provider.service';

@Injectable()
export class MomentService {

    // This will ensure the MomentJS filters are properly setup for the correct language
    // We want the moment language to properly match the user's text language
    // GitHub Post: https://github.com/moment/moment/issues/2608#issuecomment-235534993
    // GitHub Moment Locales: https://github.com/moment/moment/tree/develop/locale

    // We're also going to want to set the Locale in Angular Material
    // Currently, Angular Material is bound to MomentJS via the MatMomentDateModule addition in my-angular-materials.module.ts
    // As such, when we adjust the date on our MomentJS Library, then we need to also adjust it on the Material DateAdapter
    // https://material.angular.io/components/datepicker/overview#setting-the-locale-code

    constructor(
        private momentProvider: MomentProviderService) {
    }


    guessMyTimezone(): string {

        // Find the user's current timezone string via the moment-timezone library
        // https://momentjs.com/timezone/docs/#/using-timezones/guessing-user-timezone/

        let momentTz = this.momentProvider.getMomentTz();

        return momentTz.tz.guess();
    }

    changeToMyGuessTimezone(date: Date): any {

        let tz = this.guessMyTimezone();
        let momentDate = this.momentProvider.getMomentDate(date);
        return this.changeToTimezone(momentDate, tz);
    }

    changeToTimezone(date: Date, timezone: string): any {

        let momentTz = this.momentProvider.getMomentTz();

        return momentTz.tz(date, timezone);
    }

    getTimeSpanDiff(from: Date, to: Date): string {

        const format: string = 'DD/MM/YYYY HH:mm:ss';

        let momentBegin = this.momentProvider.getMomentDate(from, format);
        let momentEnd = this.momentProvider.getMomentDate(to, format);

        let ms = momentBegin.diff(momentEnd);

        let moment = this.momentProvider.getMoment();

        let d = moment.duration(ms);
        return d.minutes() + ':' + d.seconds();
    }
}