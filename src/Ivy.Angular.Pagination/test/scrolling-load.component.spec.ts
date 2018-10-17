import 'jasmine';

import { TestBed, ComponentFixture, async, getTestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

import { IvyAngularPaginationModule } from '../ivy.angular.pagination.module';

import { PaginatedRequest, PaginatedResponse } from 'ivy.angular.data';
import { IvyValueHelpersModule } from 'ivy.angular.value-helpers';

import { ScrollingLoadComponent } from '../src/Components/ScrollingLoad/scrolling-load.component';

describe('ScrollingLoadComponent', () => {

    let component: ScrollingLoadComponent;
    let fixture: ComponentFixture<ScrollingLoadComponent>;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                /*
                 * This demonstrates a proper module loading pattern
                 * This module only provides services, so we don't include it in the Module
                 * However, we need the services for testing, so we include it in the config here
                 * This would represent the actual consuming app very closely
                 */
                IvyValueHelpersModule,
                IvyAngularPaginationModule
            ]
        });

        fixture = TestBed.createComponent(ScrollingLoadComponent);
        component = fixture.componentInstance;
    });

    // onScroll
    it('onScroll does nothing if response is null', () => {

        component.containerDiv = {
            nativeElement: {
                clientHeight: 0
            }
        };

        let event = {
            target: {
                scrollTop: 0,
                scrollHeight: 1000
            }
        };

        expect(event.target.scrollTop + component.containerDiv.nativeElement.clientHeight)
            .not.toBe(event.target.scrollHeight);

        let resultEmit: PaginatedRequest;
        component.onScrollBottom.subscribe((result: PaginatedRequest) => resultEmit = result);

        component.response = null;

        component.onScroll(event);

        expect(resultEmit).toBe(undefined);
    });

    it('onScroll increments page if scrollTop + clientHeight == scrollHeight and response is null', () => {

        component.containerDiv = {
            nativeElement: {
                clientHeight: 1000
            }
        };

        let event = {
            target: {
                scrollTop: 0,
                scrollHeight: 1000
            }
        };

        expect(event.target.scrollTop + component.containerDiv.nativeElement.clientHeight)
            .toBe(event.target.scrollHeight);


        let resultEmit: PaginatedRequest;
        component.onScrollBottom.subscribe((result: PaginatedRequest) => resultEmit = result);

        component.response = new PaginatedResponse();

        // Ensure it can fire next page
        component.response.totalCount = 100;

        component.onScroll(event);

        expect(resultEmit).not.toBe(undefined);
        expect(resultEmit).not.toBe(null);
        expect(resultEmit.pageCount).toBe(5);  // Default in component
        expect(resultEmit.search).toBe(null);  // Default
        expect(resultEmit.pageNumber).toBe(2); // Default ++1
    });

    // ngOnInit
    it('onInit sets pageCount = to 5 if no pageCount provided', () => {

        component.response = new PaginatedResponse();

        // Ensure it can fire next page
        component.response.totalCount = 100;

        let resultEmit: PaginatedRequest;
        component.onScrollBottom.subscribe((result: PaginatedRequest) => resultEmit = result);

        component.ngOnInit();

        expect(resultEmit.pageCount).toBe(5);  // Default in component
    });

    it('onInit sets pageCount = custom if countPerLoad has been provided', () => {

        component.response = new PaginatedResponse();

        // Ensure it can fire next page
        component.response.totalCount = 100;

        let resultEmit: PaginatedRequest;
        component.onScrollBottom.subscribe((result: PaginatedRequest) => resultEmit = result);

        component.countPerLoad = 123;

        component.ngOnInit();

        expect(resultEmit.pageCount).toBe(component.countPerLoad);  // Default in component
    });

    // afterViewChecked
    it('afterViewChecked does nothing if response is null', () => {

        component.response = null;

        let req: PaginatedRequest = null;
        component.onScrollBottom.subscribe((emit: PaginatedRequest) => req = emit);

        component.ngAfterViewChecked();

        expect(req).toBe(null);
    });

    it('afterViewChecked sets pageHeight to containerDiv height, but does not emit page if not larger than contentDiv height', () => {

        component.containerDiv = {
            nativeElement: { clientHeight: 100 }
        };

        component.contentDiv = {
            nativeElement: { clientHeight: 200 }
        };

        component.response = new PaginatedResponse();

        let req: PaginatedRequest = null;
        component.onScrollBottom.subscribe((emit: PaginatedRequest) => req = emit);

        component.ngAfterViewChecked();

        expect(req).toBe(null);
    });

    it('afterViewChecked sets pageHeight to containerDiv height, and does emit page +1 if larger than contentDiv height', () => {

        component.containerDiv = {
            nativeElement: { clientHeight: 200 }
        };

        component.contentDiv = {
            nativeElement: { clientHeight: 100 }
        };

        component.response = new PaginatedResponse();
        component.response.totalCount = 100;

        let req: PaginatedRequest = null;
        component.onScrollBottom.subscribe((emit: PaginatedRequest) => req = emit);

        component.ngAfterViewChecked();

        expect(req).not.toBe(null);
        expect(req.pageNumber).toBe(2);
    });

    it('afterViewChecked sets pageHeight to containerDiv height, and does not emit higher pages with subsequent requests', () => {

        component.containerDiv = {
            nativeElement: { clientHeight: 200 }
        };

        component.contentDiv = {
            nativeElement: { clientHeight: 100 }
        };

        component.response = new PaginatedResponse();
        component.response.totalCount = 100

        let req: PaginatedRequest = null;
        component.onScrollBottom.subscribe((emit: PaginatedRequest) => req = emit);

        component.ngAfterViewChecked();

        expect(req).not.toBe(null);
        expect(req.pageNumber).toBe(2);

        component.ngAfterViewChecked();

        expect(req.pageNumber).toBe(2);
    });

    it('afterViewChecked sets pageHeight to containerDiv height, and will emit higher subsequent page if client height still below container', () => {

        component.containerDiv = {
            nativeElement: { clientHeight: 200 }
        };

        component.contentDiv = {
            nativeElement: { clientHeight: 100 }
        };

        component.response = new PaginatedResponse();
        component.response.totalCount = 100

        let req: PaginatedRequest = null;
        component.onScrollBottom.subscribe((emit: PaginatedRequest) => req = emit);

        component.ngAfterViewChecked();

        expect(req).not.toBe(null);
        expect(req.pageNumber).toBe(2);

        component.contentDiv.nativeElement.clientHeight = 150;

        component.ngAfterViewChecked();

        expect(req.pageNumber).toBe(3);
    });

    // getHeight
    it('getHeight returns 100% if maxHeight and page height are empty', doneFn => {

        component.maxHeight = null;

        component.getHeight().subscribe(
            result => {

                expect(result).toBe('100%');

                doneFn();
            }
        );
    });

    it('getHeight returns pageHeight px if provided', doneFn => {

        component.containerDiv = {
            nativeElement: {
                clientHeight: 100
            }
        };

        component.response = new PaginatedResponse();

        component.ngAfterViewChecked();

        component.getHeight().subscribe(
            result => {

                expect(result).toBe(component.containerDiv.nativeElement.clientHeight + 'px');

                doneFn();
            }
        );
    });

    it('getHeight returns maxHeight px if no pageHeight provided', doneFn => {

        component.maxHeight = 100;

        component.getHeight().subscribe(
            result => {

                expect(result).toBe(component.maxHeight + 'px');

                doneFn();
            }
        );
    });
});