import 'jasmine';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FlexLayoutModule, LayoutDirective, LayoutAlignDirective } from '@angular/flex-layout';
import { FlexLayoutTestHelper } from '../src/flex-layout-test.helper';

describe('FlexLayoutTestHelper', () => {

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                FlexLayoutModule
            ],
            declarations: [
                TestComponent
            ]
        });

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('Can properly read the fxLayout directive', () => {

        let fxLayoutElem = fixture.debugElement.query(By.directive(LayoutDirective))

        let result = FlexLayoutTestHelper.getFxLayoutValue(fxLayoutElem);

        expect(result).toBe('column');
    });

    it('Can properly read the fxLayoutAlign directive', () => {

        let fxLayoutAlignElem = fixture.debugElement.query(By.directive(LayoutAlignDirective))

        let result = FlexLayoutTestHelper.getFxLayoutAlignValue(fxLayoutAlignElem);

        expect(result).toBe('center center');
    });
});


declare var require: any;

@Component({
    selector: 'iam-test-component',
    template: '<div style="background-color: red" fxLayout="column" fxLayoutAlign="center center"><h1>TESTING 1</h1><h1>TESTING 2</h1><div>'
})
class TestComponent {
}