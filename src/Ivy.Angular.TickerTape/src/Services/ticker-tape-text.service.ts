import { Injectable } from '@angular/core';

@Injectable()
export class TickerTapeTextService {

    prepareTickerText(text: string, charLength: number): string {

        // Let's add a space at the end so scroll through on a sentence doesn't cause it to touch
        let tickText = text + ' ';

        if (charLength > tickText.length) {
            let spaces = charLength - tickText.length;
            for (var i = 0; i < spaces; i++) {
                tickText += ' ';
            }
        }
        return tickText;
    }

    getText(tickText: string, charLength: number, ticks: number): string {

        let startIndex = ticks % tickText.length;

        let stripLength = startIndex + charLength;

        if (stripLength > tickText.length + 1) {

            // We're at the end of a word
            // We need to concatenate two parses

            let beginLen = stripLength - tickText.length;
            let endPiece = tickText.substring(startIndex, tickText.length);
            let beginPiece = tickText.substring(0, beginLen);

            return endPiece + beginPiece;

        } else {

            // We need to simply substring
            let endIndex = startIndex + charLength;

            return tickText.substring(startIndex, endIndex);
        }
    }
}