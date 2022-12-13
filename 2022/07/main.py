
folders = {}

while True:
    try:
        line = input()
        print(line)

        if "dir" in line:
            [_, directory] = line.split(" ")

            if not directory in folders:
                folders[directory] = {}

    except EOFError:
        break


print(folders)
