declare var require: any;

import { Component, Input, OnInit } from '@angular/core';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { ValidationHelper } from 'ivy.angular.value-helpers';

@Component({
    selector: 'ivy-full-image',
    templateUrl: './full-image.component.html',
    styleUrls: [
        `./full-image.component.css`
    ]
})
export class FullImageComponent implements OnInit {

    @Input() src: string;
    @Input() widthOverride: string;

    safeSrc: SafeUrl;

    constructor(
        private sanitizer: DomSanitizer,
        private validationHelper: ValidationHelper) {
    }

    getWidthOverride(): string {

        if (this.widthOverride)
            return this.widthOverride;

        return '98%';
    }

    ngOnInit(): void {

        this.validationHelper.stringIsNotNullOrEmpty(this.src,
            'FullImageComponent must have a src before the component has been initialized!');

        this.safeSrc = this.sanitizer.bypassSecurityTrustUrl(this.src);
    }
}