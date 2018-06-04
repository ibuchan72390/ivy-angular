import { Injectable } from '@angular/core';

@Injectable()
export class TurnOptionGeneratorService {

    generateTurnOptions(containerWidth: number,
        maxWidth: number, heightToWidthRatio: number,
        optionsOverrides: any = null): any {

        let width = containerWidth;

        if (width > maxWidth) {
            width = maxWidth;
        }

        let height = heightToWidthRatio * (width / 2);

        var opts: any = {
            autoCenter: true,
            width: width,
            height: height
        };

        if (optionsOverrides != null) {

            let overrideKeys = Object.keys(optionsOverrides);

            for (var i = 0; i < overrideKeys.length; i++) {

                let optKey = overrideKeys[i];

                opts[optKey] = optionsOverrides[optKey];
            }
        }

        return opts;
    }
}