'use strict';

// Angular
import { NgModule, ModuleWithProviders } from '@angular/core';

// Pipes
import { IvyAngularCapitalizeFirstLetterPipe } from './src/Pipes/capitalize-first-letter.pipe';
import { IvyAngularCharLimitPipe } from './src/Pipes/char-limit.pipe';

// Service Collection
let imports: any[] = [
];

let providers: any[] = [
];

let declarations: any[] = [
    IvyAngularCapitalizeFirstLetterPipe,
    IvyAngularCharLimitPipe
];

// NgModule
@NgModule({
    imports: imports,
    providers: providers,
    declarations: declarations,
    exports: declarations
})
export class IvyAngularPipesModule {
}