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
  for i in [(x + 1,  y), (x, y + 1), (x * 2, y), (x, y * 2)]:
    leng = get(i)
    if leng % 2 == 0:
      mn = min(mn, leng + 1)
    else:
      mx = max(mx, leng + 1)
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


a = int(input())
b = int(input())
s = (a, b)
print(get(s))
