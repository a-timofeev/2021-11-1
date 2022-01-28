export default Vue.component('ui-textarea', {
    template: `
    <span 
        class="ui-textarea" 
        autofocus 
        @input="onInput"
        contenteditable
        ref="textarea"
    >

    </span>
    `,
    props: {
        dynamicResize: Boolean,
        minHeight: Number,
        maxHeight: Number,
    },
    methods: {
        onInput(e) {
            if (this.dynamicResize) {
                const range = document.createRange()
                range.selectNodeContents(e.target)
                const targetHeight = range.getBoundingClientRect().height + 50
                e.target.style.height = `${targetHeight}px`
            }
            this.$emit("input", e)
        },

        setContent(string) {
            this.$refs.textarea.innerText = string
        },
    },
})
