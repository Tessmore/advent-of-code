
points = set()
folds = []

while True:
    try:
        line = input()

        if line.startswith("fold along y"):
            (_, y) = line.split("=")
            folds.append(
                (int(y), 0)
            )
        elif line.startswith("fold along x"):
            (_, x) = line.split("=")
            folds.append(
                (0, int(x))
            )
        elif line:
            (a, b) = line.split(",")
            points.add(
                (int(b), int(a))
            )

    except EOFError:
        break

print(folds)
print("")

for (x, y) in folds:
    newPoints = set()

    for (a, b) in points:

        if x > 0 and a > x:
            diff = 2 * abs(a - x)
            newPoints.add(
                (a - diff, b)
            )

        elif y > 0 and b > y:
            diff = 2 * abs(b - y)
            newPoints.add(
                (a, b - diff)
            )
        else:
            # Unchanged
            newPoints.add((a, b))

    points = newPoints


N = 40
K = 10
grid = []

for i in range(K):
    grid.append(
        [" " for _ in range(N)]
    )

for (i, j) in points:
    grid[i][j] = "X"

for row in grid:
    print("".join(row))

print("")


