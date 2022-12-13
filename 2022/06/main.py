from collections import Counter

# # Part 1
# offset = 4

# Part 2
offset = 14

while True:
    try:
        line = input()

        for i in range(offset, len(line)):
            counts = Counter(line[i - offset : i])

            if len(counts.keys()) >= offset:
                print(i)
                break

    except EOFError:
        break
