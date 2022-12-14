const input = require("fs").readFileSync("input.txt", "utf8");
const lines = input.trim().split(/\r\n|\r|\n/g);

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const findPatterns = [];

alphabet.split("").forEach((l) => {
    const up = l.toUpperCase();

    findPatterns.push(`${l}${up}`);
    findPatterns.push(`${up}${l}`);
});

const finder = new RegExp(`(${findPatterns.join("|")})`, "g");


let min = 11590;

for (const l of alphabet.split("")) {
    const len = cleanExtra(lines[0], l);

    if (len < min) {
        min = len;
    }
}

console.log(min);


function cleanExtra(input, letter) {
    let polymer = input.replace(new RegExp(letter, "gi"), "");


    while (true) {
        const deletes = polymer.replace(new RegExp(finder, "g"), "");

        if (deletes.length === polymer.length) {
            break;
        }

        polymer = deletes;
    }

    return polymer.length;
}
