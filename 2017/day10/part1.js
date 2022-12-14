"use strict";

/*
   --- Day 10: Knot Hash ---

  You come across some programs that are trying to implement a software emulation of a hash based on knot-tying. The hash these programs are implementing isn't very strong, but you decide to help them anyway. You make a mental note to remind the Elves later not to invent their own cryptographic functions.

  This hash function simulates tying a knot in a circle of string with 256 marks on it. Based on the input to be hashed, the function repeatedly selects a span of string, brings the ends together, and gives the span a half-twist to reverse the order of the marks within it. After doing this many times, the order of the marks is used to build the resulting hash.

    4--5   pinch   4  5           4   1
   /    \  5,0,1  / \/ \  twist  / \ / \
  3      0  -->  3      0  -->  3   X   0
   \    /         \ /\ /         \ / \ /
    2--1           2  1           2   5


  Algo:

  * begin with a list of numbers from 0 to 255,
  * a current position which begins at 0 (the first element in the list),
  * a skip size (which starts at 0),
  * and a sequence of lengths (your puzzle input).

  Then, for each length:
    * Reverse the order of that length of elements in the list,
        * starting with the element at the current position.

    * Move the current position forward by that length plus the skip size.

    * Increase the skip size by one.
*/

const input = require('fs').readFileSync('input.txt', 'utf8');
const ropeLengths = input.split(",").map(s => Number(s));
const SIZE = 256;

var rope = [];

var cur_position = 0;
var skip         = 0;


// Init
for (var i=0; i < SIZE; i++) {
    rope[i] = i;
}

for (var l=0; l < ropeLengths.length; l++) {
    var N = ropeLengths[l];
    var sublist = [];

    for (var t = 0; t < N; t++) {
        sublist.push(rope[(t + cur_position) % SIZE]);
    }

    sublist = sublist.reverse();

    for (var t = 0; t < N; t++) {
        rope[(t + cur_position) % SIZE] = sublist[t];
    }


    cur_position += ropeLengths[l] + skip;
    skip++;
}

console.log("Answer", rope[0] * rope[1]);