import 'jasmine';

import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { Observable, Subscription } from 'rxjs';

import { IvyAngularTickerTapeModule } from '../ivy.angular.ticker-tape.module';

import { TickerTapeSubscriptionProvider } from '../src/Services/ticker-tape-subscription-provider.service';
import { TickerTapeTextService } from '../src/Services/ticker-tape-text.service';

describe('TickerTapeSubscriptionProvider', () => {

    // Variables
    let sut: TickerTapeSubscriptionProvider;
    let tickTextSvc: TickerTapeTextService;


    // Setup
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                IvyAngularTickerTapeModule
            ]
        });

        sut = TestBed.get(TickerTapeSubscriptionProvider);
        tickTextSvc = TestBed.get(TickerTapeTextService);
    });


    // Tests
    it('getTickerTapeSubscription executes as expected', doneFn => {

        /**
         * This test WILL fail if you try to watch it or debug it
         * It is very sensitive and heavily depends on the 30ms runtime.
         */

        const tickText = 'Hello there, this is my test text';
        const charleng = 10;
        const tickMs = 200; // Caution, dropping this too low will cause test run problems

        const massagedText = 'massaged text';

        let val1 = 'test1';
        let val2 = 'test2';
        let val3 = 'test3';

        let emitCount = 0;

        spyOn(tickTextSvc, 'prepareTickerText').and.returnValue(massagedText);
        spyOn(tickTextSvc, 'getText').and.returnValues(val1, val2, val3);

        let tickerRx: Subscription = sut.getTickerTapeSubscription(tickText, charleng, tickMs).subscribe(
            result => {

                console.log('Entering subscription result');


                if (emitCount == 0) {

                    expect(result).toBe(val1);

                    expect(tickTextSvc.getText).toHaveBeenCalledWith(massagedText, charleng, emitCount);

                } else if (emitCount == 1) {

                    expect(result).toBe(val2);

                    expect(tickTextSvc.getText).toHaveBeenCalledWith(massagedText, charleng, emitCount);

                } else if (emitCount == 2) {

                    expect(result).toBe(val3);

                    expect(tickTextSvc.getText).toHaveBeenCalledWith(massagedText, charleng, emitCount);
                }

                emitCount++;

                expect(tickTextSvc.getText).toHaveBeenCalledTimes(emitCount);
                expect(tickTextSvc.prepareTickerText).toHaveBeenCalledTimes(1);
            }
        );

        // We'll make timeout as one more than the interval executions
        // This should ensure we don't run into any weird timing issues
        // Debugging this test is still pretty much impossible
        let waitTicks = tickMs + (tickMs / 2);
        setTimeout(() => doneFn(), waitTicks);
    });
});