
const input = require("fs").readFileSync("input.txt", "utf8");

const lines = input.trim().split(/\r\n|\r|\n/g);
const claims = lines.map((l) => parseClaim(l));


const fabric = {};

for (let i=0; i < claims.length; i++) {
    for (const point of claims[i]) {
        if (fabric[point]) {
            fabric[point] += 1;
        }
        else {
            fabric[point] = 1;
        }
    }
}

let overlaps = 0;

for (const p in fabric) {
    if (!p || fabric[p] < 2) {
        continue;
    }

    overlaps++;
}

console.log(overlaps);


function parseClaim(l) {
    const split = l.split(" ");
    const coords = split[2].replace(":", "").split(",").map(Number);
    const size   = split[3].split("x").map(Number);

    const taken = [];

    for (var x = coords[0]; x < coords[0]+size[0]; x++) {
        for (var y = coords[1]; y < coords[1]+size[1]; y++) {
            taken.push(`${x},${y}`);
        }
    }

    return new Set(taken);
}
