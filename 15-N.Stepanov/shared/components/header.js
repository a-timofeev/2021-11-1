import {choice} from "../util/random.js"

export default Vue.component('app-header', {
    template: `
    <header>
        <h1><slot></slot></h1>
        <img :src="imageUrl"
             width="48" height="36" alt="sus"/>
    </header>
    `,
    data: () => ({
        imageUrl: choice([
            "https://i.ibb.co/QN9FzkZ/among-us-6008615-480.png",
            "https://i.ibb.co/F3FQYFR/3cd.png",
            "https://i.ibb.co/1q9Xhcd/image.png",
            "https://i.ibb.co/C6xmhRV/golem.jpg",
            "https://i.ibb.co/4t0PKMz/ivan.jpg",
            "https://i.ibb.co/28K1RnZ/me.jpg",
            "https://i.ibb.co/BNcrrfQ/shark.jpg",
        ]),
    }),
})
