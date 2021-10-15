#include <iostream>
#include <vector>
#include <string>
#include <cmath>
#include <algorithm>
#include <set>

using namespace std;

typedef long long ll;

#define X first
#define Y second
#define mp make_pair

int mex(vector<int> &a) {
	vector<int> b(a.size() + 1);
	for (int i = 0; i < a.size(); ++i) {
		if (a[i] <= a.size()) b[a[i]]++;
	}
	for (int i = 0; i < b.size(); ++i) if (!b[i]) return i;
}

struct vert {
	vector<vert*> a;
	char c;
	int g;
};

int grand(vert* x) {
	if (x->a.size() == 0 && x->c != 0) return 0;
	else {
		vector<int> a;
		for (vert* y : x->a) a.push_back(grand(y));
		return mex(a);
	}
}

int main() {
	int n, m = 0, sum = 0;
	cin >> n;
	vector<string> words(n);
	for (int i = 0; i < n; ++i) cin >> words[i], m = max(m, (int)words[i].size()), sum += words[i].size();
	sort(words.begin(), words.end());
	vector<vert> a(2 * sum);
	vert* start = &a[0];
	start->c = 0;
	vert* cur = start;
	int cnt = 1;
	for (int i = 0; i < n; ++i) {
		if (start->a.size() > 0) cur = start->a.back();
		if (words[i][0] != cur->c) {
			cur = &a[cnt], cnt++;
			cur->c = words[i][0];
			start->a.push_back(cur);
		}
		for (int j = 1; j < words[i].size(); ++j) {
			if (cur->a.size() == 0 || cur->a.back()->c != words[i][j]) {
				vert* elem = &a[cnt];
				cnt++;
				elem->c = words[i][j];
				cur->a.push_back(elem);
			}
			cur = cur->a.back();
		}
	}
	if (grand(start)) cout << 1 << endl;
	else cout << 2 << endl;
	return 0;
}