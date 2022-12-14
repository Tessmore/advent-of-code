

initial = input().split(",")

pool = []

class Fish:
    state = 0

    def __init__(self, state):
        self.state = int(state)

    def tick(self):
        self.state -= 1

    def endOfDay(self):
        if self.state < 0:
            self.state = 6
            pool.append(Fish(8))

for i in initial:
    pool.append(Fish(i))

# Part 1
for i in range(0, 80):
    print("----", i)

    for f in pool:
        f.tick()

    for f in pool:
        f.endOfDay()

    print(len(pool))
