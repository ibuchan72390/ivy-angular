declare var require: any;

import { Component, Input, ViewChild, ElementRef } from '@angular/core';

import * as $ from 'jquery';
import { TurnOptionGeneratorService } from '../../Services/turn-option-generator.service';
import { TurnElementInvokerService } from '../../Services/turn-element-invoker.service';

@Component({
    selector: 'ivy-img-flip-book',
    templateUrl: './img-flip-book.component.html',
    styles: [`

#flipbookElem div {
    background-color: white;
}

#flipbookElem {
    margin-left: auto;
    margin-right: auto;
}

`]
})
export class ImgFlipBookComponent {

    @ViewChild('flipbook')
    flipbookElem: ElementRef;

    @ViewChild('flipbookContainer')
    flipbookContainerElem: ElementRef;

    @Input()
    maxPxWidth: number;

    @Input()
    imgHeightToWidthRatio: number;

    @Input()
    optionsOverrides: object;

    @Input()
    imgSources: string[];


    constructor(
        private optionsGen: TurnOptionGeneratorService,
        private turnInvoker: TurnElementInvokerService) {
    }


    ngAfterViewInit(): void {

        let opts = this.optionsGen.generateTurnOptions(
            this.flipbookContainerElem.nativeElement.clientWidth,
            this.maxPxWidth, this.imgHeightToWidthRatio, this.optionsOverrides);

        this.turnInvoker.invokeTurn(this.flipbookElem, opts);
    }
}