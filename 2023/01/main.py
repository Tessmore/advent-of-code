# script by Fabien and Lil <3

uitkomstvanalles = 0

while True:
    # print("hoi")
    try:
        line = input()
        print(line)

        first = "0"
        last = "0"

        line = line.replace("one", "o1e")
        line = line.replace("two", "t2o")
        line = line.replace("three", "t3e")
        line = line.replace("four", "f4r")
        line = line.replace("five", "f5e")
        line = line.replace("six", "s6x")
        line = line.replace("seven", "s7n")
        line = line.replace("eight", "e8t")
        line = line.replace("nine", "n9e")

        print(line)

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
