INF = 10000
res = dict()


def get(s1, s2):
    if (s1, s2) in res:
        return res[(s1, s2)]
    elif s1 + s2 >= 77:
        res[(s1, s2)] = 0
        return 0
    steps = [(s1 * 2, s2), (s1 + 1, s2), (s1, s2 + 1), (s1, s2 * 2)]
    mx = -INF
    mn = INF
    for st in steps:
        st1, st2 = st
        if (st1, st2) in res:
            length = res[(st1, st2)]
        else:
            length = get(st1, st2)
        if length % 2 == 0:
            mn = min(mn, length + 1)
        else:
            mx = max(mx, length + 1)
    if mn != 10000:
        res[(st1, st2)] = mn
        return mn
    elif mx != -10000:
        res[(st1, st2)] = mx
        return mx
    else:
        res[(st1, st2)] = 0
        return 0


x = int(input())
y = int(input())
print(get(x, y))
