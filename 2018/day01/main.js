
const input = require("fs").readFileSync("input.txt", "utf8");
const lines = input.trim().split(/\r\n|\r|\n/g);

let result = 0;
let found = false;

const counter = {
    0: 1
};

while (!found) {
    for (const l of lines) {
        result += Number(l);

        if (result in counter) {
            console.log("DUPLICATE", result);
            found = true;
            break;
        }
        else {
            counter[result] = 1;
        }
    }
}

console.log("SUM", result);
