
const _ = require("lodash");
const input = require("fs").readFileSync("input.txt", "utf8");
const lines = input.trim().split(/\r\n|\r|\n/g);

const allLetters = [];
const dependencies = {};

for (const l of lines) {
    const [,dep,,,,,,letter] = l.split(" ");

    allLetters.push(dep);
    allLetters.push(letter);

    if (letter in dependencies) {
        dependencies[letter].push(dep);
    }
    else {
        dependencies[letter] = [dep];
    }
}


const available = _.uniq(allLetters);
const finished = [];

while (true) {
    const free = [];

    // Get free letters
    for (const l of available) {
        if (finished.includes(l)) {
            continue;
        }

        if (dependencies[l] && dependencies[l].length > 0) {
            continue;
        }

        free.push(l);
    }

    if (!free || !free.length) {
        break;
    }

    const sorted = _.sortBy(free);
    const going = _.first(sorted);

    finished.push(going);


    // Free up dependencies
    for (const l of available) {
        if (l in dependencies) {
            dependencies[l] = dependencies[l].filter((d) => d !== going);
        }
    }
}

console.log("Awnser", finished.join(""));
