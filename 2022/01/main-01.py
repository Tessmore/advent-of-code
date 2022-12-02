from collections import defaultdict

index = 0

elves = defaultdict(list)
calories = {}

while True:
    try:
        food = input()

        if not food:
            index += 1
            continue

        if index in elves:
            elves[index] += [food]
            calories[index] += int(food)
        else:
            elves[index] = [food]
            calories[index] = int(food)

    except EOFError:
        break


# Criminal
x = max(calories, key=calories.get)

sub2 = calories[x]
calories[x] = 0


y = max(calories, key=calories.get)

sub2 += calories[y]
calories[y] = 0



z = max(calories, key=calories.get)

sub2 += calories[z]
calories[z] = 0

print(sub2)
