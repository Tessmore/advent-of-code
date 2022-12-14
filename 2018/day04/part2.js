
const _ = require("lodash");
const input = require("fs").readFileSync("input.txt", "utf8");
const lines = input.trim().split(/\r\n|\r|\n/g);
const Clock = require("./clock");

const guards = {};

let current;
let clock = new Clock();

for (const l of lines) {
    const clean = l
        .replace("[", "")
        .replace("]", "")

    const [date, time, word, ID] = clean.split(/ /g);

    if (ID === "asleep") {
        clock.setTime(time);
    }
    else if (ID === "up") {
        clock.setEnd(time);

        for (let val of clock.tick()) {
            guards[current][val] += 1;
            guards[current]["total"] += 1;
        }
    }
    else if (ID && ID[0] === "#") {
        current = ID;

        if (!(ID in guards)) {
            guards[ID] = guardSlot(ID);
        }
    }
}


const bestTimes = [];

for (const g in guards) {
    if (!g || !guards[g]) {
        continue;
    }

    const guardsBest =  bestTime(guards[g]);

    bestTimes.push({
        "id": guards[g].id,
        "time": guardsBest,
        "value": guards[g][guardsBest]
    });
}

const part2 = _.maxBy(bestTimes, "value");
console.log("Answer", part2.time * part2.id);


function guardSlot(guardId) {
    const slot = {
        "id": parseInt(guardId.slice(1), 10),
        "total": 0
    };

    for (var i = 0; i < 60; i++) {
        slot[i] = 0;
    }

    return slot;
}

function bestTime(bestSleeper) {
    return _.maxBy(_.keys(bestSleeper), (o) => {
        if (o === "id" || o === "total") {
            return -1;
        }

        return bestSleeper[o];
    });
}
