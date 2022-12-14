"use strict";

/* --- Day 17: Spinlock ---

    For example, if the spinlock were to step 3 times per insert, the circular buffer would begin to evolve like this (using parentheses to mark the current position after each iteration of the algorithm):

    (0), the initial state before any insertions.
    0 (1): the spinlock steps forward three times (0, 0, 0), and then inserts the first value, 1, after it. 1 becomes the current position.
    0 (2) 1: the spinlock steps forward three times (0, 1, 0), and then inserts the second value, 2, after it. 2 becomes the current position.
    0  2 (3) 1: the spinlock steps forward three times (1, 0, 2), and then inserts the third value, 3, after it. 3 becomes the current position.

    And so on:

    0  2 (4) 3  1
    0 (5) 2  4  3  1
    0  5  2  4  3 (6) 1
    0  5 (7) 2  4  3  6  1
    0  5  7  2  4  3 (8) 6  1
    0 (9) 5  7  2  4  3  8  6  1
*/


let sum = (a, b) => a + b;

const input = 335;

// --------------
// Part 1.

const N     = 2018;
var cur_pos = 0;
var buffer  = [0];

for (var i=1; i < N; i++) {
    var next_pos = ((cur_pos + input) % i) + 1;

    buffer.splice(next_pos, 0, i);
    cur_pos = next_pos;
}

var pos_2017 = buffer.indexOf(2017);
var part1    = buffer[pos_2017+1];

console.log("Part 1.", part1);



// --------------
// Part 2.

const K     = 50 * 1000 * 1000;
var cur_pos = 0;
var part2   = 1;

for (var i=1; i < K; i++) {
    var next_pos = ((cur_pos + input) % i) + 1;

    if (next_pos === 1) {
        part2 = i;
    }

    cur_pos = next_pos;
}

console.log("Part 2.", part2);
