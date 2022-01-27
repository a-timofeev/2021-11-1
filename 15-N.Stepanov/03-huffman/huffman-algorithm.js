import BinaryBuffer from "./binary-buffer.js"

export class TreeNode {
    constructor(frequency, character, zero, one) {
        this.frequency = frequency
        this.character = character
        this.zero = zero
        this.one = one
    }
}

export function buildHuffmanTree(frequencies) {
    const nodes = frequencies.map(f => new TreeNode(f.frequency, f.c, undefined, undefined))
    while (nodes.length > 1) {
        nodes.sort((lhs, rhs) => rhs.frequency - lhs.frequency)
        const e1 = nodes.pop()
        const e2 = nodes.pop()
        nodes.push(new TreeNode(e1.frequency + e2.frequency, undefined, e1, e2))
    }
    return nodes[0]
}

export function dictionaryFromTree(tree) {
    const result = {}

    const walk = (node, path, size) => {
        if (node === undefined) return
        if (node.character !== undefined) {
            result[node.character] = {binary: path, size: size}
        } else {
            walk(node.zero, (path << 1), size + 1)
            walk(node.one, (path << 1) | 1, size + 1)
        }
    }

    walk(tree, 0, 0)
    return result
}


const formatCode = 0x25485546

export function computeFrequencies(input) {
    const counter = {}
    for (const c of input) {
        counter[c] = (counter[c] || 0) + 1
    }

    const frequencies = []
    for (let c in counter) {
        frequencies.push({c: c, frequency: counter[c]})
    }

    return frequencies
}

export function encodeUsingTree(input, frequencies, tree) {
    const buffer = new BinaryBuffer()

    buffer.pushInt(formatCode)  // stands for %HUF
    buffer.pushInt(1)  // Version
    buffer.pushInt(frequencies.length)

    for (const {c, frequency} of frequencies) {
        buffer.pushChar(c)
        buffer.pushInt(frequency)
    }

    buffer.pushInt(input.length)

    const dict = dictionaryFromTree(tree)

    for (const c of input) {
        buffer.pushBinary(dict[c].binary, dict[c].size)
    }

    return buffer
}

export function encode(input) {
    const frequencies = computeFrequencies(input)
    const tree = buildHuffmanTree(frequencies)
    const buffer = encodeUsingTree(input, frequencies, tree)

    return {
        frequencies: frequencies,
        tree: tree,
        result: buffer,
    }
}
