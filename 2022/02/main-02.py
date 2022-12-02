
hands = {
    "A": "R",
    "X": "R",

    "B": "P",
    "Y": "P",

    "C": "S",
    "Z": "S"
}

scores = {
    "R": 1, # Rock
    "P": 2, # Paper
    "S": 3, # Scissor
}

# Part1
winLose = {
    # Rock against ...
    "RR": 3, # Rock - Draw
    "RP": 6, # Paper - Win
    "RS": 0, # Scissor - Lose

    # Paper against ...
    "PR": 0, # Rock - Lose
    "PP": 3, # Paper - Draw
    "PS": 6, # Scissor - Win

    # Scissor against ...
    "SR": 6, # Rock - Win
    "SP": 0, # Paper - Lose
    "SS": 3, # Scissor - Draw
}

# Part 2
loseOption = {
    "R": "S",
    "P": "R",
    "S": "P"
}

drawOption = {
    "R": "R",
    "P": "P",
    "S": "S"
}

winOption = {
    "S": "R",
    "R": "P",
    "P": "S"
}

def whatToDo(option, them):
    # X means you need to lose
    if option == "X":
        return loseOption[them]

    # Y means you need to end the round in a draw
    if option == "Y":
        return drawOption[them]

    # Z means you need to win
    if option == "Z":
        return winOption[them]


part1 = 0
part2 = 0

while True:
    try:
        [x, y] = input().split(" ")
        them = hands[x]
        you = hands[y]

        # Part 1
        part1 += scores[you] + winLose[them + you]

        # Part 2
        youActually = whatToDo(y, them)
        part2 += scores[youActually] + winLose[them + youActually]

    except EOFError:
        break

print(part1)
print(part2)


