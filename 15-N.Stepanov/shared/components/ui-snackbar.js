export default Vue.component('ui-snackbar', {
    template: `
        <div class="ui-snackbar">
            <div 
                class="snackbar-content rounded"
                :class="{
                        visible: this.visible,
                        secondary: this.type === 'secondary',
                        info: this.type === 'info',
                        success: this.type === 'success',
                        warning: this.type === 'warning',
                        error: this.type === 'error',
                    }"
            >
                {{this.content}}
            </div>
        </div>
    `,

    props: {
        type: {
            validator(x) {
                return x === undefined ||
                    ["secondary", "info", "success", "warning", "error"].indexOf(x) !== -1
            }
        }
    },

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
