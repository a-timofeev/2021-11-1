import BinaryBuffer from "./binary-buffer.js"
import BinaryScanner from "./binary-scanner.js"


const formatCode = 0x25485546

function computeFrequencies(input) {
    const counter = {}
    for (const c of input) {
        counter[c] = (counter[c] || 0) + 1
    }

    const frequencies = []
    for (let c in counter) {
        frequencies.push({c: c, frequency: counter[c]})
    }

    return frequencies.sort((left, right) => {
        // Descending order
        if (left.frequency < right.frequency || (left.frequency === right.frequency && left.c < right.c)) {
            return 1
        } else if (left.frequency > right.frequency || (left.frequency === right.frequency && left.c > right.c)) {
            return -1
        } else {
            return 0
        }
    })
}


export class TreeNode {
    constructor(frequency, character, zero, one) {
        this.frequency = frequency
        this.character = character
        this.zero = zero
        this.one = one
    }
}

function buildHuffmanTree(frequencies) {
    const nodes = frequencies.map(f => new TreeNode(f.frequency, f.c, undefined, undefined))
    while (nodes.length > 1) {
        nodes.sort((lhs, rhs) => rhs.frequency - lhs.frequency)
        const e1 = nodes.pop()
        const e2 = nodes.pop()
        nodes.push(new TreeNode(e1.frequency + e2.frequency, undefined, e1, e2))
    }
    return nodes[0]
}

function dictionaryFromTree(tree) {
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

function encodeUsingTree(input, frequencies, tree) {
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

    const originalSize = (new TextEncoder().encode(input)).length
    const compressedSize = buffer.getByteSize()

    return {
        frequencies: frequencies,
        tree: tree,
        result: buffer,
        originalSize: originalSize,
        compressedSize: compressedSize,
    }
}


function inputToBinaryScanner(input) {
    let result
    if (input.startsWith(formatCode.toString(16))) {
        result = BinaryScanner.fromHex(input)
    } else if (input.startsWith(formatCode.toString(2))) {
        result = BinaryScanner.fromBin(input)
    }

    if (!result || result.nextInt() !== formatCode) {
        return undefined
    } else {
        return result
    }
}

function decodeFrequencies(scanner) {
    const headerSize = scanner.nextInt()
    const frequencies = []

    if (headerSize > scanner.getCapacity()) {
        throw new Error("Header size is too large")
    }

    for (let i = 0; i < headerSize; i++) {
        const character = scanner.nextChar()
        const frequency = scanner.nextInt()
        frequencies.push({c: character, frequency: frequency})
    }

    return frequencies
}

function decodeTextUsingTree(scanner, tree) {
    const length = scanner.nextInt()

    let result = ""
    for (let i = 0; i < length; i++) {
        let currentNode = tree
        while (currentNode.character === undefined) {
            if (scanner.nextBit() === 0) {
                currentNode = currentNode.zero
            } else {
                currentNode = currentNode.one
            }
        }
        result += currentNode.character
    }

    return result
}

function decodeVer1(scanner) {
    let frequencies
    try {
        frequencies = decodeFrequencies(scanner)
    } catch {
        return {
            version: 1,
            success: false,
            error: "unreadable-header",
        }
    }

    const tree = buildHuffmanTree(frequencies)
    const result = decodeTextUsingTree(scanner, tree)

    const originalSize = (new TextEncoder().encode(result)).length
    const compressedSize = scanner.getByteSize()

    return {
        version: 1,
        success: true,
        error: undefined,
        frequencies: frequencies,
        tree: tree,
        result: result,
        originalSize: originalSize,
        compressedSize: compressedSize,
    }
}

export function decode(input) {
    const scanner = inputToBinaryScanner(input)

    if (scanner === undefined) {
        return {
            success: false,
            error: "unknown-format"
        }
    }

    const version = scanner.nextInt()

    if (version === 1) {
        return decodeVer1(scanner)
    } else {
        return {
            success: false,
            error: "unsupported-version"
        }
    }
}
