export default class BinaryScanner {
    #buffer
    #chunkPtr
    #bitPtr

    static #CONTAINER = Uint32Array
    static #BITS_PER_CHUNK = BinaryScanner.#CONTAINER.BYTES_PER_ELEMENT * 8

    constructor(buffer) {
        this.#chunkPtr = 0
        this.#bitPtr = 0
        this.#buffer = buffer
    }

    static #convertToContainer(array, wordSize) {
        const size = Math.ceil(array.length * wordSize / this.#BITS_PER_CHUNK)
        const buffer = new BinaryScanner.#CONTAINER(size)

        let bitPtr = 0, chunkPtr = 0
        for (const e of array) {
            buffer[chunkPtr] |= e << ((this.#BITS_PER_CHUNK - wordSize) - bitPtr)
            bitPtr += wordSize
            if (bitPtr >= BinaryScanner.#BITS_PER_CHUNK) {
                bitPtr = 0
                chunkPtr++
            }
        }

        return buffer
    }

    static fromBin(string) {
        return new BinaryScanner(
            this.#convertToContainer(
                [...string].map(c => parseInt(c, 2)), 1
            )
        )
    }

    static fromHex(string) {
        return new BinaryScanner(
            this.#convertToContainer(
                [...string].map(c => parseInt(c, 16)), 4
            )
        )
    }

    static fromBase64(string) {
        let binaryString
        try {
            binaryString = atob(string)
        } catch (DOMException) {
            return undefined
        }

        return new BinaryScanner(
            this.#convertToContainer(
                [...binaryString].map(c => c.charCodeAt(0)), 8
            )
        )
    }

    #advanceChuckPtr(d = 1) {
        this.#chunkPtr += d
        if (this.#chunkPtr > this.getCapacity()) {
            throw new Error("Out of bounds")
        }
    }

    #advanceBitPtr(d = 1) {
        this.#bitPtr += d
        while (this.#bitPtr >= BinaryScanner.#BITS_PER_CHUNK) {
            this.#bitPtr -= BinaryScanner.#BITS_PER_CHUNK;
            this.#advanceChuckPtr()
        }
    }

    #align() {
        if (this.#bitPtr === 0) return
        this.#bitPtr = 0
        this.#advanceChuckPtr()
    }

    nextInt() {
        this.#align()
        const res = this.#buffer[this.#chunkPtr]
        this.#advanceChuckPtr()
        return res
    }

    nextChar() {
        return String.fromCharCode(this.nextInt())
    }

    nextBit() {
        const res = this.#buffer[this.#chunkPtr] & (1 << this.#bitPtr)
        this.#advanceBitPtr()
        return res
    }

    getCapacity() {
        return this.#buffer.length
    }

    getByteSize() {
        return this.getCapacity() * BinaryScanner.#BITS_PER_CHUNK / 8
    }
}
