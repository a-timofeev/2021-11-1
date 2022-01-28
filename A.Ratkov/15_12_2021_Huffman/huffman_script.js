const element0 = document.getElementById("dv0");
const element1 = document.getElementById("ta0");
const element2 = document.getElementById("dv1");
//const element3 = document.getElementById("dv2");
const element4 = document.getElementById("ta1");
const element5 = document.getElementById("ta2");
const element6 = document.getElementById("ta3");
const element7 = document.getElementById("ta4");



function Node(value, frequency, left=null, right=null, rang=1) {
	this.value = value;
	this.left = left;
	this.right = right;
	this.frequency = frequency;
	this.visited = false;
	this.rang = rang;
	this.haffmancode = "";
}

function CountOpenVertexes(arr) {
	let len = arr.length;
	let cnt = 0;
	for (let i = 0; i < len; i++) {
		if (arr[i].visited === false) cnt++;
	}
	return cnt;
}

function CodeWithSpaces(str, Char2Code) {
	let s = "";
	for (let i = 0; i < str.length; i++) {
		s += Char2Code[str[i]] + ' ';
	}
	return s;
}

function CountSizeOfEncodedText(str, Char2Code) {
	let bitcnt = 0;
	for (let i = 0; i < str.length; i++) {
		bitcnt += Char2Code[str[i]].length;
	}
	return bitcnt;
}

function PowOf2NotLess(x) {
	if (x < 2) return 2;
	let ans = 4;
	while (ans < x) {ans *= 2;}
	return ans;
} 

function FindTwoOpenLeast(arr) {
	let min1 = -1;
	let min2 = -1;
	let i1 = -1, i2 = -1;
	let len = arr.length;
	for (let i = 0; i < len; i++) {
		if (arr[i].visited === false) {
			if (min1 == -1) {min1 = arr[i].frequency; i1 = i;}
			else if (min2 == -1 && arr[i].frequency >= min1) {min2 = arr[i].frequency; i2 = i;}
			else if (min2 == -1 && arr[i].frequency < min1) {min2 = min1; i2 = i1; min1 = arr[i].frequency; i1 = i;}
			else if (arr[i].frequency <= min1) {min2 = min1; i2 = i1; min1 = arr[i].frequency; i1 = i;}
			else if (arr[i].frequency < min2) {min2 = arr[i].frequency; i2 = i;}
		}
	}
	return [i1, i2];
}

function MaxOfTwo(x1, x2) {
	if (x1 >= x2) return x1;
	return x2;
}

function Ceil(x, y) {
	if (x % y == 0) retirn (x / y);
	else return ((x - (x % y)) / y) + 1;
}

function f(arr, idx, s) {
	arr[idx].haffmancode = s;
	if (arr[idx].right != null) f(arr, arr[idx].right, s + '1');
	if (arr[idx].left != null) f(arr, arr[idx].left, s + '0');
	return;
}

function StringChange(s) {
	ans = "";
	for (let i = 0; i < s.length; i++) {
		if (s[i] == '\n') ans += "\'\\n\'";
		else ans += s[i];
	}
	return ans;
}

function f2(arr, idx, s, r) {
	for (let i = 0; i < r; i++) s += '>';
	s += "(\"" + StringChange(arr[idx].value) + '\", ' + arr[idx].frequency + ', ' + arr[idx].haffmancode + ')\n';
	if (arr[idx].right != null) s = f2(arr, arr[idx].right, s, r + 1);
	if (arr[idx].left != null) s = f2(arr, arr[idx].left, s, r + 1);
	return s;
}

function Huffman(obj) {
	let s = obj.nice_text.value;
	let chars = new Set();
	let c = ' ';
	let NumDiffChars = 0;
	let dict = new Map();
	let size = 1*s.length;
	for (let i = 0; i < s.length; i++) {
		if (chars.has(s[i]) === false) {
			chars.add(s[i]);
			dict[s[i]] = 1;
			NumDiffChars++;
		} else {
			dict[s[i]]++;
		}
	}
	let string0 = `This text is ${size} in length.`;
	element0.innerText = string0;
	let string1 = `Also it consists of ${String(NumDiffChars)} different chars:`;
	element2.innerText = string1;
	string1 = "";
	for (let c of chars) {
		if (c === ' ') string1 += "' ': " + String(dict[c]) + "\n";
		else if (c === '\n') string1 += "'\\n': "  + String(dict[c]) + "\n";
		else string1 += c + ": " + String(dict[c]) + "\n";
	}
	element1.value = string1;
	let arr = new Array();
	for (let c of chars) {
		arr.push(new Node(c, dict[c]));
	}
	let x = arr.length;
	while (CountOpenVertexes(arr) > 1) {
		let indexes = FindTwoOpenLeast(arr);
		arr[indexes[0]].visited = true;
		arr[indexes[1]].visited = true;
		arr.push(new Node(arr[indexes[0]].value + arr[indexes[1]].value, arr[indexes[0]].frequency + arr[indexes[1]].frequency, indexes[0], indexes[1], MaxOfTwo(arr[indexes[0]].rang, arr[indexes[1].rang])));
	}
	let y = arr.length;
//	element3.innerText = y;
	f(arr, y - 1, '');
	let ss = "";
	let Char2Code = new Map();
	let Code2Char = new Map();
	for (let i = 0; i < x; i++) {
		if (arr[i].value == ' ') ss += "\' \': " + arr[i].haffmancode + '\n';
		else if (arr[i].value == '\n') ss += "\'\\n\': " + arr[i].haffmancode + '\n';
		else ss += arr[i].value + ': ' + arr[i].haffmancode + '\n';
		Char2Code[arr[i].value] = arr[i].haffmancode;
		Code2Char[arr[i].haffmancode] = arr[i].value;
	}
	element4.value = ss;
	element5.value = CodeWithSpaces(s, Char2Code);
	tree_str = "";
	tree_str = f2(arr, y - 1, "", 0);
	element6.value = tree_str;
	encoded_text = "";
	let cnt1 = CountSizeOfEncodedText(s, Char2Code);
	encoded_text = `encoded_size = ${String(cnt1)} bits = ${String(Ceil(cnt1, 8))} bytes\n`;
	// за каждый char - один int, то есть 8 + 32 = 40 бит
	encoded_text += `headers = ${String(NumDiffChars)} * (8 + 32) = ${String(NumDiffChars * 40)} bits = ${String(NumDiffChars * 5)} bytes\n`;
	encoded_text += `size_before_encoding = ${String(size)} * 8 = ${String(size * 8)} bits = ${String(size)} bytes\n`;
	encoded_text += `compression ratio = (${String(Ceil(cnt1, 8))} + ${String(NumDiffChars * 5)}) / ${String(size)} = ${String((Ceil(cnt1, 8) + NumDiffChars * 5 * 100)) / (size)}%\n`;
	element7.value = encoded_text;
}