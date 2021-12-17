import {TreeNode} from "./huffman-algorithm.js"


export default Vue.component('huffman-tree-chart', {
    template: `
    <svg ref="svg" :viewBox="[-width / 2, -height / 2, width, height]">
    </svg>
    `,
    props: {
        tree: TreeNode,
        secondary: Boolean,
    },

    data() {
        return {
            width: 2000,
            height: 2000,
            margin: 30,
            transitionDuration: 200,

            characterNodeRadius: 16,
            helperNodeRadius: 6,

            edges: [],
            nodes: [],
        }
    },

    methods: {
        treeToRawData() {
            const nodes = []
            const edges = []
            let id = 0

            const dfs = node => {
                node.id = id++
                nodes.push(node)

                if (node.zero) {
                    dfs(node.zero)
                    edges.push([node.id, node.zero.id])
                }

                if (node.one) {
                    dfs(node.one)
                    edges.push([node.id, node.one.id])
                }
            }

            if (this.tree) {
                dfs(this.tree)
            }

            return [nodes, edges]
        },

        build() {
            const svg = d3.select(this.$refs.svg)

            const link = svg.append("g")
            const node = svg.append("g")
            const text = svg.append("g")

            const onTick = () => {
                link
                    .selectAll("line")
                    .attr("x1", ([v, _]) => this.nodes[v].x)
                    .attr("y1", ([v, _]) => this.nodes[v].y)
                    .attr("x2", ([_, u]) => this.nodes[u].x)
                    .attr("y2", ([_, u]) => this.nodes[u].y)

                node
                    .selectAll("circle")
                    .attr("cx", d => d.x)
                    .attr("cy", d => d.y)

                text.selectAll("text")
                    .attr("x", d => d.x)
                    .attr("y", d => d.y)
            }

            const simulation = d3.forceSimulation()
                .on("tick", onTick)

            return () => {
                const forceNode = d3.forceManyBody().strength(-20)
                const forceLink = d3.forceLink(this.edges.map(e => ({source: e[0], target: e[1]}))).strength(2)

                const color = getComputedStyle(this.$refs.svg).getPropertyValue(
                    this.secondary ? "--color-secondary" : "--color"
                )

                const edgeColor = getComputedStyle(this.$refs.svg).getPropertyValue(
                    this.secondary ? "--edge-color-secondary" : "--edge-color"
                )

                simulation
                    .nodes(this.nodes)
                    .force("link", forceLink)
                    .force("charge", forceNode)
                    .force("center", d3.forceCenter())

                link
                    .selectAll("line")
                    .data(this.edges)
                    .join("line")
                    .attr("stroke", color)
                    .attr("stroke-width", "3")

                node.selectAll("circle")
                    .data(this.nodes)
                    .join("circle")
                    .attr("fill", color)
                    .attr("r", d => d.character ? this.characterNodeRadius : this.helperNodeRadius)

                text.selectAll("text")
                    .data(this.nodes.filter(node => node.character))
                    .join("text")
                    .text(d => d.character)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "middle")

                simulation.alphaDecay(0)
            }
        },

        update() {
            console.error("Call to .update() method which has not been loaded yet")
        },
    },

    mounted() {
        this.update = this.build()
    },

    watch: {
        tree() {
            [this.nodes, this.edges] = this.treeToRawData()
            this.update()
        },

        secondary() {
            this.update()
        }
    },
})
