
grove1 = []
grove2 = []

while True:
    try:
        line = input()
        grove1.append(int(line))
        grove2.append(int(line) * 811589153)

    except EOFError:
        break

size = len(grove2)
lookup = [i for i in range(size)]

# For part 2 -> mix 10 times
for _ in range(10):
    for i, value in enumerate(grove2):
        # Nothing shifts for jump of "0"
        if value == 0:
            continue

        origin = lookup.index(i)
        newValue = lookup.pop(origin)

        # New offset (value can be negative)
        tmp = (origin + value)

        # Add items to the end to follow the example
        if tmp == 0:
            lookup.append(newValue)
        else:
            newIndex = tmp % (size - 1)
            lookup.insert(newIndex, newValue)


# # Part 1
# test = [grove1[i] for i in lookup]
# nulPos = test.index(0)

# t1 = test[(nulPos + 1000) % size]
# t2 = test[(nulPos + 2000) % size]
# t3 = test[(nulPos + 3000) % size]

# print("SUM: ", t1 + t2 + t3)

# Part 2
test = [grove2[i] for i in lookup]
nulPos = test.index(0)

t1 = test[(nulPos + 1000) % size]
t2 = test[(nulPos + 2000) % size]
t3 = test[(nulPos + 3000) % size]

print("SUM: ", t1 + t2 + t3)
