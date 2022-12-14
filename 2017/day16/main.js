"use strict";

/* --- Day 16: Permutation Promenade ---

    You come upon a very unusual sight; a group of programs here appear to be dancing.

    There are sixteen programs in total, named a through p. They start by standing
    in a line: a stands in position 0, b stands in position 1, and so on until p,
    which stands in position 15.

    The programs' dance consists of a sequence of dance moves:

    Spin, written sX, makes X programs move from the end to the front, but maintain
    their order otherwise. (For example, s3 on abcde produces cdeab). Exchange,
    written xA/B, makes the programs at positions A and B swap places. Partner,
    written pA/B, makes the programs named A and B swap places. For example, with
    only five programs standing in a line (abcde), they could do the following
    dance:

    - s1, a spin of size 1: eabcd.
    - x3/4, swapping the last two programs: eabdc.
    - pe/b, swapping programs e and b: baedc.

    You watch the dance for a while and record their dance moves (your puzzle
    input). In what order are the programs standing after their dance?
*/

const input = require('fs').readFileSync('input.txt', 'utf8');
const instructions = input.split(/,/g);

var programs = "abcdefghijklmnop".split("");

// -------
// Part 1.

for (var i=0; i < instructions.length; i++) {
    var action = instructions[i];
    var command = action.slice(1);

    if (action[0] === "s") {
        spin(Number(command))
    }
    else if (action[0] === "x") {
        var split = command.split("/");
        var left  = Number(split[0]);
        var right = Number(split[1]);

        swap(left, right);
    }
    else if (action[0] === "p") {
        var split = command.split("/");
        var left  = programs.indexOf(split[0]);
        var right = programs.indexOf(split[1]);

        swap(left, right);
    }
}

var part1 = programs.join("");  // Gives bkgcdefiholnpmja


// -------
// Part 2.
//
// * Do the dance 1000000000 times (check 1000 runs first and see)

// bkgcdefiholnpmja 0
// bkgcdefiholnpmja 60
// bkgcdefiholnpmja 120
// bkgcdefiholnpmja 180
// bkgcdefiholnpmja 240
// bkgcdefiholnpmja 300
// bkgcdefiholnpmja 360
// bkgcdefiholnpmja 420
// bkgcdefiholnpmja 480
// bkgcdefiholnpmja 540
// bkgcdefiholnpmja 600
// bkgcdefiholnpmja 660
// bkgcdefiholnpmja 720
// bkgcdefiholnpmja 780
// bkgcdefiholnpmja 840
// bkgcdefiholnpmja 900
// bkgcdefiholnpmja 960


var counter = 0;

while (counter < 1000000000 % 60) {
    console.log(programs.join(""), counter);

    for (var i=0; i < instructions.length; i++) {
        var action = instructions[i];
        var command = action.slice(1);

        if (action[0] === "s") {
            spin(Number(command))
        }
        else if (action[0] === "x") {
            var split = command.split("/");
            var left  = Number(split[0]);
            var right = Number(split[1]);

            swap(left, right);
        }
        else if (action[0] === "p") {
            var split = command.split("/");
            var left  = programs.indexOf(split[0]);
            var right = programs.indexOf(split[1]);

            swap(left, right);
        }
    }

    counter++;
}



function spin(size) {
    var end = programs.slice(-size);
    var start = programs.slice(0, programs.length - size);

    programs = end.concat(start);
}


function swap(left, right) {
    var temp = programs[left];

    programs[left] = programs[right];
    programs[right] = temp;
}