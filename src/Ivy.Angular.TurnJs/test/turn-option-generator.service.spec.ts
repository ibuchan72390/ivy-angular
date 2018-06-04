import 'jasmine';

import { TestBed } from '@angular/core/testing';

import { TurnOptionGeneratorService } from '../src/Services/turn-option-generator.service';

import { IvyAngularTurnJsModule } from '../ivy.angular.turn-js.module';

describe('TurnOptionGeneratorService', () => {

    // Variables
    let sut: TurnOptionGeneratorService;


    // Setup
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                IvyAngularTurnJsModule.forRoot()
            ]
        });

        sut = TestBed.get(TurnOptionGeneratorService);
    });


    // Tests
    describe('generateTurnOptions', () => { 

        it('generateTurnOptions works as expected when width < maxWidth', () => {

            let width = 500;
            let maxWidth = 1000;
            let heightToWidthRatio = 2;

            var result = sut.generateTurnOptions(width, maxWidth, heightToWidthRatio);

            expect(result.width).toBe(width);

            let expectedHeight = heightToWidthRatio * (width / 2);

            expect(result.height).toBe(expectedHeight);
            expect(result.autoCenter).toBeTruthy();
        });

        it('generateTurnOptions works as expected when width > maxWidth', () => {

            let maxWidth = 500;
            let width = 1000;
            let heightToWidthRatio = 2;

            var result = sut.generateTurnOptions(width, maxWidth, heightToWidthRatio);

            expect(result.width).toBe(maxWidth);

            let expectedHeight = heightToWidthRatio * (maxWidth / 2);

            expect(result.height).toBe(expectedHeight);
            expect(result.autoCenter).toBeTruthy();
        });

        it('generateTurnOptions works as expected when override adds options', () => {

            let width = 500;
            let maxWidth = 1000;
            let heightToWidthRatio = 2;

            let overrides = {
                test: 'testing-attribute'
            };

            var result = sut.generateTurnOptions(width, maxWidth, heightToWidthRatio, overrides);

            expect(result.width).toBe(width);

            let expectedHeight = heightToWidthRatio * (width / 2);

            expect(result.height).toBe(expectedHeight);
            expect(result.autoCenter).toBeTruthy();
            expect(result.test).toBe(overrides.test);
        });

        it('generateTurnOptions works as expected when override edits options', () => {

            let width = 500;
            let maxWidth = 1000;
            let heightToWidthRatio = 2;

            let overrides = {
                autoCenter: false
            };

            var result = sut.generateTurnOptions(width, maxWidth, heightToWidthRatio, overrides);

            expect(result.width).toBe(width);

            let expectedHeight = heightToWidthRatio * (width / 2);

            expect(result.height).toBe(expectedHeight);
            expect(result.autoCenter).toBeFalsy();
        });
    });
});