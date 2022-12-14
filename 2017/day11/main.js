"use strict";

/*
  --- Day 11: Hex Ed ---

  Crossing the bridge, you've barely reached the other side of the stream when a program comes up to you, clearly in distress. "It's my child process," she says, "he's gotten lost in an infinite grid!"

  Fortunately for her, you have plenty of experience with infinite grids.

  Unfortunately for you, it's a hex grid.

  The hexagons ("hexes") in this grid are aligned such that adjacent hexes can be found to the north, northeast, southeast, south, southwest, and northwest:

    \ n  /
  nw +--+ ne
    /    \
  -+      +-
    \    /
  sw +--+ se
    / s  \
  You have the path the child process took. Starting where he started, you need to determine the fewest number of steps required to reach him. (A "step" means to move from the hex you are in to any adjacent hex.)

  For example:

  ne, ne, ne is 3 steps away.
  ne, ne, sw, sw is 0 steps away (back where you started).
  ne, ne, s, s is 2 steps away (se,se).
  se, sw, se, sw, sw is 3 steps away (s,s,sw).


  --- Part Two ---

  How many steps away is the furthest he ever got from his starting position?

*/

const input = require('fs').readFileSync('input.txt', 'utf8');
const directions = input.split(/,/g);

var position = {
    "x": 0,
    "y": 0,
};

var walk = {
    "nw" : function(pos)  {
        // (-1,1),
        pos.x -= 1;
        pos.y += 1;
        return pos;
    },

    "n"  : function(pos) {
        // (0,2),
        pos.x += 0;
        pos.y += 2;
        return pos;
    },

    "ne"  : function(pos) {
        // (1,1),
        pos.x += 1;
        pos.y += 1;
        return pos;
    },

    "se"  : function(pos) {
        // (1, -1),
        pos.x += 1;
        pos.y -= 1;
        return pos;
    },

    "s"  : function(pos) {
        // (0, -2),
        pos.x += 0;
        pos.y -= 2;
        return pos;
    },

    "sw"  : function(pos) {
        // (-1, -1),
        pos.x -= 1;
        pos.y -= 1;
        return pos;
    }
}

var distance = function(pos) {
    return (Math.abs(position.x) + Math.abs(position.y)) / 2;
}


var maxSteps = -1;

for (var i=0; i < directions.length; i++) {
    var dir = directions[i].trim();

    position = walk[dir](position);

    var dist = distance(position);

    if (dist > maxSteps) {
        maxSteps = dist;
    }
}


console.log(position, "distance=", distance(position), "max=", maxSteps);
