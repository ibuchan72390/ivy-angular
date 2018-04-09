'use strict';

// Angular
import { NgModule, ModuleWithProviders } from '@angular/core';

import { LocalStorageService } from './src/Services/local-storage.service';
import { LocalStorageProviderService } from './src/Services/local-storage-provider.service';

// Service Collection
let imports: any[] = [
];

let providers: any[] = [
    LocalStorageService,
    LocalStorageProviderService
];

let declarations: any[] = [

];

// NgModule
@NgModule({
    imports: imports,
    providers: providers,
    declarations: declarations,
    exports: declarations
})
export class IvyAngularLocalStorageModule {
}