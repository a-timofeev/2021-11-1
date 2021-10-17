INF = 1e9

def get(s):
    prev = dict()
    x, y = s
    if s in prev:
        return prev[s]
    else:
        if x + y >= 77:
            return 0
    mx = -INF
    mn = INF
    for to in [(x + 1, y), (x, y + 1), (x * 2, y), (x, y * 2)]:
        length = get(to)
        if length % 2 == 0:
            mn = min(mn, length + 1)
        else:
            mx = max(mx, length + 1)
    if mn == INF:
        prev[s] = mx
        return mx
    else:
        if mx == -INF:
            prev[s] = mn
            return mn
        else:
            prev[s] = 0
            return 0


for x in range(1, 78):
    for y in range(1, 78):
        if get((x, y)) == 1:
            print(x, y)
