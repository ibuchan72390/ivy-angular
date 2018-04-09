import 'jasmine';

import { TestBed } from '@angular/core/testing';

import { IvyAngularLocalStorageModule } from '../ivy.angular.local-storage.module';

import { LocalStorageService } from '../src/Services/local-storage.service';
import { LocalStorageProviderService } from '../src/Services/local-storage-provider.service';

describe('LocalStorageService', () => {

    // Variables
    let sut: LocalStorageService;
    let storageProvider: LocalStorageProviderService;

    // Setup
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                IvyAngularLocalStorageModule
            ]
        });

        sut = TestBed.get(LocalStorageService);
        storageProvider = TestBed.get(LocalStorageProviderService);
    });


    // Tests
    it('saveString executes as expected', () => {

        const key: string = 'KEY';
        const val: string = 'TEST';

        let mockStorage = jasmine.createSpyObj('storage', ['setItem']);

        spyOn(storageProvider, 'getLocalStorage').and.returnValue(mockStorage);

        sut.saveString(key, val);

        expect(storageProvider.getLocalStorage).toHaveBeenCalledTimes(1);

        expect(mockStorage.setItem).toHaveBeenCalledTimes(1);
        expect(mockStorage.setItem).toHaveBeenCalledWith(key, val);
    });

    it('getString executes as expected', () => {

        const key: string = 'KEY';
        const val: string = 'TEST';

        let mockStorage = jasmine.createSpyObj('storage', { 'getItem': val });

        spyOn(storageProvider, 'getLocalStorage').and.returnValue(mockStorage);

        let result = sut.getString(key);

        expect(result).toBe(val);
        expect(storageProvider.getLocalStorage).toHaveBeenCalledTimes(1);

        expect(mockStorage.getItem).toHaveBeenCalledTimes(1);
        expect(mockStorage.getItem).toHaveBeenCalledWith(key);
    });

    it('saveObject executes as expected', () => {

        const key: string = 'KEY';
        const val: TestClass = new TestClass();

        let mockStorage = jasmine.createSpyObj('storage', ['setItem']);

        spyOn(storageProvider, 'getLocalStorage').and.returnValue(mockStorage);

        sut.saveObject(key, val);

        expect(storageProvider.getLocalStorage).toHaveBeenCalledTimes(1);

        expect(mockStorage.setItem).toHaveBeenCalledTimes(1);

        let callVal = JSON.stringify(val);
        expect(mockStorage.setItem).toHaveBeenCalledWith(key, callVal);
    });

    it('getObject executes as expected', () => {

        const key: string = 'KEY';
        const val: TestClass = new TestClass();

        val.name = 'Name';
        val.id = 123;

        let returnVal = JSON.stringify(val);

        let mockStorage = jasmine.createSpyObj('storage', { 'getItem': returnVal });

        spyOn(storageProvider, 'getLocalStorage').and.returnValue(mockStorage);

        let result: TestClass = sut.getObject<TestClass>(key);

        // Testing object equality does not seem to work
        // Lets test attribute equality and set them in the mock above
        expect(result.name).toBe(val.name);
        expect(result.id).toBe(val.id);

        expect(storageProvider.getLocalStorage).toHaveBeenCalledTimes(1);

        expect(mockStorage.getItem).toHaveBeenCalledTimes(1);
        expect(mockStorage.getItem).toHaveBeenCalledWith(key);
    });

    it('remove executes as expected', () => {

        const key: string = 'KEY';

        let mockStorage = jasmine.createSpyObj('storage', ['removeItem']);

        spyOn(storageProvider, 'getLocalStorage').and.returnValue(mockStorage);

        sut.remove(key);

        expect(storageProvider.getLocalStorage).toHaveBeenCalledTimes(1);

        expect(mockStorage.removeItem).toHaveBeenCalledTimes(1);
        expect(mockStorage.removeItem).toHaveBeenCalledWith(key);
    });

    it('clear executes as expected', () => {

        let mockStorage = jasmine.createSpyObj('storage', ['clear']);

        spyOn(storageProvider, 'getLocalStorage').and.returnValue(mockStorage);

        sut.clear();

        expect(storageProvider.getLocalStorage).toHaveBeenCalledTimes(1);

        expect(mockStorage.clear).toHaveBeenCalledTimes(1);
    });
});

class TestClass {
    id: number;
    name: string;
}