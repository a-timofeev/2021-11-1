'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getFrequencyOfSymbols = function getFrequencyOfSymbols(string) {
    return string.split('').reduce(function (acc, value) {
        if (acc[value] !== undefined) {
            acc[value] += 1;
        } else {
            acc[value] = 1;
        }
        return acc;
    }, {});
};

var getTreeFromFrequency = function getTreeFromFrequency(freq) {
    if (Object.keys(freq).length === 0) {
        return {};
    }
    var array = Object.entries(freq).sort(function (a, b) {
        return b[1] - a[1];
    });
    while (array.length > 1) {
        var first = array.pop();
        var second = array.pop();
        array.push([{ 1: first[0], 0: second[0] }, first[1] + second[1]]);
        array = array.sort(function (a, b) {
            return b[1] - a[1];
        });
    }
    var tree = array[0] === undefined ? undefined : array[0][0];
    return tree;
};

var getCodesFromTree = function getCodesFromTree(tree) {
    var dfs = function dfs(obj) {
        if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
            return _defineProperty({}, obj, '');
        }
        var first = dfs(obj[0]);
        var second = dfs(obj[1]);
        for (var num in first) {
            first[num] += '0';
        }
        for (var _num in second) {
            second[_num] += '1';
        }
        return Object.assign({}, first, second);
    };
    var binaryString = dfs(tree);
    for (var char in binaryString) {
        binaryString[char] = binaryString[char].split("").reverse().join("");
    }
    if (Object.keys(binaryString).length === 1) {
        binaryString[Object.keys(binaryString)[0]] = '0';
    }
    return binaryString;
};

var getCodedTree = function getCodedTree(tree) {
    if (tree === undefined || Object.keys(tree).length === 0) {
        return undefined;
    }
    var string = '';
    var dfs = function dfs(obj) {
        if (typeof obj === 'string') {
            string += '1' + '0'.repeat(16 - obj.charCodeAt(0).toString(2).length) + obj.charCodeAt(0).toString(2);
            return;
        } else {
            string += '0';
        }
        dfs(obj[0]);
        dfs(obj[1]);
    };
    dfs(tree);
    return string;
};

var getCodedText = function getCodedText(text, codes) {
    return text.split('').map(function (letter) {
        return codes[letter];
    }).join('');
};

var getFinal = function getFinal(codedTree, codedText) {
    var prefix_length = 3;
    var length = codedTree.length + codedText.length + prefix_length;
    var end_length = (8 - length % 8) % 8;
    var finalBynaryString = '0'.repeat(3 - end_length.toString(2).length) + end_length.toString(2) + codedTree + codedText + '0'.repeat(end_length);
    return finalBynaryString;
};

var huffmanEncode = function huffmanEncode(text) {
    if (typeof text !== 'string') throw new TypeError('text must be a string');
    if (text === '') return new Error("can't code empty string");
    var frequency = getFrequencyOfSymbols(text);
    var tree = getTreeFromFrequency(frequency);
    var codes = getCodesFromTree(tree);
    var codedTree = getCodedTree(tree);
    var codedText = getCodedText(text, codes);
    var codedTextWithHeader = getFinal(codedTree, codedText);
    return {
        frequency: frequency,
        tree: tree,
        codes: codes,
        codedTree: codedTree,
        codedText: codedText,
        codedTextWithHeader: codedTextWithHeader
    };
};

var InvalidCodeError = function (_Error) {
    _inherits(InvalidCodeError, _Error);

    function InvalidCodeError(message) {
        _classCallCheck(this, InvalidCodeError);

        var _this = _possibleConstructorReturn(this, (InvalidCodeError.__proto__ || Object.getPrototypeOf(InvalidCodeError)).call(this, message));

        _this.name = 'InvalidCodeError';
        return _this;
    }

    return InvalidCodeError;
}(Error);

var huffmanDecode = function huffmanDecode(binaryString) {
    if (binaryString.length % 8 !== 0 || (binaryString.match(/[01]/g) || []).length < binaryString.length) {
        throw new InvalidCodeError('Invalid code');
    }
    var end_length = parseInt(binaryString.slice(0, 3), 2);
    var content = binaryString.slice(3, binaryString.length - end_length);
    var i = 0;
    var codesTree = {};
    if (content[i] === '1') {
        i++;
        codesTree = String.fromCharCode(parseInt(content.slice(i, i + 16), 2));
        i += 16;
    } else {
        var dfs = function dfs(tree) {
            if (i + 1 + 16 > content.length) {
                throw new InvalidCodeError('Invalid code');
            }
            if (content[i] === '0') {
                i++;
                tree["0"] = {};
                dfs(tree["0"]);
            } else {
                i++;
                var letter = String.fromCharCode(parseInt(content.slice(i, i + 16), 2));
                tree["0"] = letter;
                i += 16;
            }

            if (content[i] === '0') {
                i++;
                tree["1"] = {};
                dfs(tree["1"]);
            } else {
                i++;
                var _letter = String.fromCharCode(parseInt(content.slice(i, i + 16), 2));
                tree["1"] = _letter;
                i += 16;
            }
        };
        i++;
        dfs(codesTree);
    }

    var codes = getCodesFromTree(codesTree);
    var revCodes = Object.entries(codes).reduce(function (codes, _ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            key = _ref3[0],
            value = _ref3[1];

        codes[value] = key;
        return codes;
    }, {});

    var text = '';

    if (typeof codesTree === 'string') {
        if (content.length - i <= 0) {
            throw new InvalidCodeError('Invalid code');
        }
        text = codesTree.repeat(content.length - i);
    } else {
        var decoder = function decoder(obj) {
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
export { huffmanEncode, huffmanDecode, InvalidCodeError };