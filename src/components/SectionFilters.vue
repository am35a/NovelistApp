<template>
    <section class="shadow-sm">
        <div class="mt-auto"></div>
        <div class="mt-2" @click="sortBooksListByTitle('title')">
            <small>Title ascending</small>
            <svg class="mw-100 mh-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.94 4.66h-4.72l2.36-2.36zm-4.69 14.71h4.66l-2.33 2.33zM6.1 6.27L1.6 17.73h1.84l.92-2.45h5.11l.92 2.45h1.84L7.74 6.27H6.1zm-1.13 7.37l1.94-5.18 1.94 5.18H4.97zm10.76 2.5h6.12v1.59h-8.53v-1.29l5.92-8.56h-5.88v-1.6h8.3v1.26l-5.93 8.6z"/> -->
            </svg>
        </div>
        <div class="mt-2" @click="sortBooksListByTitle('eltit')">
            <small>Title descending</small>
            <svg class="mw-100 mh-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.9,4.7h-4.7l2.4-2.4C12.6,2.3,14.9,4.7,14.9,4.7z M10.3,19.4h4.7l-2.3,2.3L10.3,19.4z M16.3,6.3l-4.5,11.5h1.8l0.9-2.5 h5.1l0.9,2.5h1.8L17.9,6.3H16.3z M15.1,13.6l1.9-5.2l1.9,5.2H15.1z M4.6,16.1h6.1v1.6H2.2v-1.3l5.9-8.6H2.2V6.3h8.3v1.3 C10.5,7.5,4.6,16.1,4.6,16.1z"/> -->
            </svg>
        </div>
        <span class="opa-20">
            <hr>
        </span>
        <div @click="resetAll()">
            <small>Reset all</small>
            <svg class="mw-100 mh-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-2-9c-4.97 0-9 4.03-9 9H0l4 4 4-4H5c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.51 0-2.91-.49-4.06-1.3l-1.42 1.44C8.04 20.3 9.94 21 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"/>
            </svg>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'SectionFilters',
        methods:{
            sortBooksListByTitle(type) {
                this.$parent.sortBooksListType = type
            },
            resetAll() {
                this.sortBooksListByTitle('default')
                this.$parent.toggleSectionFilters()
            }
        }
    }
</script>