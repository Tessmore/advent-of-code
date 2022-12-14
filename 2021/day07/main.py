import statistics
import math

initial = input().split(",")
crabs = []

l = [int(x) for x in initial]

class Crab:
    pos = 0

    def __init__(self, pos):
        self.pos = int(pos)

    def update(self, newPos):
        tmp = abs(self.pos - newPos)
        return tmp

    def update2(self, newPos):
        tmp = abs(self.pos - newPos)
        cost = 0.5 * tmp * (tmp + 1)

        return cost

moves = []

# Part 1
part1 = statistics.median(l)

for i in initial:
    c = Crab(i)
    crabs.append(c)
    moves.append(
        c.update(part1)
    )

print("Part 1", round(sum(moves)))

# Part 2
# Sadly `statistics.median_low` was incorrect... but it was close...
low = math.floor(statistics.median_low(l))
high = math.ceil(statistics.mean(l))

lowest = -1

for i in range(low, high, 1):
    moves_part2 = []

    for c in crabs:
        moves_part2.append(
            c.update2( round(i) )
        )

    fuel = sum(moves_part2)

    if lowest < 0 or fuel < lowest:
        lowest = round(fuel)

print("Part 2", lowest)
