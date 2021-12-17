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
