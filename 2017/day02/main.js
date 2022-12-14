"use strict";

/* --- Day 2: Corruption Checksum ---

    For example, given the following spreadsheet:

    5 1 9 5
    7 5 3
    2 4 6 8

    The first row's largest and smallest values are 9 and 1, and their difference is 8.
    The second row's largest and smallest values are 7 and 3, and their difference is 4.
    The third row's difference is 6.
    In this example, the spreadsheet's checksum would be 8 + 4 + 6 = 18.

    What is the checksum for the spreadsheet in your puzzle input?


    --- Part Two ---

    "Great work; looks like we're on the right track after all. Here's a star for your effort." However, the program seems a little worried. Can programs be worried?

    "Based on what we're seeing, it looks like all the User wanted is some information about the evenly divisible values in the spreadsheet. Unfortunately, none of us are equipped for that kind of calculation - most of us specialize in bitwise operations."

    It sounds like the goal is to find the only two numbers in each row where one evenly divides the other - that is, where the result of the division operation is a whole number. They would like you to find those numbers on each line, divide them, and add up each line's result.

    For example, given the following spreadsheet:

    5 9 2 8
    9 4 7 3
    3 8 6 5

    In the first row, the only two numbers that evenly divide are 8 and 2; the result of this division is 4.
    In the second row, the two numbers are 9 and 3; the result is 3.
    In the third row, the result is 2.
    In this example, the sum of the results would be 4 + 3 + 2 = 9.

    What is the sum of each row's result in your puzzle input?
*/

const input = require('fs').readFileSync('input.txt', 'utf8');
const lines = input.split("\n");


function getRowSum(row) {
    var min = 1000000;
    var max = -1;

    for (var i=0; i < row.length; i++) {
        var column = Number(row[i]);

        if (column < min) {
            min = column;
        }

        if (column > max) {
            max = column;
        }
    }

    return max - min;
}


function isEven(num) {
    return num % 1 === 0;
}

function getSpreadSum(row) {
    var sum = 0;

    for (var i=0; i < row.length; i++) {
        for (var j=i+1; j < row.length; j++) {
            var numA = Number(row[i]);
            var numB = Number(row[j]);
            var res = 0;

            if (numA > numB) {
                res = numA / numB;
            }
            else {
                res = numB / numA;
            }

            if (isEven(res)) {
                sum += res;
            }
        }
    }

    return sum;
}


var checksum = 0;
var spreadsum = 0;

for (var i=0; i < lines.length; i++) {
    var row = lines[i].split(/\s+/);

    checksum += getRowSum(row);
    spreadsum += getSpreadSum(row);
}

console.log(checksum);
console.log(spreadsum);
