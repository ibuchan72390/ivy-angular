import { Injectable } from '@angular/core';

import { CollectionHelper } from './collection-helper.service';

import { SortOrder } from 'ivy.angular.data';

@Injectable()
export class SortOrderService {

    constructor(
        private collSvc: CollectionHelper) {
    }

    sortCollection<T extends SortOrder>(items: T[]): void {

        items = items.sort((obj1: T, obj2: T) => {
            if (obj1.sortOrder >= obj2.sortOrder) {
                return 1;
            } else {
                return -1;
            }
        });

    }

    getPreviousItem<T extends SortOrder>(items: T[], current: T): T {

        return this.internalGetPrevious<T, T>(items, current,
            () => null,
            targetSort => this.collSvc.firstOrDefault(items.filter(x => x.sortOrder == targetSort)));
    }

    getPreviousItems<T extends SortOrder>(items: T[], current: T): T[] {

        return this.internalGetPrevious<T, T[]>(items, current,
            () => [],
            targetSort => items.filter(x => x.sortOrder <= targetSort));
    }

    private internalGetPrevious<TItem extends SortOrder, TReturn>(items: TItem[], current: TItem,
        noMapsReturn: () => TReturn, mapReturn: (targetSort: number) => TReturn): TReturn {

        // Don't decrement, leave as less than (<) instead of less than equal to (<=)
        let targetOrder = current.sortOrder;

        // We have no guarantee that SortOrder will be in order properly
        // We should set this up to ensure we don't have to worry about bad configs
        let orderMaps = items.map(x => x.sortOrder).filter(x => x < targetOrder);

        let targetSort: number;

        if (orderMaps.length == 0) {

            return noMapsReturn();

        } else {

            // To get the second lowest sort order, we must get all sorts,
            // filter to sorts below the order of the current item,
            // take the max of that given collection of sorts below current
            targetSort = this.collSvc.max(orderMaps);

            return mapReturn(targetSort);
        }
    }
}