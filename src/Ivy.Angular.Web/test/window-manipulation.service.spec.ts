import 'jasmine';

import { TestBed } from '@angular/core/testing';

import { IvyWebModule } from '../ivy.web.module';

import { WindowManipulationService } from '../src/Services/window-manipulation.service';
import { WindowRefService } from '../src/Services/window-ref.service';

describe('WindowManipulationService', () => {

    // Variables
    let sut: WindowManipulationService;


    // Setup
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                IvyWebModule
            ]
        });

        sut = TestBed.get(WindowManipulationService);
    });


    // Tests
    it('scrollToTop properly executes the scrollTo function', () => {

        let windowRef: WindowRefService = TestBed.get(WindowRefService);

        let window = {
            scrollTo: jasmine.createSpy()
        };

        spyOnProperty(windowRef, 'nativeWindow', 'get').and.returnValue(window);

        sut.scrollToTop();

        expect(window.scrollTo).toHaveBeenCalledTimes(1);
        expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    });
});