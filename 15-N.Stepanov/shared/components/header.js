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
            "https://cdn.pixabay.com/photo/2021/02/12/13/43/among-us-6008615_960_720.png",
            "https://static.turbosquid.com/Preview/2020/10/26__18_04_25/Minecraft_Creeper_A_sign_B.jpg44BF7378-9591-4036-8F4F-D8AE2AC3EED8DefaultHQ.jpg",
            "https://images.shoutwiki.com/ytp/thumb/9/97/%D0%A0%D0%B8%D0%BA%D0%B0%D1%80%D0%B4%D0%BE_%D0%9C%D0%B8%D0%BB%D0%BE%D1%81.jpg/300px-%D0%A0%D0%B8%D0%BA%D0%B0%D1%80%D0%B4%D0%BE_%D0%9C%D0%B8%D0%BB%D0%BE%D1%81.jpg",
            "https://c.tenor.com/FfuiDnqY3G0AAAAC/wide-putin.gif",
            "https://media.giphy.com/media/3ohs81rDuEz9ioJzAA/giphy-downsized-large.gif",
            "https://i.ibb.co/pnVFRZ2/utka1.jpg",
            "https://i.ibb.co/HYRNwFV/utka2.jpg",
            "https://i.ibb.co/C6xmhRV/golem.jpg",
            "https://i.ibb.co/4t0PKMz/ivan.jpg",
            "https://i.ibb.co/28K1RnZ/me.jpg",
            "https://i.ibb.co/BNcrrfQ/shark.jpg",
        ])
    })
})
