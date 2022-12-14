
const input = require("fs").readFileSync("input.txt", "utf8");

const lines = input.trim().split(/\r\n|\r|\n/g);
const claims = lines.map((l) => parseClaim(l));


for (let i=0; i < claims.length; i++) {
    let noOverlap = true;

    for (let j=0; j < claims.length; j++) {
        if (i === j) {
            continue;
        }

        if (hasOverlap(claims[i], claims[j])) {
            noOverlap = false;
            break;
        }
    }

    if (noOverlap) {
        console.log(claims[i], lines[i]);
    }
}

function hasOverlap(claimA, claimB) {
    return new Set([...claimA].filter(x => claimB.has(x))).size > 0;
}

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
