import {TreeNode} from "./huffman-algorithm.js"


export default Vue.component('huffman-tree-chart', {
    template: `
    <svg ref="svg" :viewBox="[-width / 2, -height / 10, width, height]">
    </svg>
    `,
    props: {
        tree: TreeNode,
        secondary: Boolean,
    },

    data() {
        return {
            width: 2000,
            height: 1000,
            margin: 30,
            transitionDuration: 200,

            nodeRadius: 16,
            randomOffset: 6,
        }
    },

    methods: {
        treeToRawData() {
            const nodes = []
            const edges = []
            let id = 0

            if (!this.tree) return [[], []]

            const queue = [this.tree]

            // Prepare node ids in bfs order
            while (queue.length > 0) {
                const node = queue.shift()
                node.id = id++
                nodes.push(node)

                if (node.zero) {
                    queue.push(node.zero)
                }

                if (node.one) {
                    queue.push(node.one)
                }
            }

            const dfs = (node, depth, lb, rb) => {
                const mid = (lb + rb) / 2
                node.x = mid
                node.y = this.height / 20 * depth + (node.id % 3) * 15

                let zeroBounds = [lb, mid], oneBounds = [mid, rb]
                if (node.id % 2 === 0) {
                    const temp = zeroBounds
                    zeroBounds = oneBounds
                    oneBounds = temp
                }

                if (node.zero) {
                    dfs(node.zero, depth + 1, zeroBounds[0] - 30, zeroBounds[1] + 30)
                    edges.push([node.id, node.zero.id])
                }

                if (node.one) {
                    dfs(node.one, depth + 1, oneBounds[0] - 30, oneBounds[1] + 30)
                    edges.push([node.id, node.one.id])
                }
            }

            dfs(this.tree, 0, -this.width / 2.5, this.width / 2.5)

            return [nodes, edges]
        },

        build() {
            const svg = d3.select(this.$refs.svg)

            const link_group = svg.append("g")
            const node_group = svg.append("g")
            const text_group = svg.append("g")

            return () => {
                const [nodes, edges] = this.treeToRawData()
                const transition = svg.transition().duration(this.transitionDuration)

                const color = getComputedStyle(this.$refs.svg).getPropertyValue(
                    this.secondary ? "--color-secondary" : "--color",
                )
                console.log(this.secondary)
                console.log(color)

                link_group
                    .selectAll("line")
                    .data(edges, ([v, u]) => [nodes[v].id, nodes[u].id])
                    .join(
                        enter => enter
                            .append("line")
                            .attr("x1", ([v, _]) => nodes[v].x)
                            .attr("y1", ([v, _]) => nodes[v].y)
                            .attr("x2", ([_, u]) => nodes[u].x)
                            .attr("y2", ([_, u]) => nodes[u].y)
                            .attr("stroke", color)
                            .attr("stroke-width", 3)
                            .style("opacity", 0)
                            .transition(transition)
                            .style("opacity", 1),
                        update => update
                            .attr("stroke", color)
                            .transition(transition)
                            .style("opacity", 1)
                            .attr("x1", ([v, _]) => nodes[v].x)
                            .attr("y1", ([v, _]) => nodes[v].y)
                            .attr("x2", ([_, u]) => nodes[u].x)
                            .attr("y2", ([_, u]) => nodes[u].y),
                        exit => exit
                            .transition(transition)
                            .style("opacity", 0)
                            .remove(),
                    )

                node_group.selectAll("circle")
                    .data(nodes, node => [node.x, node.y])
                    .join(
                        enter => enter
                            .append("circle")
                            .attr("cx", d => d.x)
                            .attr("cy", d => d.y)
                            .attr("r", 0)
                            .attr("fill", color)
                            .transition(transition)
                            .attr("r", this.nodeRadius),
                        update => update
                            .attr("fill", color)
                            .transition(transition)
                            .attr("r", this.nodeRadius)
                            .attr("cx", d => d.x)
                            .attr("cy", d => d.y),
                        exit => exit
                            .transition(transition)
                            .attr("r", 0)
                            .remove(),
                    )

                text_group.selectAll("text")
                    .data(nodes.filter(node => node.character), node => node.character)
                    .join(
                        enter => enter
                            .append("text")
                            .attr("x", d => d.x)
                            .attr("y", d => d.y)
                            .text(d => d.character)
                            .attr("text-anchor", "middle")
                            .attr("dominant-baseline", "middle")
                            .style("opacity", 0)
                            .transition(transition)
                            .style("opacity", 1),
                        update => update
                            .transition(transition)
                            .attr("x", d => d.x)
                            .attr("y", d => d.y),
                        exit => exit
                            .transition(transition)
                            .style("opacity", 0)
                            .remove(),
                    )
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
            this.update()
        },

        secondary() {
            this.update()
        },
    },
})
