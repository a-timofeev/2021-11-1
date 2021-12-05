export default Vue.component('frequency-chart', {
    template: `
    <svg ref="svg" :viewBox="[0, 0, width, height]">
    </svg>
    `,
    props: {
        frequencies: Array,
    },
    data() {
        return {
            width: 1000,
            height: 300,
            margin: 30,
            maxElements: 30,
        }
    },
    watch: {
        frequencies() {
            this.$refs.svg.innerHTML = ""
            const svg = d3.select(this.$refs.svg)

            const data = this.frequencies
            data.sort((a, b) => {
                return b.frequency - a.frequency
            })

            data.length = Math.min(data.length, this.maxElements)

            const xs = d3.map(data, d => d.c)
            const ys = d3.map(data, d => d.frequency)

            const yDomain = [0, d3.max(ys)]
            const xScale = d3.scaleBand(xs, [this.margin, this.width - this.margin])
                .padding(3).paddingInner(0.02).paddingOuter(0.1)
            const yScale = d3.scaleLinear(yDomain, [this.height - this.margin, this.margin])
            const xAxis = d3.axisBottom(xScale)
            const yAxis = d3.axisLeft(yScale).ticks(5)

            svg.append("g")
                .attr("transform", `translate(0, ${this.height - this.margin})`)
                .call(xAxis)

            svg.append("g")
                .attr("transform", `translate(${this.margin}, 0)`)
                .call(yAxis)

            const color = getComputedStyle(this.$refs.svg).getPropertyValue("--color")

            svg.append("g")
                .attr("fill", color)
                .selectAll("rect")
                .data(data)
                .join("rect")
                .attr("x", d => xScale(d.c))
                .attr("y", d => yScale(d.frequency))
                .attr("width", xScale.bandwidth())
                // .attr("height", d => yScale(0) - yScale(d.frequency))
                .attr("height", d => yScale(0) - yScale(d.frequency))
        },
    }
})
