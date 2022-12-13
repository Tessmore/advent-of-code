
size = 0
trees = ""

while True:
    try:
        line = input().strip()
        size = len(line)
        trees += line

    except EOFError:
        break


# Horizontal
#
# trees[0*size : 1*size]
# trees[1*size : 2*size]
# trees[2*size : 3*size]
# ...

# Part 1
# A tree is visible if it is higher than all others
def isVisible(h, others):
    for tree in others:
        # Tree is hidden
        if int(tree) >= h:
            return False

    return True

# Part 2
# Tree score for amount of lower trees next to it
def getTreeScore(h, others):
    score = 0

    for tree in others:
        score += 1

        # If a tree is blocking the view
        if int(tree) >= h:
            break

    return score

visibleCount = 0

things = {}
allScores = []

for x in range(1, size - 1):
    for y in range(1, size - 1):
        # Obtain characters to the left
        l1 = x*size
        l2 = l1 + y

        # Characters to the right
        l3 = l2 + 1
        l4 = (x+1)*size

        # Obtain characters above/below
        top = ""
        bottom = ""

        for i in range(size):
            if i < x:
                top += trees[(size * i) + y]
            elif i > x:
                bottom += trees[(size * i) + y]

        height = int(trees[l2])

        toCheck = (
            # Left
            isVisible(height, trees[l1:l2]) or

            # Right
            isVisible(height, trees[l3:l4]) or

            isVisible(height, top) or
            isVisible(height, bottom)
        )

        treeScores = (
            # Reverse since we look at it from the tree itself
            getTreeScore(height, trees[l1:l2][::-1]) *

            # Regular
            getTreeScore(height, trees[l3:l4]) *

            # Reverse
            getTreeScore(height, top[::-1]) *

            # Regular
            getTreeScore(height, bottom)
        )

        things[(x,y)] = {
            "height": height,

            "left": trees[l1:l2][::-1],

            "visible": toCheck,
            "scores": treeScores
        }

        if toCheck:
            visibleCount += 1

        allScores.append(treeScores)


# Part 1
print(visibleCount + 2*size + 2*(size-2))

# Part 2
print(max(allScores))
