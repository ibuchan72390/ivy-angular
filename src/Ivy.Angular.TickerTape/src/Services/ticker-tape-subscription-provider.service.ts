import { Injectable } from '@angular/core';

import { interval, Observable } from 'rxjs';

import { TickerTapeTextService } from './ticker-tape-text.service';

@Injectable()
export class TickerTapeSubscriptionProvider {

    constructor(
        private tickTextSvc: TickerTapeTextService) {

    }

    getTickerTapeSubscription(tickText: string, charLen: number, tickMs: number): Observable<string> {

        let adjustedText = this.tickTextSvc.prepareTickerText(tickText, charLen);

        return Observable.create((observer: any) => {

            interval(tickMs).subscribe(
                (tick: number) => {

                    let newText = this.tickTextSvc.getText(
                        adjustedText, charLen, tick);

                    observer.next(newText);
                }
            );
        })
    }
}