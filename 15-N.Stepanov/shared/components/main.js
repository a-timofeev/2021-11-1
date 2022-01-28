export default Vue.component("app-main", {
    template: `
    <main>
        <div class="grow">
            <slot></slot>
        </div>
        <div v-if="back" class="center spaced-out">
            <a :href="back">Назад</a>
        </div>
    </main>
    `,
    props: {
        back: String,
    },
})
