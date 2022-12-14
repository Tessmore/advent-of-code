"use strict";

/*
  --- Part Two ---

  pbga (66)
  xhth (57)
  ebii (61)
  havc (66)
  ktlj (57)
  fwft (72) -> ktlj, cntj, xhth
  qoyq (66)
  padx (45) -> pbga, havc, qoyq
  tknk (41) -> ugml, padx, fwft
  jptl (61)
  ugml (68) -> gyxo, ebii, jptl
  gyxo (61)
  cntj (57)


  The programs explain the situation: they can't get down. Rather, they could get down, if they weren't expending all of their energy trying to keep the tower balanced. Apparently, one program has the wrong weight, and until it's fixed, they're stuck here.

  For any program holding a disc, each program standing on that disc forms a sub-tower. Each of those sub-towers are supposed to be the same weight, or the disc itself isn't balanced. The weight of a tower is the sum of the weights of the programs in that tower.

  In the example above, this means that for ugml's disc to be balanced, gyxo, ebii, and jptl must all have the same weight, and they do: 61.

  However, for tknk to be balanced, each of the programs standing on its disc and all programs above it must each match. This means that the following sums must all be the same:

  ugml + (gyxo + ebii + jptl) = 68 + (61 + 61 + 61) = 251
  padx + (pbga + havc + qoyq) = 45 + (66 + 66 + 66) = 243
  fwft + (ktlj + cntj + xhth) = 72 + (57 + 57 + 57) = 243

  As you can see, tknk's disc is unbalanced: ugml's stack is heavier than the other two. Even though the nodes above ugml are balanced, ugml itself is too heavy: it needs to be 8 units lighter for its stack to weigh 243 and keep the towers balanced. If this change were made, its weight would be 60.

  Given that exactly one program is the wrong weight, what would its weight need to be to balance the entire tower?
*/

const _ = require("lodash");

const input = require('fs').readFileSync('input.txt', 'utf8');
const lines = input.split(/\n/g);

var nodes = [];

for (var i=0; i < lines.length; i++) {
    var line = lines[i];

    var split = line.split("->");

    var self     = split[0].split(" ");
    var selfName = self[0].trim();
    var selfId   = self[1].trim();
    var weight   = Number(selfId.slice(1,-1));

    if (!split[1]) {
        nodes.push({
            "name": selfName,
            "weight": weight,
            "weights": [],
            "supporting": []
        });

        continue;
    }


    var supporting = (split[1] ? split[1].split(",") : []).map(s => s.trim());

    nodes.push({
        "name": selfName,
        "weight": weight,
        "weights": [],
        "supporting": supporting
    });
}


for (var i=0; i < nodes.length; i++) {
    var node = nodes[i];
    var parent = findParent(nodes, node.name);

    if (parent) {
        parent.weights.push([node.weight, node.weights]);
    }
    else {
        node.isRoot = true;
    }
}


var rootNode = nodes.filter(n => n.isRoot)[0];

findInbalanced(rootNode.weights);


function findParent(nodes, name) {
    for (var i=0; i < nodes.length; i++) {
        var node = nodes[i];

        if (node.name === name) {
            continue;
        }

        if (node.supporting.indexOf(name) >= 0) {
            return node;
        }
    }
}


function calculateSum(list) {
    var flat = _.flattenDeep(list);

    return flat.reduce((sum, w) => {
        return sum + w;
    }, 0);
}


function findInbalanced(list) {
    var max = -1;
    var index = -1;
    var balance = [];

    for (var w=0; w < list.length; w++) {
        var programWeight = calculateSum(list[w]);

        balance.push(programWeight);

        if (programWeight > max) {
            max = programWeight;
            index = w;
        }
    }


    if (max > 0 && _.uniq(balance).length > 1) {
        console.log(balance);
        console.log("to heavy:", max, "at index", index, "weight", list[index][0]);
        console.log("");

        return findInbalanced(list[index][1]);
    }
}