<template>
    <section
        @click="closeAll($event)"
        v-touch:swipe.right="$parent.toggleSectionFilters"
    >
        <div class="slide-right-to-left slide-left-to-right ml-auto">
            <div class="mt-auto"></div>
            <div @click="$parent.player.listened = !$parent.player.listened">
                <svg class="mw-100 mh-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 5v14H5V5h14m2-2H3v18h18V3z"/>
                    <path v-show="$parent.player.listened" d="M18,9l-1.4-1.4L10,14.2l-2.6-2.6L6,13l4,4L18,9z"/>
                </svg>
                <small class="text-uppercase">Show listened</small>
            </div>
            <span class="opa-20">
                <hr>
            </span>
            <div @click="sortBooksListByTitle('title')">
                <svg class="mw-100 mh-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                    <circle v-show="$parent.sortBooksListType === 'title'" cx="12" cy="12" r="5"/>
                </svg>
                <small class="text-uppercase">Title ascending</small>
            </div>
            <div class="mt-2" @click="sortBooksListByTitle('eltit')">
                <svg class="mw-100 mh-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                    <circle v-show="$parent.sortBooksListType === 'eltit'" cx="12" cy="12" r="5"/>
                </svg>
                <small class="text-uppercase">Title descending</small>
            </div>
            <span class="opa-20">
                <hr>
            </span>
            <div @click="resetAll()">
                <svg class="mw-100 mh-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-2-9c-4.97 0-9 4.03-9 9H0l4 4 4-4H5c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.51 0-2.91-.49-4.06-1.3l-1.42 1.44C8.04 20.3 9.94 21 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"/>
                </svg>
                <small class="text-uppercase">Reset all</small>
            </div>
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
            },
            closeAll(event) {
                if(event.target.classList.contains('filters'))
                    this.$parent.toggleSectionFilters()
            }
        }
    }
</script>