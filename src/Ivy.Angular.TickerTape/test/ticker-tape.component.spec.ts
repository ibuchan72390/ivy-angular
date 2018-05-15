import 'jasmine';

import { TestBed, ComponentFixture } from '@angular/core/testing';

import { Observable, Observer, Subscription } from 'rxjs';

import { IvyAngularTickerTapeModule } from '../ivy.angular.ticker-tape.module';

import { TickerTapeComponent } from '../src/Components/TickerTape/ticker-tape.component';

import { TickerTapeSubscriptionProvider } from '../src/Services/ticker-tape-subscription-provider.service';
import { TickerTapeTextService } from '../src/Services/ticker-tape-text.service';

describe('TickerTapeComponent', () => {

    // Variables
    let fixture: ComponentFixture<TickerTapeComponent>;

    let sut: TickerTapeComponent;

    let rxProvider: TickerTapeSubscriptionProvider;

    const text = 'input text';
    const tickMs = 1000;
    const charLen = 10;


    // Setup
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                IvyAngularTickerTapeModule
            ]
        });

        fixture = TestBed.createComponent(TickerTapeComponent);
        sut = fixture.componentInstance;

        sut.text = text;
        sut.tickMs = tickMs;
        sut.charLength = charLen;

        rxProvider = TestBed.get(TickerTapeSubscriptionProvider);
    });


    // Tests
    it('component initializes as expected', () => {

        const tickerText = 'tickerText';

        let extObserver: Observer<string>;
        let tickerTapeRx = Observable.create((observer: Observer<string>) => extObserver = observer);

        spyOn(rxProvider, 'getTickerTapeSubscription').and.returnValue(tickerTapeRx);

        fixture.detectChanges();

        expect(rxProvider.getTickerTapeSubscription).toHaveBeenCalledTimes(1);
        expect(rxProvider.getTickerTapeSubscription).toHaveBeenCalledWith(text, charLen, tickMs);

        let emit1 = 'test1';
        extObserver.next(emit1);

        // Need to let the view process the new displayText
        fixture.detectChanges();

        expect(sut.displayText).toBe(emit1);
        expect(fixture.debugElement.nativeElement.innerText.indexOf(emit1) > -1).toBeTruthy();


        let emit2 = 'test123';
        extObserver.next(emit2);

        fixture.detectChanges();

        expect(sut.displayText).toBe(emit2);
        expect(fixture.debugElement.nativeElement.innerText.indexOf(emit2) > -1).toBeTruthy();
    });

    it('component destroys as expected', () => {

        const tickerText = 'tickerText';

        let rx = jasmine.createSpyObj<Subscription>(['unsubscribe']);

        let mockRx = jasmine.createSpyObj<Observable<string>>({
            'subscribe': rx
        });

        spyOn(rxProvider, 'getTickerTapeSubscription').and.returnValue(mockRx);

        fixture.detectChanges();

        expect(rxProvider.getTickerTapeSubscription).toHaveBeenCalledTimes(1);
        expect(rxProvider.getTickerTapeSubscription).toHaveBeenCalledWith(text, charLen, tickMs);

        expect(mockRx.subscribe).toHaveBeenCalledTimes(1);
        expect(rx.unsubscribe).toHaveBeenCalledTimes(0);

        sut.ngOnDestroy();

        expect(rx.unsubscribe).toHaveBeenCalledTimes(1);
    });
});