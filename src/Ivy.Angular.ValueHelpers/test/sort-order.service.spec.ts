import 'jasmine';

import { SortOrder } from 'ivy.angular.data';

import { SortOrderService } from '../src/Services/sort-order.service';
import { CollectionHelper } from '../src/Services/collection-helper.service';

describe('SortOrderService', () => {

    // Variables & Constants
    let sut: SortOrderService;

    // Setup
    beforeEach(() => sut = new SortOrderService(new CollectionHelper()));


    // sortCollection
    it('sortCollection returns the same list if all sort order values are equal', () => {

        const toMake = 5;

        var sortables = Array.from(new Array(toMake).keys()).
            map((val, index) => index).
            map(x => {
                let item = new SortClass();
                item.sortOrder = 0;
                return item;
            });

        var sortableCopy = [];

        for (var i = 0; i < sortables.length; i++){
            sortableCopy.push(sortables[i]);
        }

        sut.sortCollection(sortables);

        for (var i = 0; i < toMake; i++) {
            expect(sortables[i]).toBe(sortableCopy[i]);
        }
    });

    it('sortCollection returns sort order ordered by ascending', () => {

        const toMake = 5;

        var sortables = Array.from(new Array(toMake).keys()).
            map((val, index) => index).
            map(x => {
                let item = new SortClass();
                item.sortOrder = toMake - (x + 1);
                return item;
            });


        for (var i = 0; i < toMake; i++) {
            expect(sortables[i].sortOrder).toBe(toMake - (i + 1));
        }

        sut.sortCollection(sortables);


        for (var i = 0; i < toMake; i++) {
            expect(sortables[i].sortOrder).toBe(i);
        }
    });

    it('sortCollection returns sort order ordered by ascending with inconsistent numbers', () => {

        const toMake = 5;

        var sortables = Array.from(new Array(toMake).keys()).
            map((val, index) => index).
            map(x => {
                let item = new SortClass();
                item.sortOrder = (toMake - (x + 1)) * 2;
                return item;
            });


        for (var i = 0; i < toMake; i++) {
            expect(sortables[i].sortOrder).toBe((toMake - (i + 1)) * 2);
        }

        sut.sortCollection(sortables);


        for (var i = 0; i < toMake; i++) {
            expect(sortables[i].sortOrder).toBe(i * 2);
        }
    });

    // getPreviousItem
    it('getPreviousItem returns the item before the requested sortOrder', () => {

        const toMake = 5;

        var sortables = Array.from(new Array(toMake).keys()).
            map((val, index) => index).
            map(x => {
                let item = new SortClass();
                item.sortOrder = x;
                return item;
            });


        let targetIndex = 3;

        var item = sortables[targetIndex];
        var expected = sortables[targetIndex - 1]

        var result = sut.getPreviousItem(sortables, item);

        expect(result.sortOrder).toBe(expected.sortOrder);
    });

    it('getPreviousItem returns the item before the requested sortOrder with inconsistent numbers', () => {

        const toMake = 5;

        var sortables = Array.from(new Array(toMake).keys()).
            map((val, index) => index).
            map(x => {
                let item = new SortClass();
                item.sortOrder = x * 2;
                return item;
            });


        let targetIndex = 3;

        var item = sortables[targetIndex];
        var expected = sortables[targetIndex - 1]

        var result = sut.getPreviousItem(sortables, item);

        expect(result.sortOrder).toBe(expected.sortOrder);
    });


    // getPreviousItems
    it('getPreviousItems returns all items before the requested sortOrder', () => {

        const toMake = 5;

        var sortables = Array.from(new Array(toMake).keys()).
            map((val, index) => index).
            map(x => {
                let item = new SortClass();
                item.sortOrder = x;
                return item;
            });


        let targetIndex = 3;

        var item = sortables[targetIndex];

        var result = sut.getPreviousItems(sortables, item);

        expect(result.length).toBe(targetIndex);

        for (var i = 0; i < result.length; i++) {
            expect(result[i].sortOrder).toBeLessThan(item.sortOrder);
        }
    });

    it('getPreviousItems returns all items before the requested sortOrder with inconsistent numbers', () => {

        const toMake = 5;

        var sortables = Array.from(new Array(toMake).keys()).
            map((val, index) => index).
            map(x => {
                let item = new SortClass();
                item.sortOrder = x * 2;
                return item;
            });


        let targetIndex = 3;

        var item = sortables[targetIndex];

        var result = sut.getPreviousItems(sortables, item);

        expect(result.length).toBe(targetIndex);

        for (var i = 0; i < result.length; i++) {
            expect(result[i].sortOrder).toBeLessThan(item.sortOrder);
        }
    });
});

class SortClass implements SortOrder {
    sortOrder: number;
}