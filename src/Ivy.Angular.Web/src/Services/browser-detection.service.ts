import { Injectable } from '@angular/core';

import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable()
export class BrowserDetectionService {

    constructor(
        private deviceSvc: DeviceDetectorService) {
    }

    isFirefox(): boolean {
        return this.testBrowser('firefox');
    }

    isChrome(): boolean {
        return this.testBrowser('chrome');
    }

    isSafari(): boolean {
        // This is untested
        return this.testBrowser('safari');
    }

    isInternetExplorer(): boolean {
        // This is untested - ie won't run their test
        return this.testBrowser('ms-ie');
    }

    isEdge(): boolean {
        return this.testBrowser('ms-edge');
    }

    isOpera(): boolean {
        return this.testBrowser('opera');
    }

    isOther(): boolean {
        return !this.isFirefox() &&
            !this.isChrome &&
            !this.isSafari() &&
            !this.isInternetExplorer() &&
            !this.isEdge() &&
            !this.isOpera();

    }

    private testBrowser(browser: string): boolean {

        return this.deviceSvc.browser.toLowerCase() == browser.toLowerCase();
    }
}