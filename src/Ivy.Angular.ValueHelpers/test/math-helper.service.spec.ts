import 'jasmine';

import { MathHelper } from '../src/Services/math-helper.service';


describe('MathHelper', () => {

    // Variables & Constants
    let sut: MathHelper;

    // Setup
    beforeEach(() => sut = new MathHelper());


    // random
    it('random returns value between 0 and 1', () => {

        var randos = Array.from(Array(10).keys()).map(x => sut.random());

        for (var i = 0; i < randos.length; i++) {
            expect(randos[i]).toBeLessThanOrEqual(1);
            expect(randos[i]).toBeGreaterThanOrEqual(0);

        }
    });


    // floor
    it('floor rounds the value down', () => {

        var toFloor = Array.from(new Array(9).keys()).map((val, index) => index / 10);

        var floored = toFloor.map(x => sut.floor(x));

        for (var i = 0; i < floored.length; i++) {
            expect(floored[i]).toBe(0);
        }
    });


    // ceil
    it('ceil rounds the value up', () => {

        var toCeil = Array.from(new Array(9).keys()).map((val, index) => (index + 1) / 10);

        var ceiled = toCeil.map(x => sut.ceil(x));

        for (var i = 0; i < ceiled.length; i++) {
            expect(ceiled[i]).toBe(1);
        }
    });


    // round
    describe('round', () => { 

        it('round moves down on a value below .5', () => {

            let val = .49;

            expect(sut.round(val)).toBe(0);
        });

        it('round moves up on a value above .5', () => {

            let val = .5;

            expect(sut.round(val)).toBe(1);
        });

        it('round moves up on a value equal to .5', () => {

            let val = .51;

            expect(sut.round(val)).toBe(1);
        });

        it('round works as expected on an integer value', () => {

            let val = 1;

            expect(sut.round(val)).toBe(val);
        });
    });

    // pow
    describe('pow', () => {

        it('pow takes to power of 10', () => {

            let val = 10;
            let pow = 2;

            expect(sut.pow(val, pow)).toBe(10 * 10);
        });

        it('pow takes to power of 2', () => {

            let val = 2;
            let pow = 6;

            expect(sut.pow(val, pow)).toBe(2 * 2 * 2 * 2 * 2 * 2);
        });
    });

    // roundDecimal
    describe('roundDecimal', () => {

        it('roundDecimal works as expected for unrounded decimal', () => {

            let val = 1;

            expect(sut.roundDecimal(val, 2)).toBe(1);
        });

        it('roundDecimal works as expected for decimal rounded up', () => {

            let val = 0.049;

            expect(sut.roundDecimal(val, 2)).toBe(.05);
        });

        it('roundDecimal works as expected for decimal rounded down', () => {

            let val = 0.051;

            expect(sut.roundDecimal(val, 2)).toBe(.05);
        });

        it('roundDecimal works as expected for decimal at .5 exactly', () => {

            let val = 0.050;

            expect(sut.roundDecimal(val, 2)).toBe(.05);
        });
    });
});