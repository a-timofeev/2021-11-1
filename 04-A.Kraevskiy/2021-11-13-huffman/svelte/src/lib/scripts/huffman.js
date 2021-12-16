'use strict';

const getFrequencyOfSymbols = (string) => {
	return string.split('').reduce((acc, symbol) => {
		if (acc[symbol]) {
			acc[symbol] += 1;
		} else {
			acc[symbol] = 1;
		}
		return acc;
	}, {});
};

const getTreeFromFrequency = (freq) => {
	if (Object.keys(freq).length === 0) {
		return undefined;
	}

	if (Object.keys(freq).length === 1) {
		return Object.keys(freq)[0];
	}

	let arrayOfNodes = Object.entries(freq)
		.map(([letter, count]) => {
			return { node: letter, nodeSum: count };
		})
		.sort((a, b) => b.nodeSum - a.nodeSum);
	while (arrayOfNodes.length > 1) {
		const first = arrayOfNodes.pop();
		const second = arrayOfNodes.pop();
		const newNode = { 1: first.node, 0: second.node };
		const nodeSum = first.nodeSum + second.nodeSum;
		arrayOfNodes.push({ node: newNode, sum: nodeSum });
		arrayOfNodes.sort((a, b) => b.nodeSum - a.nodeSum);
	}
	const tree = arrayOfNodes[0].node;
	return tree;
};

const rotateStringValuesInObject = (objectWithStringValues) => {
	for (const char in objectWithStringValues) {
		objectWithStringValues[char] = objectWithStringValues[char].split('').reverse().join('');
	}
};

const getCodesFromTree = (tree) => {
	if (tree === undefined) return undefined;
	// [tree] устанавливает ключ со значением лежащим в node
	if (typeof tree !== 'object') return { [tree]: '0' };

	const getCodesFromNode = (node) => {
		if (typeof node !== 'object') {
			// [node] устанавливает ключ со значением лежащим в node
			return { [node]: '' };
		}
		const first = getCodesFromNode(node[0]);
		const second = getCodesFromNode(node[1]);
		for (let char in first) {
			first[char] += '0';
		}
		for (let char in second) {
			second[char] += '1';
		}
		return { ...first, ...second };
	};
	const codes = getCodesFromNode(tree);
	rotateStringValuesInObject(codes);
	return codes;
};

const charToBynary = (char) => {
	return char.charCodeAt(0).toString(2);
};

const getCodedTree = (tree) => {
	if (tree === undefined) return undefined;

	let codedTree = '';
	const codeNode = (node) => {
		if (typeof node === 'string') {
			const binaryRepresentationOfChar = charToBynary(node);
			codedTree +=
				'1' + '0'.repeat(16 - binaryRepresentationOfChar.length) + binaryRepresentationOfChar;
			return;
		} else {
			codedTree += '0';
		}
		codeNode(node[0]);
		codeNode(node[1]);
	};
	codeNode(tree);
	return codedTree;
};

const getCodedText = (text, codes) => {
	return text
		.split('')
		.map((letter) => codes[letter])
		.join('');
};

const getFullCodedString = (codedTree, codedText) => {
	// первые три символа задают сколько символов отсутствует в коде в конце строки. Это необходимо т.к. код должен быть кратен 8.
	const prefix_length = 3;
	const contentLength = codedTree.length + codedText.length + prefix_length;
	const endingLength = (8 - (contentLength % 8)) % 8;
	const fullCode =
		'0'.repeat(3 - endingLength.toString(2).length) +
		endingLength.toString(2) +
		codedTree +
		codedText +
		'0'.repeat(endingLength);
	return fullCode;
};

const huffmanEncode = (text) => {
	if (typeof text !== 'string') throw new TypeError('text must be a string');
	if (text === '')
		return {
			frequency: {},
			tree: undefined,
			codes: {},
			codedTree: '',
			codedText: '',
			fullCode: ''
		};
	const frequencies = getFrequencyOfSymbols(text);
	const tree = getTreeFromFrequency(frequencies);
	const codes = getCodesFromTree(tree);
	const codedTree = getCodedTree(tree);
	const codedText = getCodedText(text, codes);
	const fullCode = getFullCodedString(codedTree, codedText);
	return {
		frequencies: frequencies,
		tree: tree,
		codes: codes,
		codedTree: codedTree,
		codedText: codedText,
		fullCode: fullCode
	};
};

class InvalidCodeError extends Error {
	constructor(message) {
		super(message);
		this.name = 'InvalidCodeError';
	}
}

// FIXME
const huffmanDecode = (binaryString) => {
	if (
		binaryString.length % 8 !== 0 || // если длина строки укладывается в байты
		(binaryString.match(/[01]/g) || []).length < binaryString.length // если есть символы кроме 0 и 1
	)
		return undefined;

	const endingLength = parseInt(binaryString.slice(0, 3), 2);
	const content = binaryString.slice(3, binaryString.length - endingLength);

	let i = 0;
	let codesTree = {};
	if (content[i] === '1') {
		i++;
		codesTree = String.fromCharCode(parseInt(content.slice(i, i + 16), 2));
		i += 16;
	} else {
		const dfs = (tree) => {
			if (i + 1 + 16 > content.length) {
				return undefined;
			}
			if (content[i] === '0') {
				i++;
				tree['0'] = {};
				dfs(tree['0']);
			} else {
				i++;
				const letter = String.fromCharCode(parseInt(content.slice(i, i + 16), 2));
				tree['0'] = letter;
				i += 16;
			}

			if (content[i] === '0') {
				i++;
				tree['1'] = {};
				dfs(tree['1']);
			} else {
				i++;
				const letter = String.fromCharCode(parseInt(content.slice(i, i + 16), 2));
				tree['1'] = letter;
				i += 16;
			}
		};
		i++;
		dfs(codesTree);
	}

	let text = '';

	if (typeof codesTree === 'string') {
		if (content.length - i <= 0) {
			throw new InvalidCodeError('Invalid code');
		}
		text = codesTree.repeat(content.length - i);
	} else {
		const decoder = (obj) => {
			if (typeof obj === 'string') {
				return obj;
			}
			if (i >= content.length) {
				throw new InvalidCodeError('Invalid code');
			}
			return decoder(obj[content[i++]]);
		};
		while (i < content.length) {
			text += decoder(codesTree);
		}
	}
	return text;
};
export { huffmanEncode, huffmanDecode };
