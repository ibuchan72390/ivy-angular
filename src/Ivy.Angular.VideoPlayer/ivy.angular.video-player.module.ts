'use strict';

// Angular
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';

import { VideoPlayerComponent } from './src/Components/VideoPlayer/video-player.component';
import { MacMobileAutoPlayDirective } from './src/Directives/mac-mobile-autoplay.directive';

// Service Collection
let imports: any[] = [

    CommonModule,

    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,

    FlexLayoutModule
];

let providers: any[] = [
];

let declarations: any[] = [
    VideoPlayerComponent,
    MacMobileAutoPlayDirective
];

// NgModule
@NgModule({
    imports: imports,
    providers: providers,
    declarations: declarations,
    exports: declarations
})
export class IvyAngularVideoPlayerModule {
}