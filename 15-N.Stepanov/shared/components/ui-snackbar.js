export default Vue.component('ui-snackbar', {
    template: `
        <div class="ui-snackbar">
            <div 
                class="snackbar-content rounded" 
                :class="{visible: this.visible}"
            >
                {{this.content}}
            </div>
        </div>
    `,

    data() {
        return {
            content: undefined,
            visible: false,
            delay: 2000,
        }
    },

    methods: {
        appear(message) {
            if (!this.visible) {
                this.visible = true
                this.content = message

                setTimeout(() => {
                    this.visible = false
                }, this.delay)
            }
        },
    },
})
