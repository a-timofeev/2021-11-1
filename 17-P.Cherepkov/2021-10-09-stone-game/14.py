S = int(input()) # number of stones in heap
N = int(input()) # min number of stones in heap, when game ends

# player is allowed to do +1, +3 or x2
Plus = [1, 3]
Mul = [2]


def winner(s, n):
    win_loose = [-1] * n
    win_loose[n - 1] = 0

    for i in range(n - 2, s - 2, -1):
        flag = False
        for k in Plus:
            if (i + 1) + k >= n or win_loose[i + k] == 0:
                win_loose[i] = 1
                flag = True
        for k in Mul:
            if (i + 1) * k >= n or win_loose[(i + 1) * k - 1] == 0:
                win_loose[i] = 1
                flag = True
        if not flag:
            win_loose[i] = 0
    return win_loose


def length(s, n):
    WL = winner(s, n)
    res = [0] * n

    for i in range(n - 1, s - 2, -1):
        if WL[i] == 1:
            moves = []
            for k in Plus:
                if (i + 1) + k > n:
                    moves.append(1)
                elif WL[i + k] == 0:
                    moves.append(res[i + k] + 1)
            for k in Mul:
                if (i + 1) * k > n:
                    moves.append(1)
                elif WL[(i + 1) * k - 1] == 0:
                    moves.append(res[(i + 1) * k - 1] + 1)
            res[i] = min(moves)
        elif WL[i] == 0:
            moves = []
            for k in Plus:
                if (i + 1) + k > n:
                    moves.append(0)
                else:
                    moves.append(res[i + k] + 1)
            for k in Mul:
                if (i + 1) * k > n:
                    moves.append(0)
                else:
                    moves.append(res[(i + 1) * k - 1] + 1)
            res[i] = max(moves)
    return res


win_loose = winner(S, N)
print(win_loose)
ans = length(S, N)
print(ans)
