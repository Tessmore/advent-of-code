"use strict";

/*  --- Part Two ---

    Generator A looks for values that are multiples of 4.
    Generator B looks for values that are multiples of 8.

    --Gen. A--  --Gen. B--
    1352636452  1233683848
    1992081072   862516352
     530830436  1159784568
    1980017072  1616057672
     740335192   412269392

    These values have the following corresponding binary values:

    01010000100111111001100000100100
    01001001100010001000010110001000

    01110110101111001011111010110000
    00110011011010001111010010000000

    00011111101000111101010001100100
    01000101001000001110100001111000

    01110110000001001010100110110000
    01100000010100110001010101001000

    00101100001000001001111001011000
    00011000100100101011101101010000


    Now, it's not until the 1056th pair that the judge finds the first match:

    --Gen. A--  --Gen. B--
    1023762912   896885216

    00111101000001010110000111100000
    00110101011101010110000111100000


    After 5 million pairs, but using this new generator logic, what is the
    judge's final count?
*/


class Generator {
    constructor(lastValue, factor, multipleOf) {
        this.value = lastValue;
        this.factor = factor;
        this.multipleOf = multipleOf;
    }

    next() {
        while (1) {
            this.value = (this.value * this.factor) % 2147483647;

            if (this.value % this.multipleOf === 0) {
                break;
            }
        }
    }

    get bits() {
        return this.value & 0xFFFF;
    }

    compare(Gen) {
        var left = this.bits;
        var right = Gen.bits;

        return left === right;
    }
}


var A = new Generator(679, 16807, 4);
var B = new Generator(771, 48271, 8);


var pairs = 0;
var N = 5 * 1000 * 1000;

for (var i=0; i < N; i++) {
    A.next();
    B.next();

    if (A.compare(B)) {
        pairs += 1;
    }
}

console.log(pairs);
