from enum import Enum


class State(Enum):
    Version = 0
    Id = 1
    Operator = 4
    BitNum = 6
    Packets = 7

bits = {
    "0" : "0000",
    "1" : "0001",
    "2" : "0010",
    "3" : "0011",
    "4" : "0100",
    "5" : "0101",
    "6" : "0110",
    "7" : "0111",
    "8" : "1000",
    "9" : "1001",
    "A" : "1010",
    "B" : "1011",
    "C" : "1100",
    "D" : "1101",
    "E" : "1110",
    "F" : "1111",
}

data = [bits[x] for x in input()]
code = "".join(data)
versions = []

def parse(code):
    # print("PARSE", code)

    s = State.Version
    N = len(code)
    index = 0

    while index < N:
        if s == State.Version:
            v = code[index:index+3]
            versions.append(v)

            index += 3
            s = State.Id

        elif s == State.Id:
            id = code[index: index+3]
            index += 3

            if id == "100":
                literal = ""

                while True:
                    group = code[index: index+5]
                    literal += "".join(group[1:])
                    index += 5

                    if group[0] == "0":
                        break

                print("LITERALL")
                return index
            else:
                p_type = code[index: index+1]
                index += 1

                if p_type == "0":
                    s = State.BitNum
                else:
                    s = State.Packets

        elif s == State.BitNum:
            bits = code[index: index+15]
            index += 15
            num = int(bits, 2)

            parse(code[index: index + num])
            index += num

            return index

        elif s == State.Packets:
            bits = code[index: index+11]
            index += 11

            packets = int(bits, 2)

            print("PACKIE", packets)

            for i in range(packets):
                took = parse(code[index:])

                if took > 0:
                    index += took
                    print(took)

            return index

    return -1

parse(code)

# print(versions)

total = sum([int(x, 2) for x in versions])
print("SUM", versions, total)
