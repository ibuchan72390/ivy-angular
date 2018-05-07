import { Injectable, ElementRef } from '@angular/core';

import * as $ from 'jquery';

/**
 * There's no way I can really test this unless we can find some way to test JQuery
 * None of that really makes sense, so we abstract this to a service for mocking purposes.
 */
@Injectable()
export class TurnElementInvokerService {

    invokeTurn(turnElement: ElementRef, turnOptions: any): void {
        
        // Need to reference this as an "any" instead of a JQuery Collection
        // This way, we can invoke the turn extension method without issue.
        let flipbookElems: any = $(turnElement.nativeElement) as any;

        if (!flipbookElems.turn) {
            throw 'JQuery turn extension is not found!  Please ensure you are including the Turn.JS Library in your package!';
        }

        flipbookElems.turn(turnOptions);
    }
}