'use strict';

import { huffmanEncode, huffmanDecode, InvalidCodeError } from './huffman.js';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.setText(e.target.value);
  }

  render() {
    const text = this.props.text;

    return <React.Fragment>
      <textarea name="input_text" value={text} placeholder={"Enter string"} onChange={this.handleChange}></textarea>
    </React.Fragment>;
  }
}

function Frequencies({ freq }) {
  const freq_el = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .map(([key, value], index) => {
      return <tr key={index}>
        <td>{key}</td><td>{value}</td>
      </tr>
    });

  return <React.Fragment>
    <details>
      <summary><h4>Frequencies</h4></summary>
      <table>
        {freq_el.length > 0 ?
          <thead>
            <tr>
              <td>letter</td>
              <td>count</td>
            </tr>
          </thead> : undefined
        }
        <tbody>
          {freq_el}
        </tbody>
      </table>
    </details>
  </React.Fragment>
}

function GeneratedCodes({ codes, freq }) {
  const codes_el = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .map(([letter], index) => {
      return <tr key={index}>
        <td>{letter}</td><td>{codes[letter]}</td>
      </tr>
    })

  return <React.Fragment>
    <details>
      <summary><h4>Generated codes</h4></summary>

      <table>
        {codes_el.length > 0 ?
          <thead>
            <tr>
              <td>letter</td>
              <td>codes</td>
            </tr>
          </thead> : undefined
        }
        <tbody>
          {codes_el}
        </tbody>
      </table>
    </details>
  </React.Fragment>
}

function EncodedText({ codedTextWithHeader }) {
  return <React.Fragment>
    <h3>Encoded text</h3>
    <p>
      <textarea value={codedTextWithHeader} readOnly></textarea>
    </p>
  </React.Fragment>
}

const EncodeText = ({ isShowing }) => {
  const [text, setText] = React.useState("");
  let showResult;
  if (text === '') {
    showResult = undefined;
  }
  else {
    const {
      frequency,
      tree,
      codes,
      codedTree,
      codedText,
      codedTextWithHeader } = huffmanEncode(text);
    showResult = <React.Fragment>
      <Frequencies freq={frequency} />
      <GeneratedCodes codes={codes} freq={frequency} />
      <EncodedText codedTextWithHeader={codedTextWithHeader} />
    </React.Fragment>;
  }

  return <div className={`encode ${isShowing ? '' : 'hidden'}`}>
    <h2>Encoding</h2>
    <Input text={text} setText={setText} />
    {showResult}
  </div>

}

const DecodeText = ({ isShowing }) => {
  const [binaryString, changeBinaryString] = React.useState('');
  let result;
  let text;
  try {
    text = huffmanDecode(binaryString);
    result = text;
  }
  catch (error) {
    if (error.name === 'InvalidCodeError') {
      result = '';
    }
    else {
      throw error;
    }
  }
  return <div className={'decode' + (isShowing ? '' : ' hidden')}>
    <h2>Decoding</h2>
    <textarea value={binaryString} placeholder='Enter binary code' onChange={e => changeBinaryString(e.target.value)} />
    <textarea value={result} placeholder='Invalid code' readOnly></textarea>
  </div>;
}

const App = () => {
  const [isEncodingState, changeIsEncodingState] = React.useState(true);

  return <React.Fragment>
    <h1>Huffman</h1>
    <div>
      <button onClick={() => changeIsEncodingState(true)}>Encode</button>
      <button onClick={() => changeIsEncodingState(false)}>Decode</button>
    </div>
    <EncodeText isShowing={isEncodingState} />
    <DecodeText isShowing={!isEncodingState} />
  </React.Fragment>
}

const domContainer = document.querySelector('#main_container');
ReactDOM.render(React.createElement(App), domContainer);

