import { Injectable } from '@angular/core';

import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable()
export class MobileDetectionService {

    constructor(
        private deviceSvc: DeviceDetectorService) {
    }


    isMobile(): boolean {
        return this.testUserAgent(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/);
    }

    isChromeUndefined(): boolean {
        return this.testUserAgent(/Chrome/);
    }

    isDesktop(): boolean {

        if (this.isMobile()) return false;

        if (this.isChromeUndefined()) return false;

        return true;
    }


    private testUserAgent(caseMatch: RegExp): boolean {

        return caseMatch.test(this.deviceSvc.userAgent);
    }
}