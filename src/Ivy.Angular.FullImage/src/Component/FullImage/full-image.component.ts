declare var require: any;

import { Component, Input, OnInit } from '@angular/core';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { ValidationHelper } from 'ivy.angular.value-helpers';

@Component({
    selector: 'ivy-full-image',
    templateUrl: './full-image.component.html'
})
export class FullImageComponent implements OnInit {

    @Input() src: string;

    safeSrc: SafeUrl;

    isLoaded: boolean = false;

    constructor(
        private sanitizer: DomSanitizer,
        private validationHelper: ValidationHelper) {
    }


    ngOnInit(): void {

        this.validationHelper.stringIsNotNullOrEmpty(this.src,
            'FullImageComponent must have a src before the component has been initialized!');

        this.safeSrc = this.sanitizer.bypassSecurityTrustUrl(this.src);
    }

    setLoaded(): void {
        this.isLoaded = true;
    }
}