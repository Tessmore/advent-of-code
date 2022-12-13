import re
from collections import defaultdict

matcher = re.compile('move (?P<move>\d+) from (?P<from>\d+) to (?P<to>\d+)$')

# Part 1
indices = []
field = []
moves = []

# Get the stack
while True:
    try:
        line = input()

        if "[" in line:
            letters = line.replace("[", "").replace("]", "")
            field.append(letters.split(" "))
        elif "move" in line:
            m = matcher.search(line)
            found = m.groupdict()
            moves.append({
                "move": int(found["move"]),
                "from": int(found["from"]),
                "to": int(found["to"])
            })
        elif line:
            indices = line.strip().split("  ")

    except EOFError:
        break

stacks = defaultdict(list)

for i in range(len(indices)):
    # Reverse the stacks
    for f in field[::-1]:
        if f[i] != "_":
            stacks[i+1].append(f[i])

# Pop -> Add to other list
def movePart1(move, f, t):
    for _ in range(move):
        box = stacks[f].pop()
        stacks[t].append(box)

# Pop multiple -> add to other list "in one block"
def movePart2(move, f, t):
    tmp = []

    for _ in range(move):
        if stacks[f]:
            tmp.append(stacks[f].pop())

    #  Reverse the popped boxes since we want to maintain the order
    stacks[t] = stacks[t] + tmp[::-1]


for m in moves:
    # movePart1(m["move"], m["from"], m["to"])
    movePart2(m["move"], m["from"], m["to"])


output = ""

for i in range(len(indices)):
    if stacks[i+1]:
        output += stacks[i+1].pop()

print(output)
