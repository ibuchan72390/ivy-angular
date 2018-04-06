import 'jasmine';

import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

import { TestBed, ComponentFixture } from '@angular/core/testing';

import { IvyAngularPipesModule } from '../ivy.angular.pipes.module';

import { IvyAngularCapitalizeFirstLetterPipe } from '../src/Pipes/capitalize-first-letter.pipe';

describe('IvyAngularCapitalizeFirstLetterPipe', () => {

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

        this.testTextSame = (text: string) => {

            component.text = text;

            fixture.detectChanges();

            expect(fixture.nativeElement.innerText).toBe(text);
        };

        this.testTextBecomes = (textWas: string, textIs: string) => {

            component.text = textWas;

            fixture.detectChanges();

            expect(fixture.nativeElement.innerText).toBe(textIs);
        };
    });


    // Class Tests
    it('If string length > 0, the first letter is capitalized', () => {

        this.testTextBecomes('test', 'Test');
    });

    it('Pipe does nothing if first letter already capitalized', () => {

        this.testTextSame('Test');
    });

    it('Empty is unmodified through the pipe', () => {

        this.testTextSame('');
    });

    it('Null is unmodified through the pipe', () => {

        this.testTextBecomes(null, '');
    });

    it('undefined is unmodified through the pipe', () => {

        this.testTextBecomes(undefined, '');
    });
});

@Component({
    template: '{{ text | ivyCapitalizeFirstLetter }}',
    selector: 'ivy-pipe-test'
})
export class PipeTestComponent {
    @Input() text: string;
}