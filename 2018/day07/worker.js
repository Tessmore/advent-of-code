
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const WAIT = 60;


class Worker {
    constructor() {
        this.letter = null;
        this.timer = 0;
        this.workDone = {};
    }

    giveLetter(letter) {
        this.done = false;
        this.letter = letter;

        this.start = this.timer;
        this.end = alphabet.indexOf(letter) + WAIT;
    }

    hasWork() {
        return this.letter;
    }

    idle() {
        this.workDone[this.timer] = ".";
        this.timer += 1;
    }

    work() {
        this.workDone[this.timer] = this.letter;
        this.timer += 1;

        if (this.timer > (this.start + this.end)) {
            const copy = this.letter;
            this.letter = null;

            return copy;
        }

        return false;
    }
}

module.exports = Worker;
