
const _ = require("lodash");
const input = require("fs").readFileSync("input.txt", "utf8");
const lines = input.trim().split(/\r\n|\r|\n/g);

const Worker = require("./worker");
const MAX_WORKERS = 5;
const workerPool = [];

for (let i=0; i < MAX_WORKERS; i++) {
    workerPool.push(new Worker());
}

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
const working  = [];

function getNextLetter() {
    const free = [];

    for (const l of available) {
        if (finished.includes(l) || working.includes(l)) {
            continue;
        }

        if (dependencies[l] && dependencies[l].length > 0) {
            continue;
        }

        free.push(l);
    }

    const sorted = _.sortBy(free);

    return sorted[0];
}

let timer = 0;

while (true) {
    const completed = [];

    for (const w of workerPool) {
        let done = false;

        if (w.hasWork()) {
            done = w.work();

            if (done) {
                completed.push(done);
            }
        }
        else {
            const next = getNextLetter();

            if (next) {
                working.push(next);
                w.giveLetter(next);
            }
        }

        if (!w.hasWork() && !done) {
            w.idle();
        }
    }


    // Free up (new) dependencies
    for (const done of completed) {
        finished.push(done);

        for (const l of available) {
            if (l in dependencies) {
                dependencies[l] = dependencies[l].filter((d) => d !== done);
            }
        }
    }

    timer++;

    if (finished.length === available.length) {
        break;
    }
}


for (let r = 0; r < timer; r++) {
    const row = [r];

    for (const w of workerPool) {
        row.push(w.workDone[r]);
    }

    console.log(row.join("\t\t"));
}

console.log("---")
console.log("Awnser", finished.join(""));
