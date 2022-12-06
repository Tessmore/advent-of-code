import numpy as np

part1 = 0
part2 = 0

def toDigits(letters):
    return [
        (
            ord(x) - (96 if x.islower() else 64)
            + (26 if x.isupper() else 0)
        )
        for x in letters
    ]

def toDigitSet(letters):
    return set(
        (
            ord(x) - (96 if x.islower() else 64)
            + (26 if x.isupper() else 0)
        )
        for x in letters
    )

# while True:
#     try:
#         letters = list(input())
#         digits = toDigits(letters)

#         tmp = np.array(digits)
#         [x, y] = np.split(tmp, 2)

#         # Only one item overlaps
#         intersect = set(x).intersection(set(y))

#         part1 += intersect.pop()


#     except EOFError:
#         break

# print(part1)


while True:
    try:
        L1 = toDigitSet(input())
        L2 = toDigitSet(input())
        L3 = toDigitSet(input())

        intersect = set(L1).intersection(L2, L3)
        part2 += intersect.pop()


    except EOFError:
        break

print(part2)


