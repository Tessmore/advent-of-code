
class Line:
    nr = 0

    x1 = 0
    y1 = 0

    x2 = 0
    y2 = 0

    slope = None

    def __init__(self, nr):
        self.nr = nr

        (x, y)= input().split("->")
        (x1, y1) = [int(i) for i in x.split(",")]
        (x2, y2) = [int(i) for i in y.split(",")]

        self.x1 = x1
        self.x2 = x2

        self.y1 = y1
        self.y2 = y2

        if  (x2 - x1) > 0:
            self.slope = (y2 - y1) / (x2 - x1)

    def is_vertical(self):
        return self.x1 == self.x2

    def is_horizontal(self):
        return self.y1 == self.y2

    def overlap(self, other):
        print("CHECKING")
        self.show()
        other.show()

        return 0

    def show(self):
        print(self.x1, self.y1, "->", self.x2, self.y2)


lines = []

nr = 0

while True:
    try:
        tmp = Line(nr)

        # Part 1: Only horizontal lines
        if tmp.is_horizontal() or tmp.is_vertical():
            lines.append(tmp)
            nr += 1

    except EOFError:
        break

print("LEN", len(lines))

for a in lines:
    for b in lines:
        # Ignore comparing a line against itself
        # Ignore lines with a different slope (part 1)
        if a.nr <= b.nr:
            continue

        if a.is_vertical() and not b.is_vertical():
            continue

        if a.is_horizontal() and not b.is_horizontal():
            continue

        print(a.overlap(b))
        print("---")

        # break

