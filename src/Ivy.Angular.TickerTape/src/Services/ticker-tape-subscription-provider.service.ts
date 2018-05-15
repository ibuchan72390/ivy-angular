import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs';

import { TickerTapeTextService } from './ticker-tape-text.service';

@Injectable()
export class TickerTapeSubscriptionProvider {

    constructor(
        private tickTextSvc: TickerTapeTextService) {
        
    }

    getTickerTapeSubscription(tickText: string, charLen: number, tickMs: number): Observable<string> {

        let adjustedText = this.tickTextSvc.prepareTickerText(tickText, charLen);

        return Observable.create((observer: Observer<string>) => {

            Observable.interval(tickMs).subscribe(
                (tick: number) => {

                    let newText = this.tickTextSvc.getText(
                        adjustedText, charLen, tick);

                    observer.next(newText);
                }
            );
        })
    }
}