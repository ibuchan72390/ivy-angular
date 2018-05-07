'use strict';

// Angular
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImgFlipBookComponent } from './src/Components/ImgFlipBook/img-flip-book.component';

import { TurnOptionGeneratorService } from './src/Services/turn-option-generator.service';
import { TurnElementInvokerService } from './src/Services/turn-element-invoker.service';

// Service Collection
let imports: any[] = [
    CommonModule
];

let providers: any[] = [
    TurnOptionGeneratorService,
    TurnElementInvokerService
];

let declarations: any[] = [
    ImgFlipBookComponent
];

// NgModule
@NgModule({
    imports: imports,
    providers: providers,
    declarations: declarations,
    exports: declarations
})
export class IvyAngularTurnJsModule {

    static forRoot(): ModuleWithProviders {

        return {
            ngModule: IvyAngularTurnJsModule,
            providers: providers
        }
    }
}