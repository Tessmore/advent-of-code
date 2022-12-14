
const _ = require("lodash");
const input = require("fs").readFileSync("input.txt", "utf8");
const lines = input.trim().split(/\r\n|\r|\n/g);


function safeLocations(limit = 10000, offset = 0, gridSize = 350) {
    const points = lines.map((l) => {
        const split = l.split(", ");
        return [+split[0] + offset, +split[1] + offset];
    });

    const locations = [];

    for (let x = 0; x < gridSize + offset; x++) {
        for (let y = 0; y < gridSize + offset; y++) {
            let distances = 0;

            for (let i = 0;  i < points.length; i++) {
                const d = calculateDistance(points[i], [x, y]);
                distances += d;
            }

            if (distances < limit) {
                locations.push([x, y]);
            }
        }
    }

    return locations;
}


const output = safeLocations();

console.log(output.length);


function calculateDistance(p1, p2) {
    return (Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]));
}
