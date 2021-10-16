#include <iostream>
#include <algorithm>
#include <vector>
#include <map>
using namespace std;

const int INF = 10000000;
map <vector<int>, int> cash;

int get(vector<int> s) {
	int x = s[0], y = s[1];
	if (x + y >= 77) {
		return 0;
	}
	if (cash.count(s)) {
		return cash[s];
	}
	vector<vector<int>> edges = { {x + 1, y}, {x, y + 1}, {2 * x, y}, {x, 2 * y} };
	int mn = INF, mx = -INF;
	for (vector<int> to : edges) {
		int len = get(to);
		if (len % 2 == 0) {
			mn = min(mn, len + 1);
		}
		else {
			mx = max(mx, len + 1);
		}
	}
	int res = -1;
	if (mn > -INF) {
		res = mn;
	}
	else {
		res = mx;
	}
	cash[s] = res;
}

int main() {
	for (int i = 1; i <= 38; i++) {
		vector<int> s = { 7, i };
		int len = get(s);
		if (len == 4) {
			cout << i << endl;
		}
	}
	return 0;
}
