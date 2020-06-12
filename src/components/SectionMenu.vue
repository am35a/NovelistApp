<template>
    <section>
        <svg @click="$parent.toggleSectionNovelist" class="mw-100 mh-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <title>Novelist</title>
            <circle fill="#D4145A" cx="128" cy="128" r="128"/>
            <path fill="#ffffff" d="M113.9,140.5c-6.2-6.9-6.6-17.3-0.6-24.6c6.6-8.1,18.7-9.3,26.7-2.7c8.2,6.6,9.4,18.7,2.7,26.7 c-6,7.4-16.3,9.1-24.3,4.3L44,235.4l3.8,2.9c2.6-3.9,31.1-42,114.1-52.8c20.1-50.6,72.5-117.3,81.8-128.8 c-15.6-25.5-39.4-45.3-67.7-56l0,0c-9,10.7-64.1,76.2-110.2,106.3c6,83.4-26.3,118.2-29.9,121.6l3.5,3.1L113.9,140.5z"/>
        </svg>
        <template v-if="$parent.isAuthenticated">
            <div></div>
            <svg v-if="$parent.isPlayerStarted && !$parent.showSectionPlayer" @click="$parent.playerShow" class="mw-100 mh-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/>
                <!-- <path d="M19,2H3v20h16V2z M5,4h5v8l-2.5-1.5L5,12V4z M21,22h-1V2h1V22z"/> -->
                <!-- <path d="M3,22h16V2H3V22z M5.4,7.4l2.2,2.2L13.2,4l1.4,1.4l-7,7L4,8.8L5.4,7.4z M21,2v20h-1V2H21z"/> -->
                <!-- <path d="M3,22h16V2H3V22z M13,7h2v2h-2V7z M9,7h2v2H9V7z M5,7h2v2H5V7z M21,2v20h-1V2H21z"/> -->
                <!-- <path d="M20.4,21.6L20,22v0h0l-1,1l-1-1H4V8L2,6l1.4-1.4L4,5.2v0l16,16v0L20.4,21.6z M21,2v17.4l1,1V2H21z M20,2H4v0.4l16,16V2z"/> -->
            </svg>
            <div v-else></div>
            <svg @click="sortBooksListByTitle" class="mw-100 mh-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path v-show="$parent.sortBooksListType === 'default'" d="M14.94 4.66h-4.72l2.36-2.36zm-4.69 14.71h4.66l-2.33 2.33zM6.1 6.27L1.6 17.73h1.84l.92-2.45h5.11l.92 2.45h1.84L7.74 6.27H6.1zm-1.13 7.37l1.94-5.18 1.94 5.18H4.97zm10.76 2.5h6.12v1.59h-8.53v-1.29l5.92-8.56h-5.88v-1.6h8.3v1.26l-5.93 8.6z"/> -->
                <path v-show="$parent.sortBooksListType === 'eltit'" d="M14 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-2-9c-4.97 0-9 4.03-9 9H0l4 4 4-4H5c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.51 0-2.91-.49-4.06-1.3l-1.42 1.44C8.04 20.3 9.94 21 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"/>
                <path v-show="$parent.sortBooksListType === 'title'" d="M14.9,4.7h-4.7l2.4-2.4C12.6,2.3,14.9,4.7,14.9,4.7z M10.3,19.4h4.7l-2.3,2.3L10.3,19.4z M16.3,6.3l-4.5,11.5h1.8l0.9-2.5 h5.1l0.9,2.5h1.8L17.9,6.3H16.3z M15.1,13.6l1.9-5.2l1.9,5.2H15.1z M4.6,16.1h6.1v1.6H2.2v-1.3l5.9-8.6H2.2V6.3h8.3v1.3 C10.5,7.5,4.6,16.1,4.6,16.1z"/> -->
            </svg>
            <div class="divider"></div>
            <svg @click="$parent.toggleSectionAccount" class="mw-100 mh-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"/>
            </svg>
        </template>
    </section>
</template>

<script>
    export default {
        name: "SectionMenu",
        methods: {
            sortBooksListByTitle() {
                switch (this.$parent.sortBooksListType) {
                    case "title":
                        this.$parent.sortBooksListType = "eltit"
                        break
                    case "eltit":
                        this.$parent.sortBooksListType = "default"
                        break
                    default:
                        this.$parent.sortBooksListType = "title"
                        break
                }
            }
            // https://abcinblog.blogspot.com/2019/01/js-es6-arrays.html
            // .filter((x) => { return x > 80 })   
        }
    }
</script>
