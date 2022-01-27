export default class BinaryBuffer {
    #buffer
    #capacity
    #chunkPtr
    #bitPtr

    static #CONTAINER = Uint32Array
    static #DEFAULT_CAPACITY = 4
    static #WORD_SIZE = 1
    static #BITS_PER_CHUNK = BinaryBuffer.#CONTAINER.BYTES_PER_ELEMENT * 8

    constructor() {
        this.#chunkPtr = 0
        this.#bitPtr = 0
        this.#capacity = BinaryBuffer.#DEFAULT_CAPACITY

        this.#buffer = new BinaryBuffer.#CONTAINER(this.#capacity)
    }

    #reallocate(newChunkSize) {
        if (newChunkSize === undefined) {
            newChunkSize = this.#capacity * 2
        }

        this.#capacity = newChunkSize
        const newBuffer = new BinaryBuffer.#CONTAINER(this.#capacity)
        newBuffer.set(this.#buffer.slice(0, this.#capacity))
        this.#buffer = newBuffer
    }

    #prepareAllocation(bitCnt) {
        const remaining = (this.#capacity - this.#chunkPtr) * BinaryBuffer.#BITS_PER_CHUNK - this.#bitPtr
        if (remaining < bitCnt) {
            this.#reallocate()
        }
    }

    #advancePtr(bitCnt) {
        this.#bitPtr += bitCnt
        this.#chunkPtr += Math.floor(this.#bitPtr / BinaryBuffer.#BITS_PER_CHUNK)
        this.#bitPtr = this.#bitPtr % BinaryBuffer.#BITS_PER_CHUNK
    }

    #align(chunkAlignment) {
        if (chunkAlignment === undefined) {
            chunkAlignment = BinaryBuffer.#WORD_SIZE
        }

        let skipBits = 0

        if (this.#bitPtr !== 0) {
            skipBits = BinaryBuffer.#BITS_PER_CHUNK - this.#bitPtr
        }

        if (this.#chunkPtr % chunkAlignment !== 0) {
            skipBits += BinaryBuffer.#BITS_PER_CHUNK * (chunkAlignment - this.#chunkPtr % chunkAlignment)
        }

        this.#prepareAllocation(skipBits)
        this.#advancePtr(skipBits)
    }

    pushInt(value) {
        this.#align()
        this.#prepareAllocation(BinaryBuffer.#BITS_PER_CHUNK)
        this.#buffer.set([value], this.#chunkPtr)
        // same as this.#advancePtr(BinaryBuffer.#WORD_SIZE * BinaryBuffer.#BITS_PER_CHUNK)
        this.#chunkPtr++
    }

    pushChar(value) {
        this.pushInt(value.charCodeAt(0))
    }

    pushBit(bit) {
        this.#prepareAllocation(1)

        if (bit) {
            const [previous] = this.#buffer.slice(this.#chunkPtr, this.#chunkPtr + 1)
            const updated = previous | (1 << this.#bitPtr)
            this.#buffer.set([updated], this.#chunkPtr)
        }

        this.#advancePtr(1)
    }

    pushBinary(uintValue, bitSize) {
        for (let bitIt = bitSize - 1; bitIt >= 0; bitIt--) {
            this.pushBit((uintValue >> bitIt) & 1)
        }
    }

    shrinkToFit() {
        this.#reallocate(this.#chunkPtr + 1)
    }

    toHex() {
        this.shrinkToFit()
        // noinspection JSCheckFunctionSignatures
        return Array.from(this.#buffer).map(
            chunk => chunk.toString(16).padStart(BinaryBuffer.#BITS_PER_CHUNK / 4, "0")
        ).join("")
    }

    toBin() {
        this.shrinkToFit()
        // noinspection JSCheckFunctionSignatures
        return Array.from(this.#buffer).map(
            chunk => chunk.toString(2).padStart(BinaryBuffer.#BITS_PER_CHUNK, "0")
        ).join("")
    }

    #containerToInt8Array() {
        const wordsInChunk = BinaryBuffer.#BITS_PER_CHUNK / 8
        const size = this.#capacity * wordsInChunk
        const bufferInt8 = new Int8Array(size)
        const bytesInChunk = new Array(wordsInChunk)
        for (let i = 0; i < this.#capacity; i++) {
            for (let j = 0; j < wordsInChunk; j++) {
                bytesInChunk[j] = (this.#buffer[i] >> (8 * (wordsInChunk - 1 - j))) & 0xFF
            }
            bufferInt8.set(bytesInChunk, i * wordsInChunk)
        }
        return bufferInt8
    }

    toBinaryString() {
        this.shrinkToFit()
        const bufferInt8 = this.#containerToInt8Array()
        let binString = ""

        bufferInt8.map(e => {
            binString += String.fromCharCode(e)
        })

        return binString
    }

    toBase64() {
        return btoa(this.toBinaryString())
    }
}
