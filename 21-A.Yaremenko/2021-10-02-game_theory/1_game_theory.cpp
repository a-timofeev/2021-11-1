#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef pair<int, int> pi;
typedef vector<int> vi;
const int INF = (int)1e9 + 7;
#define fori(a, b) for(int i = a; i < b; ++i)
#define forj(a, b) for(int j = a; j < b; ++j)
#define fork(a, b) for(int k = a; k < b; ++k)
#define mp make_pair
#define len(a) (int)a.size()
#define all(x) x.begin(), x.end()
#define rall(x) x.rbegin(), x.rend()
#define MULT 0
mt19937_64 rng(chrono::steady_clock::now().time_since_epoch().count());

int n, m;
vi ma, mm, grandi;
vector<vi> g;

int mex(vi &a) {
  int mx = *max_element(all(a)), n = len(a);
  vi d(mx + 2, 0);
  fori(0, n) {
    d[a[i]] = 1;
  }
  int res = mx + 1;
  if (d[0] == 0) {
    return 0;
  }
  fori(1, n) {
    if (d[a[i] - 1] == 0) {
      res = a[i] - 1;
    }
  }
  return res;
}

int dfs(int u) {
  if (u >= n) {
    return 0;
  }
  if (grandi[u] != -1) {
    return grandi[u];
  }
  vi a;
  for (auto e : g[u]) {
    a.push_back(dfs(e));
  }
  
  return grandi[u] = mex(a);
}

void sol() {
  cin >> m >> n;
  grandi.assign(n, -1);
  g.resize(n);
  fori(0, m) {
    char c;
    int mv;
    cin >> c >> mv;
    if (c == '+') {
      ma.push_back(mv);
    }
    if (c == '*') {
      mm.push_back(mv);
    }
  }
  fori(1, n) {
    for (auto e : ma) {
      g[i].push_back(i + e);
    }
    for (auto e : mm) {
      g[i].push_back(i * e);
    }
  }
  dfs(1);
  fori(0, n) {
    cout << i << ' ' << grandi[i] << endl;
  }
}

int main() {
  ios_base::sync_with_stdio(false);
  cin.tie(0);
  if (MULT) {
    int t;
    cin >> t;
    while (t--) {
      sol();
    }
  } else {
    sol();
  }
  return 0;
}
