'use strict';

const getFrequencyOfSymbols = (string) => {
    return string.split('').reduce((acc, value) => {
        if (acc[value] !== undefined) {
            acc[value] += 1;
        } else {
            acc[value] = 1;
        }
        return acc;
    }, {});
};

const getTreeFromFrequency = (freq) => {
    if (Object.keys(freq).length === 0) {
        return {};
    }
    let array = Object.entries(freq).sort((a, b) => b[1] - a[1]);
    while (array.length > 1) {
        const first = array.pop();
        const second = array.pop();
        array.push([{ 1: first[0], 0: second[0] }, first[1] + second[1]]);
        array = array.sort((a, b) => b[1] - a[1]);
    }
    const tree = (array[0] === undefined) ? undefined : array[0][0];
    return tree;
}

const getCodesFromTree = (tree) => {
    const dfs = (obj) => {
        if (typeof obj !== 'object') {
            return { [obj]: '' };
        }
        const first = dfs(obj[0]);
        const second = dfs(obj[1]);
        for (let num in first) {
            first[num] += '0';
        }
        for (let num in second) {
            second[num] += '1';
        }
        return { ...first, ...second };
    }
    const binaryString = dfs(tree);
    for (const char in binaryString) {
        binaryString[char] = binaryString[char].split("").reverse().join("");
    }
    if (Object.keys(binaryString).length === 1) {
        binaryString[Object.keys(binaryString)[0]] = '0';
    }
    return binaryString;
}

const getCodedTree = (tree) => {
    if (tree === undefined || Object.keys(tree).length === 0) {
        return undefined;
    }
    let string = '';
    const dfs = (obj) => {
        if (typeof obj === 'string') {
            string += '1' + '0'.repeat(16 - obj.charCodeAt(0).toString(2).length) + obj.charCodeAt(0).toString(2);
            return;
        }
        else {
            string += '0';
        }
        dfs(obj[0]);
        dfs(obj[1]);
    }
    dfs(tree);
    return string;
}

const getCodedText = (text, codes) => {
    return text.split('').map((letter) => {
        return codes[letter];
    }).join('');
}

const getFinal = (codedTree, codedText) => {
    const prefix_length = 3;
    const length = codedTree.length + codedText.length + prefix_length;
    const end_length = (8 - length % 8) % 8;
    const finalBynaryString = '0'.repeat(3 - end_length.toString(2).length) + end_length.toString(2) + codedTree + codedText + '0'.repeat(end_length);
    return finalBynaryString;
}

const huffmanEncode = (text) => {
    if (typeof text !== 'string') throw new TypeError('text must be a string');
    if (text === '') return new Error("can't code empty string");
    const frequency = getFrequencyOfSymbols(text);
    const tree = getTreeFromFrequency(frequency)
    const codes = getCodesFromTree(tree);
    const codedTree = getCodedTree(tree);
    const codedText = getCodedText(text, codes);
    const codedTextWithHeader = getFinal(codedTree, codedText);
    return {
        frequency: frequency,
        tree: tree,
        codes: codes,
        codedTree: codedTree,
        codedText: codedText,
        codedTextWithHeader: codedTextWithHeader,
    }
}

class InvalidCodeError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidCodeError';
    }
}

const huffmanDecode = (binaryString) => {
    if (binaryString.length % 8 !== 0 || (binaryString.match(/[01]/g) || []).length < binaryString.length) {
        throw new InvalidCodeError('Invalid code');
    }
    const end_length = parseInt(binaryString.slice(0, 3), 2);
    const content = binaryString.slice(3, binaryString.length - end_length);
    let i = 0;
    let codesTree = {};
    if (content[i] === '1') {
        i++;
        codesTree = String.fromCharCode(parseInt(content.slice(i, i + 16), 2));
        i += 16
    }
    else {
        const dfs = (tree) => {
            if (i >= content.length) {
                throw new InvalidCodeError('Invalid code');
            }
            if (content[i] === '0') {
                i++;
                tree["0"] = {};
                dfs(tree["0"]);
            }
            else {
                i++;
                const letter = String.fromCharCode(parseInt(content.slice(i, i + 16), 2));
                tree["0"] = letter;
                i += 16;
            }

            if (content[i] === '0') {
                i++;
                tree["1"] = {};
                dfs(tree["1"]);
            }
            else {
                i++;
                const letter = String.fromCharCode(parseInt(content.slice(i, i + 16), 2));
                tree["1"] = letter;
                i += 16;
            }
        }
        i++;
        dfs(codesTree);
    }

    const codes = getCodesFromTree(codesTree);
    const revCodes = Object.entries(codes).reduce((codes, [key, value]) => {
        codes[value] = key;
        return codes;
    }, {});

    let text = '';

    if (typeof codesTree === 'string') {
        text = codesTree.repeat(content.length - i);
    }
    else {
        const decoder = (obj) => {
            if (typeof obj === 'string') {
                return obj;
            }
            if (i >= content.length) {
                throw new InvalidCodeError('Invalid code');
            }
            return decoder(obj[content[i++]]);
        }
        while (i < content.length) {
            text += decoder(codesTree);
        }
    }
    return text;
}
export { huffmanEncode, huffmanDecode, InvalidCodeError };
