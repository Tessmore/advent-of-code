
class Clock {
    constructor() {}

    setTime(time) {
        this.time = this.parse(time);
    }

    setEnd(time) {
        this.end = this.parse(time);
    }

    *tick() {
        const start = this.time;

        for (var i = start; i < start + 60; i++) {
            yield this.time;

            this.time = (this.time + 1) % 60;

            if (this.time === this.end) {
                break;
            }
        }
    }

    parse(time) {
        if (!time) {
            return 0;
        }

        const [, minutes] = time.split(":");
        return parseInt(minutes, 10);
    }
}

module.exports = Clock;
