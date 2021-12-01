export default Vue.component('ui-button', {
    template: `
    <button class='ui-button' :class="{disabled: disabled, secondary: secondary}" v-on:click="onClick">
        <slot></slot>
    </button>
    `,
    props: {
        disabled: Boolean,
        secondary: Boolean,
        onClick: Function,
    },
})
