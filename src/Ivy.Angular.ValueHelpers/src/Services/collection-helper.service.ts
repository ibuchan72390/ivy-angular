import { Injectable } from '@angular/core';

import { BaseEntity } from 'ivy.angular.data';
import { BaseEnumEntity } from 'ivy.angular.data';

@Injectable()
export class CollectionHelper {

    range(count: number, start: number = 0): number[] {

        let arr = Array.from(new Array(count).keys());

        if (start != 0) {
            arr = arr.map((val, index) => index + start);
        }

        return arr;
    }

    max(col: number[]): number {

        return this.internalMax<number>(col);
    }

    maxDate(col: Date[]): Date {

        return this.internalMax<Date>(col);
    }

    min(col: number[]): number {

        return this.internalMin<number>(col);
    }

    minDate(col: Date[]): Date {

        return this.internalMin<Date>(col);
    }

    firstOrDefault<T>(col: T[]): T {

        if (col.length == 0) {
            return null;
        } else {
            return col[0];
        }
    }

    remove<T>(coll: T[], item: T): void {

        coll.splice(coll.indexOf(item), 1);
    }

    removeEntity<T extends BaseEntity>(coll: T[], item: T): void {

        for (var i = 0; i < coll.length; i++) {

            if (coll[i].id == item.id) {

                coll.splice(i, 1);
                return;
            }
        }
    }

    getEntityById<T extends BaseEntity>(coll: T[], id: number): T {

        for (var i = 0; i < coll.length; i++) {
            if (coll[i].id == id) {
                return coll[i];
            }
        }

        return null;
    }

    getEnumEntityByName<T extends BaseEnumEntity>(coll: T[], name: string): T {

        for (var i = 0; i < coll.length; i++) {
            if (coll[i].name == name) {
                return coll[i];
            }
        }

        return null;
    }

    contains<T>(coll: T[], item: T): boolean {

        return coll.indexOf(item) > -1;
    }

    containsEntity<T extends BaseEntity>(coll: T[], item: T): boolean {

        for (var i = 0; i < coll.length; i++) {

            if (coll[i].id == item.id) {

                return true;
            }
        }

        return false;
    }

    addOrRemove<T>(coll: T[], item: T): void {

        if (this.contains(coll, item)) {
            this.remove(coll, item);
        } else {
            coll.push(item);
        }
    }

    addOrRemoveEntity<T extends BaseEntity>(coll: T[], item: T): void {

        if (this.containsEntity(coll, item)) {
            this.removeEntity(coll, item);
        } else {
            coll.push(item);
        }
    }

    intersect<T>(coll1: T[], coll2: T[]): T[] {

        var results = [];

        for (var i = 0; i < coll1.length; i++) {

            if (this.contains(coll2, coll1[i])) {
                results.push(coll1[i]);
            }
        }

        return results;
    }

    intersectEntities<T extends BaseEntity>(coll1: T[], coll2: T[]): T[] {

        var results = [];

        for (var i = 0; i < coll1.length; i++) {

            if (this.containsEntity(coll2, coll1[i])) {
                results.push(coll1[i]);
            }
        }

        return results;
    }

    exclude<T>(coll1: T[], coll2: T[]): T[] {

        var results = [];

        for (var i = 0; i < coll1.length; i++) {

            if (!this.contains(coll2, coll1[i])) {

                results.push(coll1[i]);
            }
        }

        return results;
    }

    excludeEntities<T extends BaseEntity>(coll1: T[], coll2: T[]): T[] {

        var results = [];

        for (var i = 0; i < coll1.length; i++) {

            if (!this.containsEntity(coll2, coll1[i])) {

                results.push(coll1[i]);
            }
        }

        return results;
    }

    private internalMax<T>(col: T[]): T {

        if (col.length == 0) return null;

        let max = col[0];

        for (var i = 0; i < col.length; i++) {

            if (col[i] > max)
                max = col[i];
        }

        return max;
    }

    private internalMin<T>(col: T[]): T {

        if (col.length == 0) return null;

        let min = col[0];

        for (var i = 0; i < col.length; i++) {

            if (col[i] < min)
                min = col[i];
        }

        return min;
    }
}