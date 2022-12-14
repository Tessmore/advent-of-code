const input = require("fs").readFileSync("input.txt", "utf8");
const lines = input.trim().split(/\r\n|\r|\n/g);

const findPatterns = [];

"abcdefghijklmnopqrstuvwxyz".split("").forEach((l) => {
    const up = l.toUpperCase();

    findPatterns.push(`${l}${up}`);
    findPatterns.push(`${up}${l}`);
});

const finder = new RegExp(`(${findPatterns.join("|")})`, "g");

let polymer = lines[0];

while (true) {
    const deletes = polymer.replace(new RegExp(finder, "g"), "");

    if (deletes.length === polymer.length) {
        break;
    }

    polymer = deletes;
}

console.log(polymer.length);
