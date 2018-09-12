import 'jasmine';

import { BaseEntity, BaseEnumEntity } from 'ivy.angular.data';

import { CollectionHelper } from '../src/Services/collection-helper.service';

describe('CollectionHelper', () => {

    // Variables & Constantss
    let sut: CollectionHelper;

    // Setup
    beforeEach(() => sut = new CollectionHelper());


    // range
    it('range properly creates array of numbers of desired length starting from 0', () => {

        const count: number = 5;

        let result = sut.range(count);

        for (var i = 0; i < count; i++) {
            expect(result[i]).toBe(i);
        }
    });

    it('range properly creates array of numbers of desired length starting from alternate start', () => {

        const count: number = 5;
        const start: number = 10;

        let result = sut.range(count, start);

        for (var i = 0; i < count; i++) {
            expect(result[i]).toBe(i + start);
        }
    });


    // max
    describe('max', () => { 

        it('max returns max value from collection', () => {

            let count = 10;

            let vals = Array.from(new Array(count).keys()).
                map((val, index) => index);

            // subtract 1 for zero-based indexing
            expect(sut.max(vals)).toBe(count - 1);
        });

        it('max returns null for empty array', () => {

            expect(sut.max([])).toBeNull();
        });
    });

    // maxDate
    describe('maxDate', () => { 

        it('maxDate returns max date from collection', () => {

            let count = 10;

            let vals: Date[] = Array.from(new Array(count).keys()).
                map((val, index) => index).
                map(val => new Date(100000 * val));

            // subtract 1 for zero-based indexing
            expect(sut.maxDate(vals)).toBe(vals[count - 1]);
        });

        it('maxDate returns null for empty array', () => {

            expect(sut.maxDate([])).toBeNull();
        });
    });

    // min
    describe('min', () => { 

        it('min returns min value from collection', () => {

            let count = 10;

            let vals = Array.from(new Array(count).keys()).
                map((val, index) => index);

            expect(sut.min(vals)).toBe(0);
        });

        it('min returns null for empty array', () => {

            expect(sut.min([])).toBeNull();
        });
    });

    // minDate
    describe('minDate', () => { 

        it('minDate returns min date from collection', () => {

            let count = 10;

            let vals: Date[] = Array.from(new Array(count).keys()).
                map((val, index) => index).
                map(val => new Date(100000 * val));

            // subtract 1 for zero-based indexing
            expect(sut.minDate(vals)).toBe(vals[0]);
        });

        it('minDate returns null for empty array', () => {

            expect(sut.minDate([])).toBeNull();
        });
    });

    // firstOrDefault
    describe('firstOrDefault', () => { 

        it('firstOrDefault returns null if length is 0', () => {
            let arr: number[] = [];

            expect(sut.firstOrDefault(arr)).toBe(null);
        });

        it('firstOrDefault returns first if length is greater than 0', () => {
            let arr: number[] = [1,2,3];

            expect(sut.firstOrDefault(arr)).toBe(arr[0]);
        });
    });

    // remove
    it('remove eliminates item from array', () => {

        let arr: number[] = [1,2,3];

        sut.remove(arr, 2);

        expect(arr.length).toBe(2);
        expect(arr[0]).toBe(1);
        expect(arr[1]).toBe(3);
    });

    // removeEntity
    it('remove eliminates item from array', () => {

        let arr: TestEntity[] = [1, 2, 3].map(toEntity);
        let expected = [arr[0], arr[2]];

        sut.remove(arr, arr[1]);

        expect(arr.length).toBe(2);

        expect(arr[0]).toBe(expected[0]);
        expect(arr[1]).toBe(expected[1]);
    });

    // getEntityById
    describe('getEntityById', () => { 
        it('getEntityById returns entity with matching id', () => {

            const count = 10;
            let arr = Array.from(new Array(count).keys()).
                map((val, index) => index).
                map(toEntity);

            let result = sut.getEntityById(arr, count - 1);

            expect(result.id).toBe(count - 1);
        });

        it('getEntityById returns null if no match', () => {

            const count = 10;
            let arr = Array.from(new Array(count).keys()).
                map((val, index) => index).
                map(toEntity);

            let result = sut.getEntityById(arr, count + 100);

            expect(result).toBeNull();
        });

        it('getEntityById returns null if empty', () => {

            let result = sut.getEntityById([], 1);

            expect(result).toBeNull();
        });
    });

    // getEnumEntityByName
    describe('getEnumEntityByName', () => { 

        it('getEnumEntityByName returns item from list with matching name', () => {

            const count = 10;
            let arr: TestEnumEntity[] = Array.from(new Array(count).keys()).
                map((val, index) => index).
                map(x => {
                    let entity = new TestEnumEntity();
                    entity.name = x.toString();
                    return entity;
                });

            let targetId = (count - 1).toString();

            let result = sut.getEnumEntityByName(arr, targetId);

            expect(result.name).toBe(targetId);
        });

        it('getEnumEntityByName returns null if no item from list with matching name', () => {

            const count = 10;
            let arr: TestEnumEntity[] = Array.from(new Array(count).keys()).
                map((val, index) => index).
                map(x => {
                    let entity = new TestEnumEntity();
                    entity.name = x.toString();
                    return entity;
                });

            let targetId = (count + 100).toString();

            let result = sut.getEnumEntityByName(arr, targetId);

            expect(result).toBeNull();
        });

        it('getEnumEntityByName returns null if empty', () => {

            let result = sut.getEnumEntityByName([], 'test');

            expect(result).toBeNull();
        });
    });

    // contains
    describe('contains', () => { 

        it('contains executes as expected for true', () => {

            let arr: number[] = [1, 2, 3];

            expect(sut.contains(arr, arr[0])).toBe(true);
        });

        it('contains executes as expected for false', () => {

            let arr: number[] = [1, 2, 3];

            expect(sut.contains(arr, 100)).toBe(false);
        });
    });

    // containsEntity
    describe('containsEntity', () => {

        it('containsEntity executes as expected for true', () => {

            let arr: TestEntity[] = [1, 2, 3].map(x => {
                return { id: x } as TestEntity
            });

            expect(sut.containsEntity<TestEntity>(arr, arr[0])).toBe(true);
        });

        it('containsEntity executes as expected for false', () => {

            let arr: TestEntity[] = [1, 2, 3].map(x => {
                return { id: x } as TestEntity
            });;

            expect(sut.containsEntity<TestEntity>(arr, { id: 100 } as TestEntity)).toBe(false);
        });
    });

    // addOrRemove
    describe('addOrRemove', () => {

        it('addOrRemove adds if not in the collection', () => {

            const toEdit: number = 1;

            let arr: number[] = [];

            sut.addOrRemove(arr, toEdit);

            expect(arr.length).toBe(1);
            expect(arr[0]).toBe(toEdit);
        });

        it('addOrRemove removes if in the collection', () => {

            const toEdit: number = 1;

            let arr: number[] = [toEdit];

            sut.addOrRemove(arr, toEdit);

            expect(arr.length).toBe(0);
        });
    });

    // addOrRemoveEntity
    describe('addOrRemoveEntity', () => {

        it('addOrRemoveEntity adds if not in the collection', () => {

            const toEdit: TestEntity = { id: 1 } as TestEntity;

            let arr: TestEntity[] = [];

            sut.addOrRemoveEntity(arr, toEdit);

            expect(arr.length).toBe(1);
            expect(arr[0]).toBe(toEdit); 
        });

        it('addOrRemoveEntity removes if in the collection', () => {

            const toEdit: TestEntity = { id: 1 } as TestEntity;

            let arr: TestEntity[] = [toEdit];

            sut.addOrRemoveEntity(arr, toEdit);

            expect(arr.length).toBe(0);
        });
    });

    // intersect
    describe('intersect', () => {

        it('intersect executes as expected with overlap', () => {

            let arr1: number[] = [1, 2, 3];
            let arr2: number[] = [2, 3, 4];

            var result = sut.intersect(arr1, arr2);

            expect(result.length).toBe(2);
            expect(result.indexOf(2)).toBeGreaterThan(-1);
            expect(result.indexOf(3)).toBeGreaterThan(-1);
        });

        it('intersect executes as expected without overlap', () => {

            let arr1: number[] = [1, 2, 3];
            let arr2: number[] = [4, 5, 6];

            var result = sut.intersect(arr1, arr2);

            expect(result.length).toBe(0);
        });
    });

    // intersectEntity
    describe('intersectEntities', () => {

        it('intersectEntities executes as expected with overlap', () => {

            let arr1: TestEntity[] = [1, 2, 3].map(toEntity);
            let arr2: TestEntity[] = [2, 3, 4].map(toEntity);

            let expected: TestEntity[] = [arr1[1], arr1[2]];

            var result = sut.intersectEntities(arr1, arr2);

            expect(result.length).toBe(2);
            expect(result.indexOf(expected[0])).toBeGreaterThan(-1);
            expect(result.indexOf(expected[1])).toBeGreaterThan(-1);
        });

        it('intersectEntities executes as expected without overlap', () => {

            let arr1 = [1, 2, 3].map(toEntity);
            let arr2 = [4, 5, 6].map(toEntity);

            var result = sut.intersectEntities(arr1, arr2);

            expect(result.length).toBe(0);
        });
    });

    // exclude
    describe('exclude', () => {

        it('exclude executes as expected with overlap', () => {

            let arr1: number[] = [1, 2, 3];
            let arr2: number[] = [2, 3, 4];

            var result = sut.exclude(arr1, arr2);

            expect(result.length).toBe(1);
            expect(result.indexOf(1)).toBeGreaterThan(-1);
        });

        it('exclude executes as expected without overlap', () => {

            let arr1: number[] = [1, 2, 3];
            let arr2: number[] = [4, 5, 6];

            var result = sut.exclude(arr1, arr2);

            expect(result.length).toBe(3);
            expect(result.indexOf(1)).toBeGreaterThan(-1);
            expect(result.indexOf(2)).toBeGreaterThan(-1);
            expect(result.indexOf(3)).toBeGreaterThan(-1);
        });
    });

    // excludeEntity
    describe('excludeEntities', () => {

        it('excludeEntities executes as expected with overlap', () => {

            let arr1: TestEntity[] = [1, 2, 3].map(toEntity);
            let arr2: TestEntity[] = [2, 3, 4].map(toEntity);

            let expected: TestEntity = arr1[0];

            var result = sut.excludeEntities(arr1, arr2);

            expect(result.length).toBe(1);
            expect(result.indexOf(expected)).toBeGreaterThan(-1);
        });

        it('excludeEntities executes as expected without overlap', () => {

            let arr1 = [1, 2, 3].map(toEntity);
            let arr2 = [4, 5, 6].map(toEntity);

            var result = sut.excludeEntities(arr1, arr2);

            expect(result.length).toBe(3);
            expect(result.indexOf(arr1[0])).toBeGreaterThan(-1);
            expect(result.indexOf(arr1[1])).toBeGreaterThan(-1);
            expect(result.indexOf(arr1[2])).toBeGreaterThan(-1);
        });
    });


    function toEntity(id: number): TestEntity {
        return { id: id } as TestEntity;
    }
});


class TestEntity extends BaseEntity {

}

class TestEnumEntity extends BaseEnumEntity {

}