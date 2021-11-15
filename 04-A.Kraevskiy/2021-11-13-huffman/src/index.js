'use strict';

const getFrequency = (string) => {
  return string.split('').reduce((acc, value) => {
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
  let array = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  while (array.length > 1) {
    const first = array.pop();
    const second = array.pop();
    array.push([{ 1: first[0], 0: second[0] }, first[1] + second[1]]);
    array = array.sort((a, b) => b[1] - a[1]);
  }
  const tree = (array[0] === undefined) ? undefined : array[0][0];
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
  const codes = dfs(tree);
  for (const code in codes) {
    codes[code] = codes[code].split("").reverse().join("");
  }
  if (Object.keys(codes).length === 1) {
    codes[Object.keys(codes)[0]] = '0';
  }
  // console.log(codes);
  return codes;
}

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
      {/* <label htmlFor="input_text">text to encode</label> */}
      <textarea id="input_text" name="input_text" value={text} placeholder={"Enter string"} onChange={this.handleChange}></textarea>
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
    <h2>1. Frequencies</h2>
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
    <h2>2. Generated codes</h2>
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

function EncodedText({ text, codes }) {
  const letters_el = text.split('')
    .map((letter, index) => {
      return <td key={index}>{letter}</td>
    });


  const headers = Object.keys(codes).length * 2
  let string = '';
  const encoded_letters_el = text.split('').map((letter, index) => {
    string += codes[letter];
    return <td key={index}>{codes[letter]}</td>
  });
  const size = string.length;

  return <React.Fragment>
    <h2>3. Encoded text</h2>
    { (0 < letters_el.length  && letters_el.length < 1000) ?
    <table>
      <tbody>
        <tr><td>Symbols</td>{letters_el}</tr>
        <tr><td>Codes</td>{encoded_letters_el}</tr>
      </tbody>
    </table> 
    : (0 == letters_el.length?undefined:<h4>too many symbols</h4>)}
    <textarea value={string} readOnly></textarea>
    <p>encoded size = {size} bits ({Math.ceil(size / 8)} bytes)<br />
      headers = { } bytes<br />
      compression ratio = ({Math.ceil(size / 8)}+{headers}) / {text.length} = {text.length ? Math.round((Math.ceil(size / 8) + headers) / text.length * 100) : undefined}%
    </p>
  </React.Fragment>
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.setText = this.setText.bind(this);
    this.state = {
      text: '',
    }
  }

  setText(text) {
    this.setState({ text: text })
  }

  render() {
    const frequencies = getFrequency(this.state.text);
    const codes = genCodes(frequencies);

    return <div>
      <h1>Huffman encoding</h1>
      <Input text={this.state.text} setText={this.setText} />
      <Frequencies freq={frequencies} />
      <GeneratedCodes codes={codes} freq={frequencies} />
      <EncodedText codes={codes} text={this.state.text} />
    </div>
  }
}


const domContainer = document.querySelector('#main_container');
ReactDOM.render(React.createElement(Main), domContainer);
