import math

lines = []

while True:
    try:
        lines.append(input())

    except EOFError:
        break

points = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
}

autocomplete = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
}

part1 = 0

part2_lines = []

for line in lines:
    expected = []

    valid = True

    for c in line:
        if c == "(":
            expected.append(")")
        elif c == "[":
            expected.append("]")
        elif c == "{":
            expected.append("}")
        elif c == "<":
            expected.append(">")
        elif c == expected[-1]:
            expected.pop()
        else:
            # print("ERROR, expected", expected[-1], " but got ", c)

            part1 += points[c]
            valid = False
            break

    if valid:
        part2_lines.append((line, expected))


# print("part1", part1)

part2 = []

for (l, expected) in part2_lines:
    tmp = 0
    # Reverse to complete list
    for c in expected[::-1]:
        tmp *= 5
        tmp += autocomplete[c]

    part2.append(tmp)

part2.sort()

print("part2", part2[math.floor(len(part2)/2)])
