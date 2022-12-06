import numpy as np

part1 = 0
part2 = 0

def what(pair):
    [a, b] = pair.split("-")

    # #why-no-numpy
    return set([*range(int(a), int(b) + 1)])

# # Part 1
# while True:
#     try:
#         (x1, y1) = input().split(",")
#         x = what(x1)
#         y = what(y1)

#         if x.issubset(y) or y.issubset(x):
#             part1 += 1

#     except EOFError:
#         break

# Part 2
while True:
    try:
        (x1, y1) = input().split(",")
        x = what(x1)
        y = what(y1)

        if x.intersection(y):
            part2 += 1

    except EOFError:
        break


print(part1)
print(part2)
