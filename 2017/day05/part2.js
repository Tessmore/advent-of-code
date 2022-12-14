"use strict";

/*
    --- Day 5: A Maze of Twisty Trampolines, All Alike ---

    NOTE: Actually just use the array (lot easier then also producing the chart :)

    --- Part Two ---

    Now, the jumps are even stranger: after each jump, if the offset was three or more, instead decrease it by 1. Otherwise, increase it by 1 as before.

    Using this rule with the above example, the process now takes 10 steps, and the offset values after finding the exit are left as 2 3 2 3 -1.

    How many steps does it now take to reach the exit?
*/

const input = require('fs').readFileSync('input2.txt', 'utf8');
const blocks = input.split(/\n+/).map(s => Number(s));

var position = 0;
var counter  = 0;

while (position >= 0 && position < blocks.length) {
    var jump = blocks[position];
    blocks[position] += jump >= 3 ? -1 : 1;
    position += jump;

    counter++;
}

console.log(counter);
