<template>
    <section v-touch:swipe.left="$parent.toggleSectionFilters">
        <div
            class="item"
            v-show="isItemHideAsListened(completed(book))"
            v-for="book in $parent.sortBooksList"
            :key="book.id"
            @click="playerEnable(book.id)"
        >
            <img class="thumb rounded-circle shadow-sm spin" :class="[{ running: runningSpin(book.id)}, $parent.player.speedName[$parent.player.speed]]" :src="`http://mobitoon.ru/novelist/images/books/${book.id}/preview.jpg`" :alt="`${book.title}`">
            <div class="title text-truncate">{{ book.title }}</div>
            <small class="author">{{ book.author }}</small>
            <div class="status bar bg-first opa-20"></div>
            <div class="status bar" :class="[ completed(book) != 100 ? 'bg-first' : 'bg-opposite' ]" :style="{ width: `${completed(book)}%` }"></div>
            <div class="status m-auto">{{ completed(book) }}%</div>
            <small class="status mr-auto my-auto">{{ currentBookDuration(book) | timeFormatHHMMSS }}</small>
            <!-- <small class="status mr-auto my-auto">{{ currentBookDuration(book.chapters) + (book.id === $parent.playBook.id ? $parent.audio.currentTime : 0) | timeFormatHHMMSS }}</small> -->
            <small class="status ml-auto my-auto">{{ totalBookDuration(book.chapters) | timeFormatHHMMSS }}</small>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'SectionList',
        methods: {
            playerEnable(id) {
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
            completed(book) {
                return parseInt(this.currentBookDuration(book) / this.totalBookDuration(book.chapters) * 100)
            },
            currentBookDuration(book) {
                let curentDuration = 0
                for (let chapter of book.chapters) {
                    for (var order in chapter.paragraphs) {
                        if ( chapter.lastListenedParagraph >= 0 && order <= chapter.lastListenedParagraph ) {
                            if( chapter.paragraphs[order].type === "text" )
                                curentDuration += chapter.paragraphs[order].duration
                        } else break
                    }
                }
                curentDuration /= 1000  /* convert millisecond to second */
                if(book.id === this.$parent.playBook.id)
                    curentDuration += this.$parent.audio.currentTime
                return curentDuration
                // return curentDuration / 1000 + (book.id === this.$parent.playBook.id ? this.$parent.audio.currentTime : 0)  /* convert millisecond to second */
            },
            totalBookDuration(chapters) {
                let totalDuration = 0
                for (let chapter of chapters)
                    for (let paragraph of chapter.paragraphs)
                        if( paragraph.type === "text" )
                            totalDuration += paragraph.duration
                return totalDuration / 1000    /* convert millisecond to second */
            },
            isItemHideAsListened(bookListen) {
                if (bookListen === 100 && this.$parent.player.listened === false)
                    return false
                else
                    return true
            },
            runningSpin(id) {
                return this.$parent.playBook.id === id && this.$parent.isPlayerStarted ? true : false
            }
        },
        filters: {
            timeFormatHHMMSS: (s) => new Date(s * 1000).toISOString().substr( s < 3600 ? 14 : 11, s < 3600 ? 5 : 8)
        }
    }
</script>