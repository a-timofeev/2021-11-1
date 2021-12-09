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
            chartData: undefined,
            transitionDuration: 200,
        }
    },

    methods: {
        updateChartData() {
            this.frequencies.sort((a, b) => b.frequency - a.frequency)
            this.frequencies.length = Math.min(this.frequencies.length, this.maxElements)
            const ys = d3.map(this.frequencies, d => d.frequency)
            const xs = d3.map(this.frequencies, d => d.c)

            const xScale = d3.scaleBand(xs, [this.margin, this.width - this.margin])
                .padding(3).paddingInner(0.05).paddingOuter(0.1)
            const yScale = d3.scaleLinear([0, d3.max([5, ...ys])], [this.height - this.margin, this.margin])

            this.chartData = {
                svg: d3.select(this.$refs.svg),
                data: this.frequencies,
                xScale: xScale,
                yScale: yScale,
                xAxis: d3.axisBottom(xScale),
                yAxis: d3.axisLeft(yScale).ticks(5),
            }
        },

        build() {
            this.updateChartData()

            const {svg, data, xScale, yScale, xAxis, yAxis} = this.chartData

            const xAxisGroup = svg.append("g")
                .attr("transform", `translate(0, ${this.height - this.margin})`)
                .call(xAxis)

            const yAxisGroup = svg.append("g")
                .attr("transform", `translate(${this.margin}, 0)`)
                .call(yAxis)

            const color = getComputedStyle(this.$refs.svg).getPropertyValue("--color")

            const bars = svg
                .append("g")
                .attr("fill", color)

            svg
                .append("text")
                .attr("class", "title")
                .attr("x", "50%")
                .attr("y", 24)
                .style("text-anchor", "middle")
                .text("Диаграмма частот")

            return () => {
                this.updateChartData()
                const {svg, data, xScale, yScale, xAxis, yAxis} = this.chartData

                const transition = svg.transition().duration(this.transitionDuration)

                bars.selectAll("rect")
                    .data(data, d => d.c)
                    .join(
                        enter =>
                            enter
                                .append("rect")
                                .attr("x", d => xScale(d.c))
                                .attr("y", yScale(0))
                                .attr("width", xScale.bandwidth())
                                .attr("height", 0)
                                .transition(transition)
                                .attr("y", d => yScale(d.frequency))
                                .attr("height", d => yScale(0) - yScale(d.frequency)),
                        update =>
                            update
                                .transition(transition)
                                .attr("x", d => xScale(d.c))
                                .attr("y", d => yScale(d.frequency))
                                .attr("width", xScale.bandwidth())
                                .attr("height", d => yScale(0) - yScale(d.frequency)),
                        exit =>
                            exit
                                .transition(transition)
                                .attr("height", 0)
                                .attr("y", yScale(0))
                                .remove(),
                    )

                xAxisGroup.transition(transition).call(xAxis)
                    .call(g => g.selectAll(".tick").duration(this.transitionDuration))

                yAxisGroup.transition(transition).call(yAxis)
                    .call(g => g.selectAll(".tick").duration(this.transitionDuration))
            }
        },

        update() {
            // will be loaded once .build() is called
            console.error("Call to .update() method which has not been loaded yet")
        },
    },

    mounted() {
        this.update = this.build()
    },

    watch: {
        frequencies() {
            this.update()
        },
    },
})
