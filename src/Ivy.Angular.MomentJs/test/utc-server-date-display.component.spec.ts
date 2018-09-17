import 'jasmine';

import { Pipe, PipeTransform } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';

import { IvyAngularMomentJsModule } from '../ivy.angular.moment-js.module';

import { FromUtcPipe, LocalTimePipe, DateFormatPipe } from 'ngx-moment';

import { IvyAngularUtcServerDateDisplayComponent } from '../src/Components/UtcServerDateDisplay/utc-server-date-display.component';


/*
 * These will validate that the Component is properly configured into the Module
 */
describe('UtcServerDateDisplayComponent: Module Tests', () => {

    // Variables
    let fixture: ComponentFixture<IvyAngularUtcServerDateDisplayComponent>;
    let sut: IvyAngularUtcServerDateDisplayComponent;


    // Setup
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                IvyAngularMomentJsModule
            ]
        });

        fixture = TestBed.createComponent(IvyAngularUtcServerDateDisplayComponent);

        sut = fixture.componentInstance;
    });


    // Tests
    it('UtcServerDateDisplay does not show anything if date is null', () => {

        sut.date = null;

        fixture.detectChanges();
        
        expect(fixture.debugElement.children.length).toBe(0);
    });

});

/*
 * These will validate that our pipes are getting hit correctly and 
 * that the values are getting passed appropriately.
 */
describe('UtcServerDateDisplayComponent: Component Tests', () => {

    // Variables
    let fixture: ComponentFixture<IvyAngularUtcServerDateDisplayComponent>;
    let sut: IvyAngularUtcServerDateDisplayComponent;


    // Setup
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
            ],
            declarations: [
                IvyAngularUtcServerDateDisplayComponent,
                MockFromUtcPipe,
                MockDateFormatPipe,
                MockLocalTimePipe
            ]
        });

        fixture = TestBed.createComponent(IvyAngularUtcServerDateDisplayComponent);

        sut = fixture.componentInstance;
    });


    // Tests
    it('UtcServerDateDisplay renders a UTC date as expected', () => {

        const startVal: Date = new Date(2010, 1);

        let fromUtcResult = new Date(2010, 2);
        let fromUtcSpy = spyOn(MockFromUtcPipe.prototype, 'transform')
            .and.returnValue(fromUtcResult);

        let localResult = new Date(2010, 3);
        let localTimeSpy = spyOn(MockLocalTimePipe.prototype, 'transform')
            .and.returnValue(localResult);

        let dateFormatResult = 'TEST';
        let dateFormatSpy = spyOn(MockDateFormatPipe.prototype, 'transform')
            .and.returnValue(dateFormatResult);

        sut.date = startVal;

        fixture.detectChanges();

        expect(fromUtcSpy).toHaveBeenCalledTimes(1);
        expect(fromUtcSpy).toHaveBeenCalledWith(startVal);

        expect(localTimeSpy).toHaveBeenCalledTimes(1);
        expect(localTimeSpy).toHaveBeenCalledWith(fromUtcResult);

        expect(dateFormatSpy).toHaveBeenCalledTimes(1);
        expect(dateFormatSpy).toHaveBeenCalledWith(localResult, 'YYYY/MM/DD');

        expect(fixture.debugElement.children[0].nativeElement.innerText).toBe(dateFormatResult);
    });

});


@Pipe({ name: 'amFromUtc' })
class MockFromUtcPipe implements PipeTransform {
    //transform = (value: any): any => value;

    transform(value: any): any {
        console.log('Mock Utc Pipe');
        return value;
    }
}

@Pipe({ name: 'amLocal' })
class MockLocalTimePipe implements PipeTransform {
    //transform = (value: any): any => value;

    transform(value: any): any {
        console.log('Mock Local Time Pipe');
        return value;
    }
}

@Pipe({ name: 'amDateFormat' })
class MockDateFormatPipe implements PipeTransform {
    //transform = (value: any): any => value;

    transform(value: any, tz: string): any {
        console.log('Mock Date Format Pipe');
        return value;
    }
}