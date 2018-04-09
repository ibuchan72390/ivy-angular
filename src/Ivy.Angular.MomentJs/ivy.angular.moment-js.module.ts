'use strict';

// Angular
import { NgModule, ModuleWithProviders } from '@angular/core';

import { CommonModule } from '@angular/common';

import { MomentTimezoneModule } from 'angular-moment-timezone';
import { MomentModule } from 'angular2-moment';

import { MomentProviderService } from './src/Services/moment-provider.service';
import { MomentService } from './src/Services/moment.service';

import { IvyAngularUtcServerDateDisplayComponent } from './src/Components/UtcServerDateDisplay/utc-server-date-display.component';
import { IvyAngularUtcServerDateTimeDisplayComponent } from './src/Components/UtcServerDateTimeDisplay/utc-server-date-time-display.component';

import { IvyAngularMomentTimezonePipe } from './src/Pipes/moment-timezone.pipe';

// Service Collection
let imports: any[] = [
    CommonModule,
    MomentModule,
    MomentTimezoneModule
];

let providers: any[] = [
    MomentProviderService,
    MomentService
];

let declarations: any[] = [
    IvyAngularUtcServerDateDisplayComponent,
    IvyAngularUtcServerDateTimeDisplayComponent,
    IvyAngularMomentTimezonePipe
];

// NgModule
@NgModule({
    imports: imports,
    providers: providers,
    declarations: declarations,
    exports: declarations
})
export class IvyAngularMomentJsModule {

    // Are we going to need this???
    // I THINK so because we mix components with providers
    // This registers providers at root with components at shared
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: IvyAngularMomentJsModule,
            providers: providers
        };
    }
}