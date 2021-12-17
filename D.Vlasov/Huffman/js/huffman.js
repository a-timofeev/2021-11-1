const inputText = document.getElementById("input_text");
const outputFrequences = document.getElementById("output_frequences");
const outputCodes = document.getElementById("output_codes");
const buttonInput = document.getElementById("button_input");
const buttonButton = document.getElementById("button_button");
const graph = document.getElementById("mynetwork");

buttonInput.addEventListener('click', () => {runEncoding()});

function getFrequences(str) {
    res = {}
    for (let i = 0; i < str.length; i++) {
        if (res[str[i]]) {
            res[str[i]]++;
        }
        else {
            res[str[i]] = 1;
        }
    }
    return res;
}

function printFrequences(freq) {
    outputFrequences.value = "";
    for (letter in freq) {
        if (letter === ' ')
            outputFrequences.value += "' '" + ": " + freq[letter] + "\n";
        else if (letter === '\n')
            outputFrequences.value += "'\\n'" + ": " + freq[letter] + "\n";
        else
            outputFrequences.value += letter + ": " + freq[letter] + "\n";
    }
}


buttonButton.addEventListener('click', () => {

});


function Node(freq, symb='', left=null, right=null) {
    this.freq = freq;
    this.symb = symb;
    this.left = left;
    this.right = right;
}

function buildTree(freq) {
    nodes = [];
    for (key in freq) {
        node = new Node(freq[key], key);
        nodes.push(node);
    }

    while (nodes.length > 1) {
        let minInd1 = -1;
        let minInd2 = -1;
        let min1 = Infinity;
        let min2 = Infinity;

        for (let i = 0; i < nodes.length; i++)
        {
            if (min1 >= nodes[i].freq) {
                min2 = min1;
                minInd2 = minInd1;
                min1 = nodes[i].freq;
                minInd1 = i;
            } else if (min2 >= nodes[i].freq) {
                min2 = nodes[i].freq;
                minInd2 = i;
            }
        }

        node = new Node(nodes[minInd1].freq + nodes[minInd2].freq, '', nodes[minInd1], nodes[minInd2]);
        nodes.push(node);

        nodes.splice(minInd1, 1);
        if (minInd2 < minInd1)
            nodes.splice(minInd2, 1);
        else
            nodes.splice(minInd2 - 1, 1);
    }

    return nodes[0];
}

function getCodes(node, res, code) {
    if (node.left) {
        getCodes(node.left, res, code + "0");
        getCodes(node.right, res, code + "1");
    } else {
        res[node.symb] = code;
    }
}

function getVisTree(node, id, level, nodes, edges) {
    let lable;
    if (node.symb === '\n')
        lable = 'Symbol: \\n';
    else if (node.symb === ' ')
        lable = "Symbol: ' '";
    else if (node.symb === '')
        lable = "";
    else
        lable = "Symbol: " + node.symb;
    nodes.push({ id: id, label: lable, level: level});

    if (node.left) {
        getVisTree(node.left, id * 2, level + 1, nodes, edges);
        getVisTree(node.right, id * 2 + 1, level + 1, nodes, edges);
        edges.push({from: id, to: id * 2, label: '0'});
        edges.push({from: id, to: id * 2 + 1, label: '1'});
    }
}

function printCodes(codes) {
    outputCodes.value = "";
    for (letter in codes) {
        if (letter === ' ')
            outputCodes.value += "' '" + ": " + codes[letter] + "\n";
        else if (letter === '\n')
            outputCodes.value += "'\\n'" + ": " + codes[letter] + "\n";
        else
            outputCodes.value += letter + ": " + codes[letter] + "\n";
    }
}

function runEncoding() {
    console.log("hello");
    freq = getFrequences(inputText.value);
    printFrequences(freq);
    root = buildTree(freq);
    let codes = {};
    getCodes(root, codes, "");
    printCodes(codes);

    let nodes = [];
    let edges = [];
    getVisTree(root, 1, 0, nodes, edges);
    let nodesDS = new vis.DataSet(nodes);
    let edgesDS = new vis.DataSet(edges);

    let data = {
        nodes: nodes,
        edges: edges
    };
    let options = {
        autoResize: true,
        edges: {
            smooth: {
              type: "cubicBezier",
              forceDirection: "vertical",
              roundness: 0.1,
              length: 1,
            },
          },
        layout: {
            hierarchical: {
            direction: "UD",
            },
            },
        nodes: {
        }
    };

  var network = new vis.Network(graph, data, options);
}