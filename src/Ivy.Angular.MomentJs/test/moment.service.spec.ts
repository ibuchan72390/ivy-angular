import 'jasmine';

import { TestBed } from '@angular/core/testing';

import { MomentService } from '../src/Services/moment.service';
import { MomentProviderService } from '../src/Services/moment-provider.service';

import { IvyAngularMomentJsModule } from '../ivy.angular.moment-js.module';

describe('MomentService', () => {

    // Variables
    let sut: MomentService;
    let providerSvc: MomentProviderService;


    // Setup
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                IvyAngularMomentJsModule
            ]
        });

        sut = TestBed.get(MomentService);
        providerSvc = TestBed.get(MomentProviderService);
    });


    // Test
    it('guessMyTimezone executes as expected', () => {

        const expected: string = 'result';

        let tzGuessSpy = jasmine.createSpy().and.returnValue(expected);;

        let momentSpy: any = {
            tz: {
                guess: tzGuessSpy
            }
        };

        spyOn(providerSvc, 'getMomentTz').and.returnValue(momentSpy);

        let result = sut.guessMyTimezone();

        expect(result).toBe(expected);
        expect(tzGuessSpy).toHaveBeenCalledTimes(1);
    });

    it('changeToTimezone executes as expected', () => {

        const expected: string = 'result';

        const date: Date = new Date();
        const timezone: string = 'tz';

        let tzChangeSpy = jasmine.createSpy().and.returnValue(expected);;

        let momentSpy: any = {
            tz: tzChangeSpy
        };

        spyOn(providerSvc, 'getMomentTz').and.returnValue(momentSpy);

        let result = sut.changeToTimezone(date, timezone);

        expect(result).toBe(expected);
        expect(tzChangeSpy).toHaveBeenCalledTimes(1);
        expect(tzChangeSpy).toHaveBeenCalledWith(date, timezone);
    });

    // Holy fucking mock test
    it('getTimeSpanDiff executes as expected', () => {

        const format: string = 'DD/MM/YYYY HH:mm:ss';

        const from: Date = new Date();
        const to: Date = new Date();

        const msDiff: number = 1000;

        const minResult: number = 30;
        const secondResult: number = 45;

        let expected: string = minResult + ':' + secondResult;

        let minuteFnSpy = jasmine.createSpy().and.returnValue(minResult);
        let secondFnSpy = jasmine.createSpy().and.returnValue(secondResult);

        let durationResultSpy = {
            minutes: minuteFnSpy,
            seconds: secondFnSpy
        };

        let durationFnSpy = jasmine.createSpy().and.returnValue(durationResultSpy);

        let momentLib = {
            duration: durationFnSpy
        };

        let momentBeginDiffSpy = jasmine.createSpy().and.returnValue(msDiff);
        let momentBeginSpy = {
            diff: momentBeginDiffSpy
        };

        let momentEndResult = {};

        let momentFromSpy = spyOn(providerSvc, 'getMomentDate').and.returnValues(momentBeginSpy, momentEndResult);

        spyOn(providerSvc, 'getMoment').and.returnValue(momentLib);

        let result = sut.getTimeSpanDiff(from, to);

        expect(result).toBe(minResult + ':' + secondResult)

        expect(momentFromSpy).toHaveBeenCalledTimes(2);
        expect(momentFromSpy).toHaveBeenCalledWith(from, format);
        expect(momentFromSpy).toHaveBeenCalledWith(to, format);

        expect(momentBeginDiffSpy).toHaveBeenCalledTimes(1);
        expect(momentBeginDiffSpy).toHaveBeenCalledWith(momentEndResult);

        expect(providerSvc.getMoment).toHaveBeenCalledTimes(1);

        expect(durationFnSpy).toHaveBeenCalledTimes(1);
        expect(durationFnSpy).toHaveBeenCalledWith(msDiff);

        expect(minuteFnSpy).toHaveBeenCalledTimes(1);
        expect(secondFnSpy).toHaveBeenCalledTimes(1);
    });
});