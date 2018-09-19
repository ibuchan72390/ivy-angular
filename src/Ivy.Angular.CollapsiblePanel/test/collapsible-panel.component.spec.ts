import 'jasmine';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvyAngularCollapsiblePanelModule } from '../ivy.angular.collapsible-panel.module';

import { CollapsiblePanelComponent } from '../src/Components/CollapsiblePanel/collapsible-panel.component';

describe('CollapsiblePanelComponent', () => {

    // Variables & Constants
    let fixture: ComponentFixture<CollapsiblePanelComponent>;
    let sut: CollapsiblePanelComponent;


    // SetUp & TearDown
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                //BrowserAnimationsModule, - This does not seem to work here
                NoopAnimationsModule,
                IvyAngularCollapsiblePanelModule
            ]
        });

        fixture = TestBed.createComponent(CollapsiblePanelComponent);
        sut = fixture.componentInstance;
    });


    // Tests
    it('Panel is closed if isCollapsed input is true', () => {

        sut.isCollapsed = true;

        let childElement = fixture.debugElement.nativeElement.children[0];

        childElement.innerHtml = '<h1>TESTING</h1>';
        childElement.style.height = '100px';

        fixture.detectChanges();

        expect(childElement.style.height).toBe('0px');
    });

    it('Panel is open if isCollapsed input is false', () => {

        sut.isCollapsed = false;

        let childElement = fixture.debugElement.nativeElement.children[0];

        childElement.innerHtml = '<h1>TESTING</h1>';
        childElement.style.height = '100px';

        fixture.detectChanges();

        expect(childElement.style.height).toBe('100px');
    });

    it('Panel returns to original height after open', () => {

        sut.isCollapsed = true;

        let childElement = fixture.debugElement.nativeElement.children[0];

        childElement.innerHtml = '<h1>TESTING</h1>';
        childElement.style.height = '100px';

        fixture.detectChanges();

        expect(childElement.style.height).toBe('0px');

        sut.isCollapsed = false;

        fixture.detectChanges();

        expect(childElement.style.height).toBe('');
    });
});