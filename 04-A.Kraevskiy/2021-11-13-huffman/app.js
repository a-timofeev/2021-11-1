'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { huffmanEncode, huffmanDecode, InvalidCodeError } from './huffman.js';

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
        React.createElement('textarea', { name: 'input_text', value: text, placeholder: "Enter string", onChange: this.handleChange })
      );
    }
  }]);

  return Input;
}(React.Component);

function Frequencies(_ref) {
  var freq = _ref.freq;

  var freq_el = Object.entries(freq).sort(function (a, b) {
    return b[1] - a[1];
  }).map(function (_ref2, index) {
    var _ref3 = _slicedToArray(_ref2, 2),
        key = _ref3[0],
        value = _ref3[1];

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
      'h3',
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

function GeneratedCodes(_ref4) {
  var codes = _ref4.codes,
      freq = _ref4.freq;

  var codes_el = Object.entries(freq).sort(function (a, b) {
    return b[1] - a[1];
  }).map(function (_ref5, index) {
    var _ref6 = _slicedToArray(_ref5, 1),
        letter = _ref6[0];

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
      'h3',
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

function EncodedText(_ref7) {
  var codedTextWithHeader = _ref7.codedTextWithHeader;

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'h3',
      null,
      '3. Encoded text'
    ),
    React.createElement(
      'p',
      null,
      React.createElement('textarea', { value: codedTextWithHeader, readOnly: true })
    )
  );
}

var EncodeText = function EncodeText(_ref8) {
  var isShowing = _ref8.isShowing;

  var _React$useState = React.useState("Lorem"),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      text = _React$useState2[0],
      setText = _React$useState2[1];

  if (text === '') {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h2',
        null,
        'Encoding'
      ),
      React.createElement(Input, { text: text, setText: setText }),
      ';'
    );
  }

  var _huffmanEncode = huffmanEncode(text),
      frequency = _huffmanEncode.frequency,
      tree = _huffmanEncode.tree,
      codes = _huffmanEncode.codes,
      codedTree = _huffmanEncode.codedTree,
      codedText = _huffmanEncode.codedText,
      codedTextWithHeader = _huffmanEncode.codedTextWithHeader;

  return React.createElement(
    'div',
    { className: isShowing ? '' : 'hidden' },
    React.createElement(
      'h2',
      null,
      'Encoding'
    ),
    React.createElement(Input, { text: text, setText: setText }),
    React.createElement(Frequencies, { freq: frequency }),
    React.createElement(GeneratedCodes, { codes: codes, freq: frequency }),
    React.createElement(EncodedText, { codedTextWithHeader: codedTextWithHeader })
  );
};

var DecodeText = function DecodeText(_ref9) {
  var isShowing = _ref9.isShowing;

  var _React$useState3 = React.useState(''),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      binaryString = _React$useState4[0],
      changeBinaryString = _React$useState4[1];

  var result = void 0;
  var text = void 0;
  try {
    text = huffmanDecode(binaryString);
    result = React.createElement('textarea', { value: text, readOnly: true });
  } catch (error) {
    if (error instanceof Error) {
      result = React.createElement(
        'p',
        null,
        'Invalid code'
      );
    } else {
      // throw error;
    }
  }
  return React.createElement(
    'div',
    { className: isShowing ? '' : 'hidden' },
    React.createElement(
      'h2',
      null,
      'Decoding'
    ),
    React.createElement('textarea', { value: binaryString, onChange: function onChange(e) {
        return changeBinaryString(e.target.value);
      } }),
    result
  );
};

var App = function App() {
  var _React$useState5 = React.useState(true),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      isEncodingState = _React$useState6[0],
      changeIsEncodingState = _React$useState6[1];

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'h1',
      null,
      'Huffman'
    ),
    React.createElement(
      'button',
      { onClick: function onClick() {
          return changeIsEncodingState(true);
        } },
      'Encode'
    ),
    React.createElement(
      'button',
      { onClick: function onClick() {
          return changeIsEncodingState(false);
        } },
      'Decode'
    ),
    React.createElement(EncodeText, { isShowing: isEncodingState }),
    React.createElement(DecodeText, { isShowing: !isEncodingState })
  );
};

var domContainer = document.querySelector('#main_container');
ReactDOM.render(React.createElement(App), domContainer);