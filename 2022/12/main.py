
# Plan
#  - Create tree from root -> connecting edges.
#  - Remove edges (or don't add edges?) if you cannot climb it

# Outcome
#  - Works for small input, but looking at our map there are many many
#    possible paths. Like there are >1000 of "a" and "c"
#  - The only "b" are right at the start, so falling down and climbing back up
#    is not an option

grid = []

rows = 0
cols = 0

start = None
end = None

startValue = ord("S")
startActual = ord("a")

endValue = ord("E")
endActual = ord("z")

while True:
    try:
        line = input()

        if "S" in line:
            start = (rows, line.index("S"))

        if "E" in line:
            end = (rows, line.index("E"))

        grid.append([ord(c) for c in line])

        cols = len(line)
        rows += 1

    except EOFError:
        break

def canClimb(value, other):
    diff = value - other

    # The "start" should be counted as "a"
    if value == startValue:
        diff = startActual - other

    # The "end" should be counted as "z"
    if other == endValue:
        diff = value - endActual

    # NOTE: We should not jump down too much
    return diff >= -1 and diff <= 3


def simpleBfs(graph, start, goal):
    explored = []
    queue = [[start]]

    while queue:
        path = queue.pop(0)
        node = path[-1]

        if node not in explored:
            for cell in graph[node]:
                if cell == goal:
                    return len(new_path) - 1

                new_path = list(path)
                new_path.append(cell)
                queue.append(new_path)

            explored.append(node)


##
# Create a connected graph, but remove nodes we cannot climb

# Up, down, right, left
directions = [(-1,0), (1,0), (0,1), (0,-1)]

graph = {}

for x, row in enumerate(grid):
    for y, col in enumerate(row):
        value = grid[x][y]

        nodes = []

        for offX, offY in directions:
            newRow = x + offX
            newCol = y + offY

            # Check if we can go up/down
            if newRow < 0 or newRow >= rows:
                continue

            # Check if we can go left/right
            if newCol < 0 or newCol >= cols:
                continue

            # Ignore if we cannot climb it
            newValue = grid[newRow][newCol]
            if not canClimb(value, newValue):
                continue

            nodes.append((newRow, newCol))

        graph[(x,y)] = nodes


# Part 1:
# print(simpleBfs(graph, start, end))

# Part 2:
solutions = []

for x, row in enumerate(grid):
    tmp = simpleBfs(graph, (x, 0), end)
    solutions.append(tmp)

print(solutions, min(solutions))
