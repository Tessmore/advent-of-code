
# addx V takes two cycles to complete. After two cycles, the X register is increased by the value V. (V can be negative.)
# noop takes one cycle to complete. It has no other effect.

from math import floor

instructions = []

cycles = 0
spritePos = 0

updates = []
signals = []

crt = {
    0: ["."] * 40,
    1: ["."] * 40,
    2: ["."] * 40,
    3: ["."] * 40,
    4: ["."] * 40,
    5: ["."] * 40,
}

class Instruction:
    def tick(self):
        pass

    def update(self, newX = None):
        global cycles
        global signals
        global updates

        cycles += 1
        current = 1 + sum(updates)

        self.draw(current)

        if cycles in {20, 60, 100, 140, 180, 220}:
            signals.append(cycles * current)

        if newX:
            updates.append(newX)

    def draw(self, x):
        global spritePos
        global crt

        drawPos = spritePos % 40

        if drawPos - 1 == x or drawPos == x or drawPos == x - 1:
            row = floor(spritePos/40)
            crt[row][drawPos] = "#"

        spritePos += 1

class Noop(Instruction):
    def __init__(self):
        pass

    def tick(self):
        self.update()

class AddX(Instruction):
    def __init__(self, value):
        self.value = int(value)

    def tick(self):
        self.update()
        self.update(self.value)

while True:
    try:
        line = input()

        if "noop" in line:
            instructions.append(Noop())
        elif "addx" in line:
            [_, value] = line.split(" ")
            instructions.append(AddX(value))

    except EOFError:
        break

for ins in instructions:
    ins.tick()


# Part 1
print(sum(signals))

# Part 2
print("")

for _, value in crt.items():
    print("".join(value))

print("")
