
const _ = require("lodash");
const input = require("fs").readFileSync("small.txt", "utf8");
const lines = input.trim().split(/\r\n|\r|\n/g);

const data = lines[0].split(" ");

const tree = [];

const node = {
    child: 0,
    meta: 0,

    children: [],
    entries : []
};


let actions = ["new", "children", "entries", "done"];
let action = actions[0];

let currentNode = null;

for (let i = 0; i < data.length; i++) {
    console.log("PEEK", data[i], data[i+1], currentNode);

    if (action === "new") {
        currentNode = _.clone(node);

        currentNode.child = data[i];
        currentNode.meta = data[i+1];

        i += 1;

        action = "children";
    }

    if (action === "children") {
        currentNode.children.push(data[i]);

        if (currentNode.children.length === currentNode.child) {
            action = "entries";
        }
    }

    if (action === "entries") {
        currentNode.entries.push(data[i]);

        if (currentNode.entries.length === currentNode.meta) {
            action = "done";
        }
    }

    if (action === "done") {
        tree.push(currentNode);
        action = "new";

        break;
    }
}


console.log("NODES", tree);
