'use strict';

// Angular
import { NgModule, ModuleWithProviders } from '@angular/core';

import { TickerTapeComponent } from './src/Components/TickerTape/ticker-tape.component';

import { TickerTapeTextService } from './src/Services/ticker-tape-text.service';
import { TickerTapeSubscriptionProvider } from './src/Services/ticker-tape-subscription-provider.service';

// Service Collection
let imports: any[] = [
];

let providers: any[] = [
    TickerTapeTextService,
    TickerTapeSubscriptionProvider
];

let declarations: any[] = [
    TickerTapeComponent
];

// NgModule
@NgModule({
    imports: imports,
    providers: providers,
    declarations: declarations,
    exports: declarations
})
export class IvyAngularTickerTapeModule {

    static forRoot(): ModuleWithProviders {

        return {
            providers: providers,
            ngModule: IvyAngularTickerTapeModule
        };
    }
}