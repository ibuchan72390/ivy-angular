import 'jasmine';

import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { IvyWebModule } from 'ivy.angular.web';
import { IvyAngularVideoPlayerModule } from '../ivy.angular.video-player.module';

import { MacMobileAutoPlayDirective } from '../src/Directives/mac-mobile-autoplay.directive';

import { OsDetectionService } from 'ivy.angular.web';

describe('MacMobileAutoplayDirective', () => {

    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                IvyWebModule,
                IvyAngularVideoPlayerModule
            ],
            declarations: [
                TestComponent
            ]
        });
    });


    it('MacMobileAutoPlayDirective does not append autoplay if isMac returns false', () => {

        let osDetectorSpy: OsDetectionService = jasmine.createSpyObj('osDetector', { 'isMac': false });

        fixture = TestBed.overrideComponent(TestComponent, {
            set: {
                providers: [
                    { provide: OsDetectionService, useValue: osDetectorSpy }
                ]
            }
        }).createComponent(TestComponent);

        fixture.detectChanges();

        expect(osDetectorSpy.isMac).toHaveBeenCalledTimes(1);

        let directiveEl = fixture.debugElement.query(By.directive(MacMobileAutoPlayDirective));

        expect(directiveEl.nativeElement.attributes['autoplay']).toBe(undefined);
    });

    it('MacMobileAutoPlayDirective appends autoplay if isMac returns true', () => {

        let osDetectorSpy: OsDetectionService = jasmine.createSpyObj('osDetector', { 'isMac': true });

        fixture = TestBed.overrideComponent(TestComponent, {
            set: {
                providers: [
                    { provide: OsDetectionService, useValue: osDetectorSpy }
                ]
            }
        }).createComponent(TestComponent);

        fixture.detectChanges();

        expect(osDetectorSpy.isMac).toHaveBeenCalledTimes(1);

        let directiveEl = fixture.debugElement.query(By.directive(MacMobileAutoPlayDirective));

        expect(directiveEl.nativeElement.attributes['autoplay'].value).toBe('autoplay');
    });
});


@Component({
    selector: 'ivy-test-component',
    template: '<video mac-mobile-autoplay></video>'
})
export class TestComponent {
}