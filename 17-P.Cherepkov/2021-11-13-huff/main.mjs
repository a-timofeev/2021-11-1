// import * as d3 from '../../node_modules/d3'

class Node {
  constructor (data) {
    this.data = data
    this.left = null
    this.right = null
  }
}

function countFreqs () {
  const res = {}
  const src = document.getElementById('toEncode').value

  for (let i = 0; i < src.length; i++) {
    if (res[src[i]] === undefined) {
      res[src[i]] = 1
    } else {
      res[src[i]]++
    }
  }

  return res
}

function buildTree (freqs) {
  let len = freqs.length
  const nodes = []
  let node

  for (let i = 0; i < len; i++) {
    node = new Node(freqs[i])
    nodes.push(node)
  }

  while (nodes.length > 1) {
    const sumData = [nodes[len - 2].data[0] + nodes[len - 1].data[0], nodes[len - 2].data[1] + nodes[len - 1].data[1]]
    const right = nodes.pop()
    const left = nodes.pop()
    const sum = new Node(sumData)
    sum.left = left
    sum.right = right

    let i = len - 3
    while (i > -1 && nodes[i].data[1] < sum.data[1]) {
      i--
    }
    nodes.splice(i + 1, 0, sum)
    len--
  }

  return nodes[0]
}

function buildDict (node, path, dict) {
  if (node.left == null && node.right == null) {
    dict[node.data[0]] = path
    return dict
  }
  if (node.left != null) {
    dict = Object.assign({}, dict, buildDict(node.left, path + '0', dict))
  }
  if (node.right != null) {
    dict = Object.assign({}, dict, buildDict(node.right, path + '1', dict))
  }
  return dict
}

function encode (str, codes) {
  let rules = Object.keys(codes).length.toString(2)
  rules = '0'.repeat(8 - rules.length) + rules
  for (const [key, val] of Object.entries(codes)) {
    console.log(key + ' ' + val)
    rules += codes[key]
  }

  let res = rules
  console.log('rules: ' + res)
  for (let i = 0; i < str.length; i++) {
    res += codes[str[i]]
  }
  return res
}

function tex2Bin (str) {
  let res = ''
  for (let i = 0; i < str.length; i++) {
    res += (str.charCodeAt(i)).toString(2)
  }
  return res
}

function bin2Tex (str) {
  if (str.length % 8 !== 0) {
    return
  }

  let res = ''
  for (let i = 0; i < str.length; i += 8) {
    res += String.fromCharCode(parseInt(str.slice(i, i + 8), 2))
  }
  return res
}

function buildData (tree) {
  if (tree == null) {
    return
  }

  const treeData = new Map()

  treeData.set('name', tree.data[0])
  treeData.set('children', [buildData(tree.left), buildData(tree.right)])
  return Object.fromEntries(treeData)
}

function drawTree (tree) {
  const treeData = buildData(tree)
  const treeMap = d3.tree().size([100, 100])
}

function encodeMain () {
  const freqsDict = countFreqs()
  const freqs = document.getElementById('freqs')
  const codes = document.getElementById('codes')
  const text = document.getElementById('toEncode').value

  const symbols = Object.keys(freqsDict).map(function (key) {
    return [key, freqsDict[key]]
  })

  symbols.sort(function (first, second) {
    return second[1] - first[1]
  })

  freqs.innerHTML = JSON.stringify(symbols).replace('[[', '').replace(']]', '').replaceAll('],[', '], <br> [').replaceAll('",', '", ').replaceAll('],', '').replaceAll('["', '"')
  const tree = buildTree(symbols)
  const codesDict = buildDict(tree, '', {})
  codes.innerHTML = JSON.stringify(codesDict)

  let encCDict = tex2Bin(JSON.stringify(codesDict))
  let size = 0
  let tmp = encCDict.length
  while (tmp > 0) {
    size += 1
    tmp >>= 1
  }

  let encoded = encCDict.length.toString(2) + encode(text, codesDict)
  encoded += '0'.repeat((8 - encoded.length % 8) * (encoded.length % 8 !== 0))

  document.getElementById('toDecode').innerHTML = encoded
  document.getElementById('encoded').innerHTML = bin2Tex(encoded)
  const treeData = buildData(tree)
}

function init () {
  document.getElementById('button').addEventListener('click', encodeMain)
  console.log('done!')
}

init()
