<template>
    <section v-touch:swipe.left="$parent.toggleSectionFilters">
        <div
            class="item"
            v-show="isItemHideAsListened(completed(book.chapters))"
            v-for="book in $parent.sortBooksList"
            :key="book.id"
            @click="playerEnable(book.id)"
        >
            <img class="thumb rounded-circle shadow-sm spin" :class="{ running: runningSpin(book.id)}" :src="`http://mobitoon.ru/novelist/images/books/${book.id}/preview.jpg`" :alt="`${book.title}`">
            <div class="title text-truncate">{{ book.title }}</div>
            <small class="author">{{ book.author }}</small>
            <div class="status bar bg-first opa-20"></div>
            <div class="status bar" :class="[ completed(book.chapters) != 100 ? 'bg-first' : 'bg-opposite' ]" :style="{ width: `${completed(book.chapters)}%` }"></div>
            <div class="status m-auto">{{ completed(book.chapters) }}%</div>
            <small class="status mr-auto my-auto">{{ totalListen(book.chapters) }}</small>
            <small class="status ml-auto my-auto">{{ totalLength(book.chapters) }}</small>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'SectionList',
        methods: {
            playerEnable(id){
                let playBookIndex = this.$parent.books.findIndex(object => object.id === id)
                if( this.$parent.selectedBookId != this.$parent.books[playBookIndex].id ) {
                    this.$parent.selectedBookId = this.$parent.books[playBookIndex].id
                    if( this.$parent.isPlayerStarted )
                        this.$parent.playerPause()
                    this.$parent.setPlayBookData(playBookIndex)
                    this.$parent.setPlayChapterData()
                }
                this.$parent.playerShow()
            },
            completed(chapters) {
                return parseInt(this.totalListen(chapters) / this.totalLength(chapters) * 100)
            },
            totalLength(chapters) {
                let length = 0
                for (let index = 0; index < chapters.length; index++) {
                     length += parseInt(chapters[index].length)
                }
                return length
            },
            totalListen(chapters) {
                let listen = 0
                for (let index = 0; index < chapters.length; index++) {
                     listen += parseInt(chapters[index].listen)
                }
                return listen
            },
            isItemHideAsListened(bookListen) {
                if (bookListen === 100 && this.$parent.player.listened === false)
                    return false
                else
                    return true
            },
            runningSpin(id) {
                if(this.$parent.playBook.id === id && this.$parent.isPlayerStarted)
                    return true
                else
                    return false
            }
        }
    }
</script>