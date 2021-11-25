'use strict';

import { huffmanEncode, huffmanDecode } from './huffman.js';

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
    <h3>1. Frequencies</h3>
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
    <h3>2. Generated codes</h3>
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
  </React.Fragment>
}

function EncodedText({ codedTextWithHeader }) {
  return <React.Fragment>
    <h3>3. Encoded text</h3>
    <p>
      <textarea value={codedTextWithHeader} readOnly></textarea>
    </p>
  </React.Fragment>
}

const EncodeText = () => {
  const [text, setText] = React.useState("Lorem");
  if (text === '') {
    return <div>
      <h2>Encoding</h2>
      <Input text={text} setText={setText} />;
    </div>
  }
  const {
    frequency,
    tree,
    codes,
    codedTree,
    codedText,
    codedTextWithHeader } = huffmanEncode(text);
  return <div>
    <h2>Encoding</h2>
    <Input text={text} setText={setText} />
    <Frequencies freq={frequency} />
    <GeneratedCodes codes={codes} freq={frequency} />
    <EncodedText codedTextWithHeader={codedTextWithHeader} />
  </div>

}

const DecodeText = () => {
  const [binaryString, changeBinaryString] = React.useState('');


  return <div>
    <h2>Decoding</h2>
    <input value={binaryString} onChange={e => changeBinaryString(e.target.value)}/>
    <input value={huffmanDecode(binaryString)}></input>
  </div>
}

const App = () => {
  const [isCodingState, changeCodingState] = React.useState(true);


  return <React.Fragment>
    <h1>Huffman</h1>
    <button onClick={() => changeCodingState(true)}>Encode</button><button onClick={() => changeCodingState(false)}>Decode</button>
    {isCodingState ?
      <EncodeText /> :
      <DecodeText />
    }
  </React.Fragment>
}

const domContainer = document.querySelector('#main_container');
ReactDOM.render(React.createElement(App), domContainer);

