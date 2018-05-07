'use strict';

// Angular
import { NgModule, ModuleWithProviders } from '@angular/core';

import { YouTubeComponent } from './src/Components/YouTube/you-tube.component';

// Service Collection
let imports: any[] = [
];

let providers: any[] = [
];

let declarations: any[] = [
    YouTubeComponent
];

// NgModule
@NgModule({
    imports: imports,
    providers: providers,
    declarations: declarations,
    exports: declarations
})
export class IvyAngularYouTubeModule {
}