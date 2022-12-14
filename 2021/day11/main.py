
index = 0
size = 10

lines = []

# Initialize the grid of octopuses
while True:
    try:
        octos = [int(x) for x in input()]
        size = len(octos)
        lines.append(octos)

    except EOFError:
        break

class Wall:
    index = -1
    energy = -1
    counter = 0
    flashed = False

    def set_neighbors(self):
        pass
    def tick(self):
        pass
    def flash(self):
        pass
    def post_flash(self):
        pass

class Octopus:
    energy = 0
    counter = 0

    index = None
    neighbors = []

    flashed = False

    def __init__(self, energy, index):
        self.energy = int(energy)
        self.index = index

    def set_neighbors(self):
        p = self.index % size
        q = (size*size) - size

        tmp = [
            # ---
            # Row above

            # Left
            self.index - (size + 1) if p > 0 and self.index >= size else -1,

            # Top
            self.index - (size) if self.index >= size else -1,

            # Right
            (self.index - (size - 1)) if p < size-1 and self.index >= size else -1,

            # ---
            # Same row

            # Left
            self.index - 1 if p > 0 else -1,

            # Right
            self.index + 1 if p < size-1 else -1,

            # ---
            # Row under

            # Left
            self.index + (size - 1) if p > 0 and self.index < q else -1,

            # Bottom
            self.index + (size) if self.index < q else -1,

            # Right
            self.index + (size + 1) if p < size-1 and self.index < q else -1
        ]

        neighbors = []
        indexes = [x for x in tmp if x >= 0]

        for i in indexes:
            neighbors.append(grid[i])

        self.neighbors = neighbors

    def tick(self):
        self.energy += 1

    def flash(self):
        if self.flashed:
            return

        if self.energy > 9:
            self.counter += 1
            self.flashed = True

            for n in self.neighbors:
                n.tick()

            for n in self.neighbors:
                n.flash()

    def post_flash(self):
        if self.flashed:
            self.energy = 0


grid = []

for l in lines:
    for octo in l:
        grid.append(
            Octopus(octo, index)
        )
        index += 1

for g in grid:
    g.set_neighbors()

for i in range(1000):
    tmp = []

    for g in grid:
        # Re-initialize
        g.flashed = False
        g.tick()

    for g in grid:
        g.flash()

    for g in grid:
        g.post_flash()


    # for g in grid:
    #     tmp.append(g.energy)
    # chunked = [tmp[i:i+(size)] for i in range(len(tmp))[::(size)]]
    # for c in chunked:
    #     print(c)

    # print("")
    # print("After step", i)
    # print("-----------")
    # print("")

    # Part 2: Check if all octopuses have flashed
    part2 = []
    for g in grid:
        if g.energy == 0:
            part2.append(g.index)
        else:
            break

    if len(part2) == size*size:
        print("ALL FLASHED at step", i + 1)
        break

total = 0

for g in grid:
    total += g.counter

print(total)
