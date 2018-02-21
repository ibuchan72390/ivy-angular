﻿'use strict';

// Angular
import { NgModule, ModuleWithProviders } from '@angular/core';

// Ng2DeviceDetector
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';

import { OsDetectionService } from './Detection/os-detection.service';
import { BrowserDetectionService } from './Detection/browser-detection.service';
import { WindowRefService } from './Reference/window-ref.service';

// Service Collection
let providers: any[] = [
    OsDetectionService,
    BrowserDetectionService,
    WindowRefService
];

// NgModule
@NgModule({

    providers: providers,

    imports: [
        Ng2DeviceDetectorModule.forRoot()
    ]
})
export class IvyWebModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: IvyWebModule,
            providers: providers
        };
    }
}