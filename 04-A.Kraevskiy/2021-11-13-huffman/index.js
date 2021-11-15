'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getFrequency = function getFrequency(string) {
  return string.split('').reduce(function (acc, value) {
    if (acc[value] !== undefined) {
      acc[value] += 1;
    } else {
      acc[value] = 1;
    }
    return acc;
  }, {});
};

function genCodes(freq) {
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
  var codes = dfs(tree);
  for (var code in codes) {
    codes[code] = codes[code].split("").reverse().join("");
  }
  if (Object.keys(codes).length === 1) {
    codes[Object.keys(codes)[0]] = '0';
  }
  // console.log(codes);
  return codes;
}

var Input = function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input(props) {
    _classCallCheck(this, Input);

    var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(Input, [{
    key: 'handleChange',
    value: function handleChange(e) {
      this.props.setText(e.target.value);
    }
  }, {
    key: 'render',
    value: function render() {
      var text = this.props.text;

      return React.createElement(
        React.Fragment,
        null,
        React.createElement('textarea', { id: 'input_text', name: 'input_text', value: text, placeholder: "Enter string", onChange: this.handleChange })
      );
    }
  }]);

  return Input;
}(React.Component);

function Frequencies(_ref2) {
  var freq = _ref2.freq;

  var freq_el = Object.entries(freq).sort(function (a, b) {
    return b[1] - a[1];
  }).map(function (_ref3, index) {
    var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        value = _ref4[1];

    return React.createElement(
      'tr',
      { key: index },
      React.createElement(
        'td',
        null,
        key
      ),
      React.createElement(
        'td',
        null,
        value
      )
    );
  });

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'h2',
      null,
      '1. Frequencies'
    ),
    React.createElement(
      'table',
      null,
      freq_el.length > 0 ? React.createElement(
        'thead',
        null,
        React.createElement(
          'tr',
          null,
          React.createElement(
            'td',
            null,
            'letter'
          ),
          React.createElement(
            'td',
            null,
            'count'
          )
        )
      ) : undefined,
      React.createElement(
        'tbody',
        null,
        freq_el
      )
    )
  );
}

function GeneratedCodes(_ref5) {
  var codes = _ref5.codes,
      freq = _ref5.freq;

  var codes_el = Object.entries(freq).sort(function (a, b) {
    return b[1] - a[1];
  }).map(function (_ref6, index) {
    var _ref7 = _slicedToArray(_ref6, 1),
        letter = _ref7[0];

    return React.createElement(
      'tr',
      { key: index },
      React.createElement(
        'td',
        null,
        letter
      ),
      React.createElement(
        'td',
        null,
        codes[letter]
      )
    );
  });

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'h2',
      null,
      '2. Generated codes'
    ),
    React.createElement(
      'table',
      null,
      codes_el.length > 0 ? React.createElement(
        'thead',
        null,
        React.createElement(
          'tr',
          null,
          React.createElement(
            'td',
            null,
            'letter'
          ),
          React.createElement(
            'td',
            null,
            'codes'
          )
        )
      ) : undefined,
      React.createElement(
        'tbody',
        null,
        codes_el
      )
    )
  );
}

function EncodedText(_ref8) {
  var text = _ref8.text,
      codes = _ref8.codes;

  var letters_el = text.split('').map(function (letter, index) {
    return React.createElement(
      'td',
      { key: index },
      letter
    );
  });

  var headers = Object.keys(codes).length * 2;
  var string = '';
  var encoded_letters_el = text.split('').map(function (letter, index) {
    string += codes[letter];
    return React.createElement(
      'td',
      { key: index },
      codes[letter]
    );
  });
  var size = string.length;

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'h2',
      null,
      '3. Encoded text'
    ),
    0 < letters_el.length && letters_el.length < 1000 ? React.createElement(
      'table',
      null,
      React.createElement(
        'tbody',
        null,
        React.createElement(
          'tr',
          null,
          React.createElement(
            'td',
            null,
            'Symbols'
          ),
          letters_el
        ),
        React.createElement(
          'tr',
          null,
          React.createElement(
            'td',
            null,
            'Codes'
          ),
          encoded_letters_el
        )
      )
    ) : 0 == letters_el.length ? undefined : React.createElement(
      'h4',
      null,
      'too many symbols'
    ),
    React.createElement('textarea', { value: string, readOnly: true }),
    React.createElement(
      'p',
      null,
      'encoded size = ',
      size,
      ' bits (',
      Math.ceil(size / 8),
      ' bytes)',
      React.createElement('br', null),
      'headers = ',
      ' bytes',
      React.createElement('br', null),
      'compression ratio = (',
      Math.ceil(size / 8),
      '+',
      headers,
      ') / ',
      text.length,
      ' = ',
      text.length ? Math.round((Math.ceil(size / 8) + headers) / text.length * 100) : undefined,
      '%'
    )
  );
}

var Main = function (_React$Component2) {
  _inherits(Main, _React$Component2);

  function Main(props) {
    _classCallCheck(this, Main);

    var _this2 = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

    _this2.setText = _this2.setText.bind(_this2);
    _this2.state = {
      text: ''
    };
    return _this2;
  }

  _createClass(Main, [{
    key: 'setText',
    value: function setText(text) {
      this.setState({ text: text });
    }
  }, {
    key: 'render',
    value: function render() {
      var frequencies = getFrequency(this.state.text);
      var codes = genCodes(frequencies);

      return React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          null,
          'Huffman encoding'
        ),
        React.createElement(Input, { text: this.state.text, setText: this.setText }),
        React.createElement(Frequencies, { freq: frequencies }),
        React.createElement(GeneratedCodes, { codes: codes, freq: frequencies }),
        React.createElement(EncodedText, { codes: codes, text: this.state.text })
      );
    }
  }]);

  return Main;
}(React.Component);

var domContainer = document.querySelector('#main_container');
ReactDOM.render(React.createElement(Main), domContainer);