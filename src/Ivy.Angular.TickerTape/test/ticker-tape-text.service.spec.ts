import 'jasmine';

import { TestBed } from '@angular/core/testing';

import { IvyAngularTickerTapeModule } from '../ivy.angular.ticker-tape.module';

import { TickerTapeTextService } from '../src/Services/ticker-tape-text.service';

describe('TickerTapeTextService', () => {

    // Variables
    let sut: TickerTapeTextService;

    const tickText = 'Hello there, this is my test text';


    // Setup
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                IvyAngularTickerTapeModule
            ]
        });

        sut = TestBed.get(TickerTapeTextService);
    });


    // Tests
    describe('prepareTickerText', () => {

        it('prepareTickerText works as expected when textLength less than char length', () => {

            let text = 'TEST'; 
            let charLen = 3;

            let result = sut.prepareTickerText(text, charLen);

            expect(result).toBe(text + ' ');
        });

        it('prepareTickerText works as expected when textLength greater than char length', () => {

            let text = 'TEST';
            let charLen = 10;

            let result = sut.prepareTickerText(text, charLen);

            let addedSpaces = charLen - text.length;

            for (var i = 0; i < addedSpaces; i++) {
                text += ' ';
            }

            expect(result).toBe(text);
        });
    });

    describe('getText', () => { 

        it('getText works as expected for substring of current text', () => {

            const charLen = 10;
            const ticks = 10;

            let expected = tickText.substring(ticks, ticks + charLen);

            let result = sut.getText(tickText, charLen, ticks);

            expect(result).toBe(expected);
        });

        it('getText works as expected for substring of the end of the provided text', () => {

            const fromEnd = 5;
            const charLen = 10;
            const ticks = tickText.length - fromEnd;

            let endStartPiece = tickText.substring(tickText.length - fromEnd, tickText.length);
            let beginEndPiece = tickText.substring(0, fromEnd);

            let expected = endStartPiece + beginEndPiece;

            let result = sut.getText(tickText, charLen, ticks);

            expect(result).toBe(expected);
        });

        it('getText works as expected if ticks is longer than the length of the text', () => {

            const charLen = 10;
            const tickBase = 10;
            const ticks = tickBase + (5 * tickText.length);

            let expected = tickText.substring(tickBase, tickBase + charLen);

            let result = sut.getText(tickText, charLen, ticks);

            expect(result).toBe(expected);
        });
    });
});