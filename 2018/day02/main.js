
const input = require("fs").readFileSync("input.txt", "utf8");
const lines = input.trim().split(/\r\n|\r|\n/g);


let twos = 0;
let threes = 0;

for (const l of lines) {
    const counter = letterOccurences(l);

    twos += forCheckSum(counter, 2);
    threes += forCheckSum(counter, 3);
}

console.log(twos * threes);


function forCheckSum(counter, cmp = 2) {
    for (let k in counter) {
        if (!k || !counter[k]) {
            continue;
        }

        if (counter[k] === cmp) {
            return 1;
        }
    }

    return 0;
}

function letterOccurences(text) {
    const counter = {};
    const sorted = text.split("").sort();

    for (const char of sorted) {
        if (!counter[char]) {
            counter[char] = 1;
        }
        else {
            counter[char] += 1;
        }
    }

    return counter;
}
