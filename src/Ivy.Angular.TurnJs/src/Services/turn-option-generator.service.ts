import { Injectable } from '@angular/core';

@Injectable()
export class TurnOptionGeneratorService {

    generateTurnOptions(containerWidth: number,
        maxWidth: number, heightToWidthRatio: number): any {

        let width = containerWidth;

        if (width > maxWidth) {
            width = maxWidth;
        }

        let height = heightToWidthRatio * (width / 2);

        return {
            autoCenter: true,
            width: width,
            height: height
        };
    }
}