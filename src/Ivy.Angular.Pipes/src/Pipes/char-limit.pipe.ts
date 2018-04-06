import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ivyCharLimit' })
export class IvyAngularCharLimitPipe implements PipeTransform {

    transform(value: string, charLimit: number) {

        if (!charLimit || charLimit < 1) {
            throw 'char limit param required for ivyCharLimit pipe as a positive number value';
        }

        if (value) {
            if (value.length > charLimit) {

                value = value.substring(0, charLimit) + '...';
            }
        }

        return value;
    }
}