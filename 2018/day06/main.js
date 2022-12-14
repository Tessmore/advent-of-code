
const _ = require("lodash");
const input = require("fs").readFileSync("input.txt", "utf8");
const lines = input.trim().split(/\r\n|\r|\n/g);


function getGridScore(offset = 0, gridSize = 350) {
    const points = lines.map((l) => {
        const split = l.split(", ");
        return [+split[0] + offset, +split[1] + offset];
    });

    const gridScore = {};

    for (let i = 0;  i < points.length; i++) {
        gridScore[i] = 0;
    }

    for (let x = 0; x < gridSize + offset; x++) {
        for (let y = 0; y < gridSize + offset; y++) {
            let min = gridSize*2;
            let minIndex = null;

            for (let i = 0;  i < points.length; i++) {
                const d = calculateDistance(points[i], [x, y]);

                if (d === 0) {
                    min = d;
                    minIndex = i;
                }
                else if (d < min) {
                    min = d;
                    minIndex = i;
                }
                else if (d === min) {
                    minIndex = null;
                }
            }

            if (minIndex) {
                gridScore[minIndex] += 1;
            }
        }
    }

    return _.values(gridScore);
}


// Biggest number that doesn't get affected by scaling the grid
const output = getGridScore(0);
const withOffset = getGridScore(1);

const A = new Set(output);
const B = new Set(withOffset);
const intersection = new Set([...A].filter((x) => B.has(x)));

console.log(_.maxBy([...intersection]));


function calculateDistance(p1, p2) {
    return (Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]));
}
