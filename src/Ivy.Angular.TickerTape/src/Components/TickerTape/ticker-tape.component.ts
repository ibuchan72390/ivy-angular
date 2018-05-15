declare var require: any;

import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { TickerTapeTextService } from '../../Services/ticker-tape-text.service';
import { TickerTapeSubscriptionProvider } from '../../Services/ticker-tape-subscription-provider.service';

@Component({
    selector: 'ivy-ticker-tape',
    template: '{{displayText}}'
})
export class TickerTapeComponent implements OnInit, OnDestroy {

    // Variables
    private tickRx: Subscription
    private tickDist: number = 0;

    displayText: string;

    @Input()
    text: string;

    @Input()
    tickMs: number;

    @Input()
    charLength: number;


    // Constructor
    constructor(
        private tickTextSvc: TickerTapeTextService,
        private tickerRxProvider: TickerTapeSubscriptionProvider) {
    }


    // Methods
    ngOnInit(): void {

        // Let's add a space at the end so scroll through on a sentence doesn't cause it to touch
        this.tickRx = this.tickerRxProvider.getTickerTapeSubscription(
            this.text, this.charLength, this.tickMs)
            .subscribe(newText => this.displayText = newText);
    }

    ngOnDestroy(): void {

        this.tickRx.unsubscribe();
    }
}