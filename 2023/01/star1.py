
uitkomstvanalles = 0

while True:
    # print("hoi")
    try:
        line = input()
        # print(line)

        first = "0"
        last = "0"

        for x in line:
            if x.isnumeric():
                first = x
                break

        for x in reversed(line):
            if x.isnumeric():
                last = x
                break

        uitkomst = int(first+last)

        uitkomstvanalles = uitkomstvanalles + uitkomst


    except EOFError:
        break

print(uitkomstvanalles)
