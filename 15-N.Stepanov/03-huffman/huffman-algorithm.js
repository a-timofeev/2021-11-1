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
