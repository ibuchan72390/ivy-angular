import 'jasmine';

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { IvyWebModule } from 'ivy.angular.web';

import { IvyAngularVideoPlayerModule } from '../ivy.angular.video-player.module';

import { VideoPlayerComponent } from '../src/Components/VideoPlayer/video-player.component';
import { MacMobileAutoPlayDirective } from '../src/Directives/mac-mobile-autoplay.directive';

describe('VideoPlayerComponent', () => {

    // Variables
    let fixture: ComponentFixture<VideoPlayerComponent>;
    let sut: VideoPlayerComponent;


    // Setup
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                IvyWebModule,
                IvyAngularVideoPlayerModule
            ]
        });

        fixture = TestBed.createComponent(VideoPlayerComponent);
        sut = fixture.componentInstance;
    });


    // Tests
    it('Video renders input sources as source elements', () => {

        let sources = [
            'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
            'http://clips.vorwaerts-gmbh.de/VfE.webm',
            'http://clips.vorwaerts-gmbh.de/VfE.ogv'
        ];

        sut.sources = sources;

        fixture.detectChanges();

        let videoElem = fixture.nativeElement.querySelector('video');

        console.log(videoElem);

        for (var i = 0; i < videoElem.children.length; i++) {
            let vidSrc = videoElem.children[i];

            // Eventually this should be the VideoSource.Type
            // Need to go after attributes because PhantomJS doesn't understand vidSrc.type
            expect(vidSrc.attributes['type'].value).toBe('video/mp4');

            sources.splice(vidSrc.src, 1);
        }

        expect(sources.length).toBe(0);
    });

    it('Video bubbles loadeddata event through the component', () => {

        let sources = [
            'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
        ];

        sut.sources = sources;

        fixture.detectChanges();

        let loadEvent: any;
        sut.onLoad.subscribe((emit: any) => loadEvent = emit);

        let videoElem = fixture.nativeElement.querySelector('video');

        let emitEvent = new Event('loadeddata');
        videoElem.dispatchEvent(emitEvent);

        expect(loadEvent).toBe(emitEvent);
    });

    it('VgPlayer bubbles onPlayerReady event through the component', () => {

        let sources = [
            'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
        ];

        sut.sources = sources;

        fixture.detectChanges();

        let loadEvent: any;
        sut.onReady.subscribe((emit: any) => loadEvent = emit);

        let videoElem = fixture.nativeElement.querySelector('vg-player');

        let emitEvent = new Event('onPlayerReady');
        videoElem.dispatchEvent(emitEvent);

        expect(loadEvent).toBe(emitEvent);
    });

    it('Video element properly integrates the MacMobileAutoplayDirective', () => {

        let dirElem = fixture.debugElement.query(By.directive(MacMobileAutoPlayDirective));

        expect(dirElem).not.toBe(null);
        expect(dirElem.name).toBe('video');
    });
});