import { Component, Input } from '@angular/core';

/*
 * This is a simple component made to display our specific server-side date display objects.
 *
 * The server-side classes ALWAYS work in UTC.  In order to display these dates appropriately,
 * we must localize the time to the client timezone.
 *
 * This component acts as a wrapper for our MomentJS displays so we don't have to remember all these pipes.
 */

@Component({
    selector: 'ivy-utc-server-date-time-ago-display',
    template: '<span *ngIf="date != null">{{date | amFromUtc | amLocal | amTimeAgo}}</span>'
})
export class IvyAngularUtcServerDateTimeAgoDisplayComponent {

    @Input()
    date: Date;
}