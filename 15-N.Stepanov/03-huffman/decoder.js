export default Vue.component('decoder', {
    template: `
        <frequency-chart 
            :frequencies="computeFrequencies(this.input)"
            class="shadow accent-bg rounded"
            id="frequency-chart"
        >
            
        </frequency-chart>
    `,
    props: {
        input: String,
    },
    methods: {
        computeFrequencies(input) {
            const counter = new Map()
            for (const c of input) {
                counter[c] = (counter[c] || 0) + 1
            }
            const frequencies = []
            for (let c in counter) {
                frequencies.push({c: c, frequency: counter[c]})
            }
            return frequencies
        }
    },
})
