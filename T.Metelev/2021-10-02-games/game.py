INF = 10000000


def setCount(count, a, b):
    pass


k = int(input())
a, b = [int(x) for x in input().split()]
count = [0] * (b )
for i in range(a)[::-1]:
    if (i + 1 >= a and i + 1 <= b) or (i * 2 >= a and i * 2 <= b):
        count[i] = 1
        continue
    if count[i + 1] == 0 or (i * 2 < b + 1 and count[i * 2] == 0):
        count[i] = 1
print(count[k])

