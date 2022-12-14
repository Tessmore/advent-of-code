

const input = require("fs").readFileSync("input.txt", "utf8");
const lines = input.trim().split(/\r\n|\r|\n/g);

const levenshtein = require("fast-levenshtein");

let minDiff = 100;
let closestPair = [];

for (let i=0; i < lines.length; i++) {
    for (let j=i+1; j < lines.length; j++) {
        if (i === j) {
            continue;
        }

        const diff = levenshtein.get(lines[i], lines[j]);

        if (diff < minDiff) {
            minDiff = diff;
            closestPair = [lines[i], lines[j]];
        }
    }
}


let remain = "";
const [A, B] = closestPair;

for (let i=0; i < A.length; i++) {
    if (A[i] === B[i]) {
        remain += A[i];
    }
}

console.log(remain);
