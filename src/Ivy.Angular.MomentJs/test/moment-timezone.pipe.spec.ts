import 'jasmine';

import { Component, Input } from '@angular/core';

import { TestBed, ComponentFixture } from '@angular/core/testing';

import { MomentService } from '../src/Services/moment.service';

import { IvyAngularMomentJsModule } from '../ivy.angular.moment-js.module'

describe('IvyAngularMomentTimezonePipe', () => {

    // Variables
    let fixture: ComponentFixture<PipeTestComponent>;
    let component: PipeTestComponent;

    let momentSvc: MomentService;


    // Setup
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                IvyAngularMomentJsModule
            ],
            declarations: [
                PipeTestComponent
            ]
        });

        fixture = TestBed.createComponent(PipeTestComponent);
        component = fixture.componentInstance;

        momentSvc = TestBed.get(MomentService);
    });


    // Tests
    it('Pipe does nothing if value is null', () => {

        component.date = null;
        component.tz = 'America/Los_Angeles';

        spyOn(momentSvc, 'changeToTimezone');

        fixture.detectChanges();

        expect(fixture.nativeElement.innerText).toBe('');
        expect(momentSvc.changeToTimezone).not.toHaveBeenCalled();
    });

    it('Pipe adjusts tz appropriately if not null', () => {

        component.date = new Date();
        component.tz = 'America/Los_Angeles';

        let resultDate = new Date(2011, 10);
        spyOn(momentSvc, 'changeToTimezone').and.returnValue(resultDate);

        fixture.detectChanges();

        expect(fixture.nativeElement.innerText).toBe(resultDate.toString());

        expect(momentSvc.changeToTimezone).toHaveBeenCalledTimes(1);
        expect(momentSvc.changeToTimezone).toHaveBeenCalledWith(component.date, component.tz);
    });
});
@Component({
    selector: 'ivy-pipe-test',
    template: '{{ date | ivyMomentTz:tz }}'
})
export class PipeTestComponent {
    @Input() date: Date;   
    @Input() tz: string;
}