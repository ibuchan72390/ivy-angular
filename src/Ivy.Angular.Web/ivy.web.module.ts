'use strict';

// Angular
import { NgModule, ModuleWithProviders } from '@angular/core';

// Ng2DeviceDetector
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';

import { OsDetectionService } from './src/Services/os-detection.service';
import { BrowserDetectionService } from './src/Services/browser-detection.service';
import { WindowRefService } from './src/Services/window-ref.service';
import { MobileDetectionService } from './src/Services/mobile-detection.service';
import { WindowManipulationService } from './src/Services/window-manipulation.service';

// Service Collection
let imports: any[] = [
    Ng2DeviceDetectorModule.forRoot()
];

let providers: any[] = [
    OsDetectionService,
    BrowserDetectionService,
    WindowRefService,
    MobileDetectionService,
    WindowManipulationService
];

// NgModule
@NgModule({
    imports: imports,
    providers: providers
})
export class IvyWebModule {
}