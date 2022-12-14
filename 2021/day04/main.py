
# Usage: pyton main.py < input.txt

line = input().split(",")
maps = []

class BingoMat:
    """Let's go bingo"""

    nrs = []
    winner = False
    winLast = ""

    def __init__(self):
        input()

        horizontal = [
            input().split(),
            input().split(),
            input().split(),
            input().split(),
            input().split()
        ]

        # Transpose a list in python
        # https://stackoverflow.com/a/6473724/951517
        vertical = list(map(list, zip(*horizontal)))

        self.nrs = horizontal + vertical

    def check(self, current, last):
        if self.winner:
            return

        # Also keep track of any winning
        for row in self.nrs:
            if set(row).issubset(current):
                self.winner = row
                self.winLast = last
                break

    def calc_unused(self, called):
        r = []

        for row in self.nrs:
            r.extend(row)

        unused = set(r).difference(called)

        return sum([int(x) for x in unused])


# Assign everyone a bingo mat (exhausts input from stdin)
while True:
    try:
        maps.append(BingoMat())
    except EOFError:
        break

def main():
    # Start the bingo
    called = set()

    for n in line:
        called.add(n)

        for bm in maps:
            if bm.winner:
                continue

            bm.check(called, n)

            # Part 2: List all winners (and use the final one for scoring)
            if bm.winner:
                tmp = bm.calc_unused(called)
                print("WINNER", bm.winner)
                print("LAST NUMBER", int(n))
                print("SCORE", int(n) * tmp)

                # part 1) return early


if __name__ == "__main__":
    main()
