import 'jasmine';

import { TestBed, ComponentFixture } from '@angular/core/testing';

import { IvyWebModule } from 'ivy.angular.web';

import { IvyAngularVideoPlayerModule } from '../ivy.angular.video-player.module';

import { VideoPlayerComponent } from '../src/Components/VideoPlayer/video-player.component';

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
            expect(vidSrc.type).toBe('video/mp4');

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
        sut.onLoadEvent.subscribe(result => loadEvent = result);

        let videoElem = fixture.nativeElement.querySelector('video');
        videoElem.dispatchEvent('loadeddata');
    });

    it('VgPlayer bubbles onPlayerReady event through the component', () => {

        
    });

    //it('Video element properly integrates the MacMobileAutoplayDirective', () => {

    //});
});