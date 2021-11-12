//#include <iostream>
//#include <vector>
//#include <string>
//#include <cmath>
//#include <algorithm>
//#include <set>
//
//using namespace std;
//
//typedef long long ll;
//
//int mex(vector<int> &a) {
//	vector<int> b(a.size() + 1);
//	for (int i = 0; i < a.size(); ++i) {
//		if (a[i] <= a.size()) b[a[i]]++;
//	}
//	for (int i = 0; i < b.size(); ++i) if (!b[i]) return i;
//}
//
//int main() {
//	int s, m;
//	cin >> s >> m;
//	vector<int> a = {1, 3, 2};
//	vector<int> gra(2 * m + 4);
//	vector<int> b;
//	for (int x = m; x > 0; --x) {
//		b = { gra[2 * x], gra[x + 1], gra[x + 3] };
//		gra[x] = mex(b);
//	}
//	if (gra[s]) {
//		cout << 1 << endl;
//	}
//	else {
//		cout << 2 << endl;
//	}
//	return 0;
//}