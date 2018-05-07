import { Injectable } from '@angular/core';

import { WindowRefService } from './window-ref.service';

@Injectable()
export class WindowManipulationService {

    constructor(
        private windowRefSvc: WindowRefService) {
    }

    scrollToTop(): void {

        this.windowRefSvc.nativeWindow.scrollTo(0, 0);
    }
}