
caves = {}

while True:
    try:
        (a, b) = input().split("-")

        if a in caves:
            cave_a = caves[a]
            cave_a.append(b)
        else:
            cave_a = [b]
            caves[a] = cave_a

        if b in caves:
            cave_b = caves[b]
            cave_b.append(a)
        else:
            cave_b = [a]
            caves[b] = cave_b

    except EOFError:
        break

routes = [[]]

def depthFirst(graph, currentVertex, visited, second_visit = None):
    visited.append(currentVertex)

    for vertex in graph[currentVertex]:
        if vertex not in visited:
            depthFirst(graph, vertex, visited.copy(), second_visit)
        # Allow cycles for 'big caves'
        elif vertex.upper() == vertex:
            depthFirst(graph, vertex, visited.copy(), second_visit)
        # Part 2: One small cave can be visited 2x
        elif vertex == "start" or vertex == "end":
            pass
        elif vertex.lower() == vertex and not second_visit:
            depthFirst(graph, vertex, visited.copy(), vertex)

    routes.append(visited)

depthFirst(caves, "start", [])

valid = 0

for r in routes:
    if len(r) <= 1:
        continue

    if r[-1] == "end":
        valid += 1
        # print(r)

print(valid)
