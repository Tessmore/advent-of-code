
import math
from functools import reduce
from math import floor


# With python 3.9 there is `from math import lcm`
# Poor mans version:
# https://stackoverflow.com/a/70489271/951517
def lcm(arr):
    l=reduce(lambda x,y:(x*y)//math.gcd(x,y),arr)
    return l

monks = []

class Monkey:
    inspections = 0

    items = []
    divideBy = 1
    monkeyTrue = -1
    monkeyFalse = -1
    operation = ""
    modulo = 1

    def __init__(self, index, items, operation, test, truthy, falsy):
        self.index = index

        if operation:
            self.operation = operation

        if items:
            self.items = [int(x) for x in items.split(",")]

        if test:
            tmp = test.replace("divisible by ", "")
            self.divideBy = int(tmp)

        if truthy:
            tmp = truthy.replace("throw to monkey ", "")
            self.monkeyTrue = int(tmp)

        if falsy:
            tmp = falsy.replace("throw to monkey ", "")
            self.monkeyFalse = int(tmp)

    def worryPart1(self, item):
        return floor(eval(self.operation, { "old": item }) / 3)

    def worryPart2(self, item):
        return floor(eval(self.operation, { "old": item }) % self.modulo)

    def accept(self, item):
        self.items.append(item)

    def inspect(self):
        global monks

        while self.items:
            self.inspections += 1
            item = self.items.pop(0)
            newItem = self.worryPart2(item)

            if newItem % self.divideBy == 0:
                monks[self.monkeyTrue].accept(newItem)
            else:
                monks[self.monkeyFalse].accept(newItem)

while True:
    try:
        line = input()

        if "Monkey" in line:
            [_, index] = line.rstrip(":").split(" ")

            items = input().replace("Starting items:", "").strip()
            operation = input().replace("Operation:", "").replace("new = ", "").strip()
            test = input().replace("Test:", "").strip()
            truthy = input().replace("If true:", "").strip()
            falsy = input().replace("If false:", "").strip()

            tmp = Monkey(index, items, operation, test, truthy, falsy)
            monks.append(tmp)

    except EOFError:
        break


# # Part 1
# [a, b, *rest] = sorted([m.inspections for m in monks], reverse=True)
# print(a * b)

# For part 2
# Calculate the lowest common denominator and update it to manage
# operations with huge numbers
toModulo = lcm([m.divideBy for m in monks])

for m in monks:
    m.modulo = toModulo

for i in range(10000):
    for m in monks:
        m.inspect()

[a, b, *rest] = sorted([m.inspections for m in monks], reverse=True)
print(a * b)
