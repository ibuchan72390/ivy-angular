import 'jasmine';

import { Component, Input } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AngularTestHelper } from '../src/angular-test.helper';

describe('AngularTestHelper', () => {

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [],
            declarations: [
                TestTemplateComponent,
                TestComponent
            ]
        });

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });


    it('AngularTestHelper generates attribute values as expected', () => {

        const attr: string = 'testattr';

        expect(AngularTestHelper.getNgAttrName(attr)).toBe('ng-reflect-' + attr);
    });

    it('AngularTestHelper generates kebab case attribute values as expected', () => {

        const attr: string = 'TestAttrValue';

        expect(AngularTestHelper.getNgAttrName(attr)).toBe('ng-reflect-test-attr-value');
    });


    it('AngularTestHelper throws error if it is unable to find the target attribute', () => {

        const attrName = 'FAKE';

        expect(() => AngularTestHelper.getNgAttrVal('FAKE', fixture.debugElement))
            .toThrow('Unable to find ngAttr on Element! Name: ' + attrName);
    });

    it('AngularTestHelper can properly read the bound values', () => {

        const expected: string = '500px';

        let height: string = AngularTestHelper.getNgAttrVal('inputHeight', fixture.debugElement.children[0]);
        expect(height).toBe(expected);

        let width: string = AngularTestHelper.getNgAttrVal('inputWidth', fixture.debugElement.children[0]);
        expect(width).toBe(expected);
    });
});


declare var require: any;

@Component({
    selector: 'ivy-test',
    template: '<ivy-test-template [inputHeight]="\'500px\'" [inputWidth]="\'500px\'"></ivy-test-template>'
})
export class TestComponent {
}


@Component({
    selector: 'ivy-test-template', 
    template: '<div style="background-color: red" [style.height]="" [style.width]=""></div>'
})
export class TestTemplateComponent {

    @Input()
    inputHeight: string;

    @Input()
    inputWidth: string;
}