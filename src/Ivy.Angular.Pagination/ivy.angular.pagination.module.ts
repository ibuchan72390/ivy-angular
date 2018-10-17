'use strict';

// Angular
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { ScrollingLoadComponent } from './src/Components/ScrollingLoad/scrolling-load.component';

// Service Collection
let declarations: any[] = [
    ScrollingLoadComponent
];


// NgModule
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: declarations,
    exports: declarations
})
export class IvyAngularPaginationModule {
}