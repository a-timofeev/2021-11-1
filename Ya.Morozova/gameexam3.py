INF = 10 ** 9
# for first task:
# s = 40

# for second task:
# W = 19
# H = 1
# s = 21

# for third task:
s = 23


was = {}
win = {}
# for second task:
# for x in range (19, 30):
#    win[(x, 0)] = 0
# for x in range (30, 100):
#    win[(x, 0)] = 1


# for first task:
# for x in range (38, 100):
#    win[(x, 0)] = 0

# for third task:
for x in range (0, 200):
    for y in range (0, 200):
        if x + y + 2 >= s:
            win[(x, y)] = 0


def get(x, y):
    if (x, y) in was:
        return was[(x, y)]

# for first task:
#    turns = [(x + 1, y), (x + 3, y), (((x + 1) * 2) - 1, y)]

# for second task:
#    turns = [(x + 1, y), (((x + 1) * 2) - 1, y)]

# for third task:
    turns = [(x + 1, y), (((x + 1) * 2) - 1, y), (x, y + 1), (x, ((y + 1) * 2) - 1)]

#    turns = [(x + 1, y), (x, y + 1), (x + 1, y + 1)]

    
    mn, mx = INF, -INF
    if (x + y + 2) >= s:
        win[(x, y)] = 0
        return 0
    for t in turns:
        tx, ty, = t
        if (tx + ty) >= s:
            was[(tx, ty)] = 0
            if win[tx, ty] == 0:
            	mn = min(1, mn)
            else:
            	mx = max(mx, 1)
            continue
        length = get(tx, ty)
        if win[tx, ty] == 0:
            mn = min(mn, length + 1)
        else:
            mx = max(mx, length + 1)
    if mn != INF:
        was[(x, y)] = mn
        win[(x, y)] = 1
    elif mx != -INF: 
        was[(x, y)] = mx
        win[(x, y)] = 0
    else:
        was[(x, y)] = 0
        win[(x, y)] = 0
    return was[(x, y)] 
	
if __name__ == '__main__':
    x, y = 7, 2
    L = get(x, y)
    print(L, win[(x, y)])
#    for x in range (11, 28):
#        print(x, was[x, 0])
#    for x in range (11, 23):
#	    print(x, win[x, 0])

