declare var require: any;

import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

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
export class ImgFlipBookComponent implements AfterViewInit, OnInit {

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

    massagedSources: SafeResourceUrl[] = null;


    constructor(
        private sanitizer: DomSanitizer,
        private optionsGen: TurnOptionGeneratorService,
        private turnInvoker: TurnElementInvokerService) {
    }

    ngOnInit(): void {
        this.massagedSources = this.imgSources
            .map(imgUrl => this.sanitizer.bypassSecurityTrustResourceUrl(imgUrl));
    }

    ngAfterViewInit(): void {

        let opts = this.optionsGen.generateTurnOptions(
            this.flipbookContainerElem.nativeElement.clientWidth,
            this.maxPxWidth, this.imgHeightToWidthRatio, this.optionsOverrides);

        this.turnInvoker.invokeTurn(this.flipbookElem, opts);
    }

    ready(): boolean {
        return this.massagedSources != null;
    }
}