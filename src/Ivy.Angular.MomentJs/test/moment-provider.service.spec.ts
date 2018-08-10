import 'jasmine';

import { TestBed } from '@angular/core/testing';

import { IvyAngularMomentJsModule } from '../ivy.angular.moment-js.module';

import { MomentProviderService } from '../src/Services/moment-provider.service';

describe('MomentProviderService', () => {

    // Variables
    let sut: MomentProviderService;


    // Setup
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                IvyAngularMomentJsModule
            ]
        });

        sut = TestBed.get(MomentProviderService);
    });


    // Tests
    describe('getMomentDate', () => {

        it('getMomentDate executes as expected with both parameters', () => {

            let date = new Date();
            let format = 'MM-DD-YYYY';

            var result = sut.getMomentDate(date, format);

            // Going to string is the only way to ensure proper equality matching
            let resultDateString = result.toDate().toString();
            let dateString = date.toString();

            expect(resultDateString).toBe(dateString);
        });

        it('getMomentDate executes as expected with date parameter', () => {

            let date = new Date();

            var result = sut.getMomentDate(date);

            // Going to string is the only way to ensure proper equality matching
            let resultDateString = result.toDate().toString();
            let dateString = date.toString();

            expect(resultDateString).toBe(dateString);
        });

        it('getMomentDate executes as expected with no parameters', () => {

            var result = sut.getMomentDate();

            // This is potentially flawed; however, I'm guessing it will be fine
            // As long as runtime is less than 1 second, I think we'll be fine
            var resultString = result.toDate().toString();
            var dateString = new Date().toString();

            expect(resultString).toBe(dateString);
        });
    });

});