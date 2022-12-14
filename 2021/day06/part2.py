import collections

initial = [int(x) for x in input().split(",")]
state = collections.Counter(initial)
days = [0, 1, 2, 3, 4, 5, 6, 7, 8]

for i in range(256):
    # Swap counter entries
    tmp = state[0]

    for day in days:
        # Special days
        if day == 6:
            state[6] = (state[7] + tmp)
        elif day == 8:
            state[8] = tmp
        else:
            state[day] = state[day + 1]

print("Final", sum([x for x in state.values()]))
