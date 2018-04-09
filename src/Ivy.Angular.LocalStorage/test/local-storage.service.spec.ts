import 'jasmine';

import { TestBed } from '@angular/core/testing';

import { IvyAngularLocalStorageModule } from '../ivy.angular.local-storage.module';

import { LocalStorageService } from '../src/Services/local-storage.service';

describe('LocalStorageService', () => {

    // Variables
    let sut: LocalStorageService;


    // Setup
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                IvyAngularLocalStorageModule
            ]
        });

        sut = TestBed.get(LocalStorageService);
    });


    // Tests
    //it('Sample Test', () => {
    //});
});