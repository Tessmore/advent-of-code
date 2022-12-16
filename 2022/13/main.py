from functools import cmp_to_key

index = 1
correct = []

def comparePairs(p1, p2, indent = 0):
    # print(indent * "-", "Compare", p1, p2)

    if type(p1) == int and type(p2) == int:
        return p1 - p2

    if type(p1) == list and type(p2) is int:
        return comparePairs(p1, [p2], indent + 1)

    if type(p1) == int and type(p2) is list:
        return comparePairs([p1], p2, indent + 1)

    for l, r in zip(p1, p2):
        tmp = comparePairs(l, r, indent + 1)
        if tmp == 0:
            continue
        return tmp

    return len(p1) - len(p2)

while True:
    try:
        pair1 = eval(input())
        pair2 = eval(input())
        _ = input()

        # # Part 1
        # if comparePairs(pair1, pair2) <= 0:
        #     correct.append(index)
        # index += 1

        all.append(pair1)
        all.append(pair2)

    except EOFError:
        break

# # Part 1
# print(sum(correct))

# Part 2
custom = [
    [[2]],
    [[6]]
]

all = custom.copy()

temp = sorted(all, key=cmp_to_key(comparePairs))

# Index is zero based
pos1 = temp.index(custom[0]) + 1
pos2 = temp.index(custom[1]) + 1

print("Signal", pos1*pos2)
