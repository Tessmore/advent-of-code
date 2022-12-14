"use strict";

/*
  --- Day 10: Knot Hash ---

  --- Part Two ---

  The logic you've constructed forms a single round of the Knot Hash algorithm; running the full thing requires many of these rounds. Some input and output processing is also required.

  First, from now on, your input should be taken not as a list of numbers, but as a string of bytes instead. Unless otherwise specified, convert characters to bytes using their ASCII codes. This will allow you to handle arbitrary ASCII strings, and it also ensures that your input lengths are never larger than 255. For example, if you are given 1,2,3, you should convert it to the ASCII codes for each character: 49,44,50,44,51.

  Once you have determined the sequence of lengths to use, add the following lengths to the end of the sequence: 17, 31, 73, 47, 23. For example, if you are given 1,2,3, your final sequence of lengths should be 49,44,50,44,51,17,31,73,47,23 (the ASCII codes from the input string combined with the standard length suffix values).

  Second, instead of merely running one round like you did above, run a total of 64 rounds, using the same length sequence in each round. The current position and skip size should be preserved between rounds. For example, if the previous example was your first round, you would start your second round with the same length sequence (3, 4, 1, 5, 17, 31, 73, 47, 23, now assuming they came from ASCII codes and include the suffix), but start with the previous round's current position (4) and skip size (4).

  Once the rounds are complete, you will be left with the numbers from 0 to 255 in some order, called the sparse hash. Your next task is to reduce these to a list of only 16 numbers called the dense hash. To do this, use numeric bitwise XOR to combine each consecutive block of 16 numbers in the sparse hash (there are 16 such blocks in a list of 256 numbers). So, the first element in the dense hash is the first sixteen elements of the sparse hash XOR'd together, the second element in the dense hash is the second sixteen elements of the sparse hash XOR'd together, etc.

  For example, if the first sixteen elements of your sparse hash are as shown below, and the XOR operator is ^, you would calculate the first output number like this:

  65 ^ 27 ^ 9 ^ 1 ^ 4 ^ 3 ^ 40 ^ 50 ^ 91 ^ 7 ^ 6 ^ 0 ^ 2 ^ 5 ^ 68 ^ 22 = 64
  Perform this operation on each of the sixteen blocks of sixteen numbers in your sparse hash to determine the sixteen numbers in your dense hash.

  Finally, the standard way to represent a Knot Hash is as a single hexadecimal string; the final output is the dense hash in hexadecimal notation. Because each number in your dense hash will be between 0 and 255 (inclusive), always represent each number as two hexadecimal digits (including a leading zero as necessary). So, if your first three numbers are 64, 7, 255, they correspond to the hexadecimal numbers 40, 07, ff, and so the first six characters of the hash would be 4007ff. Because every Knot Hash is sixteen such numbers, the hexadecimal representation is always 32 hexadecimal digits (0-f) long.

  Here are some example hashes:

  The empty string becomes a2582a3a0e66e6e86e3812dcb672a272.
  AoC 2017 becomes 33efeb34ea91902bb2f59c9920caa6cd.
  1,2,3 becomes 3efbe78a8d82f29979031a4aa0b16a9d.
  1,2,4 becomes 63960835bcdc130f0b66d7ff4f6a5a8e.

  Treating your puzzle input as a string of ASCII characters, what is the Knot Hash of your puzzle input? Ignore any leading or trailing whitespace you might encounter.
*/

const _ = require("lodash");

const input = require('fs').readFileSync('input.txt', 'utf8');
const ropeLengths = input.split("").map(s => s.charCodeAt(0)).concat([17, 31, 73, 47, 23])

const SIZE   = 256;
const ROUNDS = 64;


var rope = [];

// Init
for (var i=0; i < SIZE; i++) {
    rope[i] = i;
}

var cur_position = 0;
var skip         = 0;

for (var n=0; n < ROUNDS; n++) {
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
}


var denseHash = _.chunk(rope, 16).map(function(part) {
    return part[0] ^
      part[1] ^
      part[2] ^
      part[3] ^
      part[4] ^
      part[5] ^
      part[6] ^
      part[7] ^
      part[8] ^
      part[9] ^
      part[10] ^
      part[11] ^
      part[12] ^
      part[13] ^
      part[14] ^
      part[15] ^
      part[16]
});

var hexaHash = denseHash.map(function(num) {
    var hex = num.toString(16);
    return hex.length % 2 ? '0' + hex : hex;
});

console.log(hexaHash.join(""))
