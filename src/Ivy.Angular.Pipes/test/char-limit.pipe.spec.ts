import 'jasmine';

import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

import { TestBed, ComponentFixture } from '@angular/core/testing';

import { IvyAngularPipesModule } from '../ivy.angular.pipes.module';

import { IvyAngularCharLimitPipe } from '../src/Pipes/char-limit.pipe';

describe('IvyAngularCharLimitPipe', () => {

    // Variables
    let fixture: ComponentFixture<PipeTestComponent>;
    let component: PipeTestComponent;


    // Setup
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                IvyAngularPipesModule
            ],
            declarations: [
                PipeTestComponent
            ]
        });

        fixture = TestBed.createComponent(PipeTestComponent);
        component = fixture.componentInstance;
    });


    // Class Tests
    it('transform errors if limit is null', () => {

        let pipe = new IvyAngularCharLimitPipe();

        expect(() => pipe.transform('test', null)).toThrow('char limit param required for ivyCharLimit pipe as a positive number value');
    });

    it('transform errors if limit is less than 1', () => {

        let pipe = new IvyAngularCharLimitPipe();

        expect(() => pipe.transform('test', 0)).toThrow('char limit param required for ivyCharLimit pipe as a positive number value');
    });

    it('If string length > limit, everything after is trimmed', () => {

        let testVal = 'TESTING';
        let limit = testVal.length - 3;

        let expected = testVal.substring(0, testVal.length - 3) + '...';

        component.text = testVal;
        component.limit = limit;

        fixture.detectChanges();

        let result = fixture.nativeElement.innerText;

        expect(result).toBe(expected);
    });

    it('If string length < limit, string stays the same', () => {

        let testVal = 'TESTING';
        let limit = testVal.length + 1;

        component.text = testVal;
        component.limit = limit;

        fixture.detectChanges();

        let result = fixture.nativeElement.innerText;

        expect(result).toBe(testVal);
    });

});

@Component({
    template: '{{ text | ivyCharLimit:limit }}',
    selector: 'ivy-pipe-test'
})
export class PipeTestComponent {

    @Input() text: string;
    @Input() limit: number;
}