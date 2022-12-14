"use strict";

/*
  --- Day 8: I Heard You Like Registers ---

  You receive a signal directly from the CPU. Because of your recent assistance with jump instructions, it would like you to compute the result of a series of unusual register instructions.

  Each instruction consists of several parts: the register to modify, whether to increase or decrease that register's value, the amount by which to increase or decrease it, and a condition. If the condition fails, skip the instruction without modifying the register. The registers all start at 0. The instructions look like this:

  b inc 5 if a > 1
  a inc 1 if b < 5
  c dec -10 if a >= 1
  c inc -20 if c == 10

  These instructions would be processed as follows:

  Because a starts at 0, it is not greater than 1, and so b is not modified.
  a is increased by 1 (to 1) because b is less than 5 (it is 0).
  c is decreased by -10 (to 10) because a is now greater than or equal to 1 (it is 1).
  c is increased by -20 (to -10) because c is equal to 10.

  After this process, the largest value in any register is 1.

  You might also encounter <= (less than or equal to) or != (not equal to). However, the CPU doesn't have the bandwidth to tell you what all the registers are named, and leaves that to you to determine.

  What is the largest value in any register after completing the instructions


  --- Part Two ---

  To be safe, the CPU also needs to know the highest value held in any register during this process so that it can decide how much memory to allocate to these operations. For example, in the above instructions, the highest value ever held was 10 (in register c after the third instruction was evaluated).

*/

const input = require('fs').readFileSync('input.txt', 'utf8');
const instructions = input.split(/\n/g);

var largest = -1;
var register = {};


// Init
for (var i=0; i < instructions.length; i++) {
    var tokens = instructions[i].split(" ");
    var name = tokens[0];

    register[name] = 0;
}


for (var i=0; i < instructions.length; i++) {
    var tokens = instructions[i].split(" ");

    var name = tokens[0];
    var call = theFunction(tokens[1]);
    var value = Number(tokens[2]);

    var left   = register[tokens[4]];
    var condition = tokens[5];
    var right  = tokens[6];

    if (evaluate(left, condition, right)) {
        call(name, value);

        if (register[name] > largest) {
            largest = register[name];
        }
    }
}


function theFunction(fn) {
    if (fn === "inc") {
        return function(name, value) {
            register[name] += value;
        }
    }
    else if (fn === "dec") {
        return function(name, value) {
            register[name] -= value;
        }
    }

    return function() {
    }
}


function evaluate(left, cond, right) {
    left = Number(left);
    right = Number(right);

    var result = false;

    if (cond === "==") {
        result = left === right;
    }
    else if (cond === "!=") {
        result = left !== right;
    }
    else if (cond === ">") {
        result = left > right;
    }
    else if (cond === ">=") {
        result = left >= right;
    }
    else if (cond === "<") {
        result = left < right;
    }
    else if (cond === "<=") {
        result = left <= right;
    }


    return result;
}


function maxSize(register) {
    var max = -1;

    for (var k in register) {
        if (register[k] > max) {
            max = register[k];
        }
    }

    return max;
}


console.log(maxSize(register), largest);
