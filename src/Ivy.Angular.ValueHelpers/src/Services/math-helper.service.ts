import { Injectable } from '@angular/core';

@Injectable()
export class MathHelper {

    random(): number {
        return Math.random();
    }

    floor(val: number): number {
        return Math.floor(val);
    }

    ceil(val: number): number {
        return Math.ceil(val);
    }

    round(val: number): number {
        return Math.round(val);
    }

    pow(val: number, power: number): number {
        return Math.pow(val, power);    
    }

    roundDecimal(val: number, decimals: number): number {

        let roundPow = this.pow(10, decimals);
        let toRound = roundPow * val;
        toRound = this.round(toRound);
        return toRound / roundPow;
    }
}