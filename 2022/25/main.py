
decimals = []

# Convert SNAFU symbol to decimal
conversion = {
    "-": -1,
    "=": -2,
    "0": 0,
    "1": 1,
    "2": 2
}

# The inverse conversion
snafuConversion = {
    4: "-", # As "5 - 1"
    3: "=", # As "5 - 2"
    2: "2",
    1: "1",
    0: "0",
    -1: "-",
    -2: "="
}

# Calculate "SNAFU -> Decimal" value
def snafuToDecimal(line):
    num = 0

    for i, c in enumerate(line[::-1]):
        num += (5**i) * conversion[c]

    return num

def decimalToSnafu(num):
    snafu = ""

    while num:
        index = num % 5
        snafu += snafuConversion[index]
        num = round(num / 5)

    return snafu[::-1]


while True:
    try:
        line = input()

        if not line:
            continue

        decimals.append(snafuToDecimal(line))

    except EOFError:
        break

total = sum(decimals)

print("Part 1: ", total)
print("Snafu: ", decimalToSnafu(total))
