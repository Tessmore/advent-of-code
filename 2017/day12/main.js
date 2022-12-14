"use strict";

/*
  --- Day 12: Digital Plumber ---

  Walking along the memory banks of the stream, you find a small village that is
  experiencing a little confusion: some programs can't communicate with each
  other.

  Programs in this village communicate using a fixed system of pipes. Messages
  are passed between programs using these pipes, but most programs aren't
  connected to each other directly. Instead, programs pass messages between each
  other until the message reaches the intended recipient.

  For some reason, though, some of these messages aren't ever reaching their
  intended recipient, and the programs suspect that some pipes are missing. They
  would like you to investigate.

  You walk through the village and record the ID of each program and the IDs
  with which it can communicate directly (your puzzle input). Each program has
  one or more programs with which it can communicate, and these pipes are
  bidirectional; if 8 says it can communicate with 11, then 11 will say it can
  communicate with 8.

  You need to figure out how many programs are in the group that contains
  program ID 0.

  For example, suppose you go door-to-door like a travelling salesman and record
  the following list:

  0 <-> 2
  1 <-> 1
  2 <-> 0, 3, 4
  3 <-> 2, 4
  4 <-> 2, 3, 6
  5 <-> 6
  6 <-> 4, 5

  In this example, the following programs are in the group that contains program ID 0:

  Program 0 by definition.
  Program 2, directly connected to program 0.
  Program 3 via program 2.
  Program 4 via program 2.
  Program 5 via programs 6, then 4, then 2.
  Program 6 via programs 4, then 2.

  Therefore, a total of 6 programs are in this group; all but program 1,
  which has a pipe that connects it to itself.

  How many programs are in the group that contains program ID 0?


  --- Part Two ---

  There are more programs than just the ones in the group containing program ID 0. The rest of them have no way of reaching that group, and still might have no way of reaching each other.

  A group is a collection of programs that can all communicate via pipes either directly or indirectly. The programs you identified just a moment ago are all part of the same group. Now, they would like you to determine the total number of groups.

  In the example above, there were 2 groups: one consisting of programs 0,2,3,4,5,6, and the other consisting solely of program 1.

  How many groups are there in total?

*/

const input = require('fs').readFileSync('input.txt', 'utf8');
const lines = input.split(/\n/g);


function Node(id, connections) {
    this.id = id;
    this.connections = [];


    this.add = function(otherNode) {
        if (otherNode.id === this.id) {
            return;
        }

        if (!this.exists(otherNode)) {
            this.connections.push(otherNode);
        }
    };


    this.exists = function(otherNode) {
        id = otherNode.id;

        for (var i=0; i < this.connections.length; i++) {
            if (this.connections[i].id === id) {
                return true;
            }
        }

        return false;
    };


    this.traverse = function(seen) {
        if (seen.indexOf(this.id) >= 0) {
            return seen;
        }

        seen.push(this.id);

        for (var i=0; i < this.connections.length; i++) {
            var conn = this.connections[i];

            if (seen.indexOf(conn.id) >= 0) {
                continue;
            }

            this.connections[i].traverse(seen);
        }

        return seen;
    }
}


function Graph() {
    this.nodes = [];
    this._ids = [];


    this.add = function(id) {
        id = Number(id);

        var node = null;

        if (this._ids.indexOf(id) >= 0) {
            node = this.find(id);
        }
        else {
            node = new Node(id);

            this.nodes.push(node);
            this._ids.push(id);
        }

        return node;
    };


    this.find = function(id) {
        id = Number(id);

        for (var i=0; i < this.nodes.length; i++) {
            if (this.nodes[i].id === id) {
                return this.nodes[i];
            }
        }

        return null;
    };


    this.connect = function(left, right) {
        if (left && right) {
            left.add(right);
        }
    };


    this.traverse = function(startId, seen) {
        if (!seen || typeof seen === "undefined") {
            seen = [];
        }

        var start = this.find(startId);
        return start.traverse(seen);
    }
};


var Pipes = new Graph();


for (var i=0; i < lines.length; i++) {
    var line = lines[i].split(" <-> ");

    var pipe = Pipes.add(line[0]);
    var connect = line[1].split(",");

    for (var j=0; j < connect.length; j++) {
        var otherPipe = Pipes.add(connect[j]);
        Pipes.connect(pipe, otherPipe);
    };
}


// Part 1;
var group0 = Pipes.traverse(0);
console.log("Group 0:", group0.length);


// Part 2.
var separate = 0;
var found = [];

for (var i=0; i < lines.length; i++) {
    if (found.indexOf(i) < 0) {
        var group = Pipes.traverse(i);
        found = found.concat(group);
        separate++;
    }
}

console.log("Seperate groups:", separate);
