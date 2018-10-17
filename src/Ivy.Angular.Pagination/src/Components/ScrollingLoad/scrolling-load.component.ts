declare var require: any;

import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    AfterViewChecked,
    ElementRef,
    ViewChild,
    HostListener
} from '@angular/core';

import {
    BasePaginatedResponse,
    PaginatedRequest
} from 'ivy.angular.data';

import { MathHelper } from 'ivy.angular.value-helpers';
import { Observable, Observer } from 'rxjs';


/**
 * This component works in the following manner:
 * There are 2 separate things that can fire a pagination update
 *
 * If sthe content div is larger than the container div, scroll functionality will be enabled.
 * When you scroll to the bottom of the overflow, the pagination will execute.
 *
 * Alternatively, there is an issue that occurs when the content div is not larger than the container div.
 * We examine this in the AfterViewChecked event hook.  If the container height == scroll height, then
 * scroll capabilities are not enabled.  As such, we'll continue to fire off pagination updates until either
 * there are no pages or we've begun to enable scroll capabilities by ensuring the content div is larger than
 * the corresponding container div.
 */
@Component({
    selector: 'ivy-scrolling-load',
    templateUrl: './scrolling-load.component.html'
})
export class ScrollingLoadComponent implements OnInit, AfterViewChecked {

    @Input()
    maxHeight: number;

    @Input()
    countPerLoad: number;

    @Input()
    response: BasePaginatedResponse;

    @Output()
    onScrollBottom: EventEmitter<PaginatedRequest> = new EventEmitter<PaginatedRequest>();

    @ViewChild('scrollcontent') contentDiv: ElementRef;
    @ViewChild('scrollcontainer') containerDiv: ElementRef;


    constructor(
        private math: MathHelper
    ) {
        this.req = new PaginatedRequest();
        this.req.pageCount = 5;
    }


    private req: PaginatedRequest;
    private pageHeight: number;
    private adjustedHeight: number;

    //@HostListener('scroll', ['$event'])
    onScroll(event: any): void {

        // We only want to fire off pagination if we're not already waiting for a response
        // Otherwise, we will screw up the paginated context
        if (this.response != null) {

            // Scroll increment condition
            if (event.target.scrollTop + this.containerDiv.nativeElement.clientHeight == event.target.scrollHeight) {
                this.incrementPage();
            }
        }
    }

    ngOnInit(): void {

        if (this.countPerLoad != null) {
            this.req.pageCount = this.countPerLoad;
        }

        this.emitPageReq();
    }
    
    ngAfterViewChecked(): void {

        if (this.response == null) return;

        // This value will be correct on the first hit after we populate the response
        if (!this.pageHeight) {
            this.pageHeight = this.containerDiv.nativeElement.clientHeight;
        }

        // Check increment condition
        // Is our container larger than our contents???
        // If so, we need to try and load more contents
        if (this.pageHeight > this.contentDiv.nativeElement.clientHeight) {

            // Are we still waiting on the previous increment to complete???
            if (this.contentDiv.nativeElement.clientHeight != this.adjustedHeight){

                this.adjustedHeight = this.contentDiv.nativeElement.clientHeight;
                this.incrementPage();
            }
        }
    }

    getHeight(): Observable<string> {

        // This seems to raise an issue with ExpressionChangedAfterItHasBeenCheckedError
        // Not exactly sure why, but first we need to have the max-height 100% to determine page height
        // After we have page height, we can set that as the max height

        return Observable.create((observer: Observer<string>) => {

            setTimeout(() => { 

                if (this.maxHeight == null && !this.pageHeight) {
                    observer.next('100%');
                } else if (this.pageHeight) {
                    observer.next(this.pageHeight + 'px');
                } else {
                    observer.next(this.maxHeight + 'px');
                }

                observer.complete();
            });
        });

    }
    
    private emitPageReq(): void {
        this.onScrollBottom.emit(this.req);
    }

    private getTotalPages(): number {
        return this.math.ceil(this.response.totalCount / this.req.pageCount);
    }

    private incrementPage(): void {

        if (this.req.pageNumber < this.getTotalPages()) {

            // Setup loading spinner again
            setTimeout(() => this.nullResponse());

            // Ensure we load the next page of data
            this.req.pageNumber++;

            // Emit request
            this.emitPageReq();
        }
    }

    private nullResponse(): void {
        this.response = null;
    }
}