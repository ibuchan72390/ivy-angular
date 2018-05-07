import 'jasmine';

import { TestBed, ComponentFixture } from '@angular/core/testing';

import { IvyAngularYouTubeModule } from '../ivy.angular.you-tube.module';

import { YouTubeComponent } from '../src/Components/YouTube/you-tube.component';

/*
 * We can probably write some more tests on this guy, I'm just not 100% sure where to go with it.
 * It seems that we should probably test some style assignments and what not; however, I'm just 
 * going to keep the test case super simple for now.
 */
describe('YouTubeComponent', () => {

    // Variables
    let fixture: ComponentFixture<YouTubeComponent>;
    let sut: YouTubeComponent;


    // Setup
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                IvyAngularYouTubeModule
            ]
        });

        fixture = TestBed.createComponent(YouTubeComponent);
        sut = fixture.componentInstance;
    });


    // Tests
    it('subsequent calls to getUrl return the same value unless input has changed', () => {

        sut.url = 'http://www.google.com';

        let result1 = sut.getUrl();

        expect(result1).toBe(sut.getUrl());
        expect(result1).toBe(sut.getUrl());

        sut.url = 'http://www.youtube.com';

        let result2 = sut.getUrl();

        expect(result1).not.toBe(result2);
        expect(result2).toBe(sut.getUrl());
        expect(result2).toBe(sut.getUrl());
    });
});