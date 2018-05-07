declare var require: any;

import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'ivy-you-tube',
    templateUrl: './you-tube.component.html',
    styleUrls: [
        './you-tube.component.css'
    ]
})
export class YouTubeComponent {

    @Input()
    url: string;

    private initUrl: string;
    private modUrl: SafeResourceUrl;

    constructor(
        private sanitizer: DomSanitizer) {
    }

    // This should prevent us from repeatedly returning a new URL and causing a refresh pattern
    // At the same time, it should be able to adjust for changing @Input strings
    getUrl(): SafeResourceUrl {

        if (this.url != this.initUrl) {
            this.initUrl = this.url;
            this.modUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        }

        return this.modUrl;
    }
}