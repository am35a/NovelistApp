<template>
    <section>
        <div
            class="item"
            v-show="isItemHideAsListened(completed(book.chapters))"
            v-for="book in $parent.sortBooksList"
            :key="book.id"
            @click="$parent.playerOpen($parent.books.findIndex(object => object.id === book.id))"
        > <!-- :class="[showPlayer == book.id ? 'opa-40' : '']"-->
            <img class="thumb rounded-lg shadow-sm" :src="`http://mobitoon.ru/novelist/images/books/${book.id}/preview.jpg`" :alt="`${book.title}`">
            <div class="title text-truncate">{{ book.title }}</div>
            <small class="author text-black-50">{{ book.author }}</small>
            <div class="status bar" :class="[ completed(book.chapters) != 100 ? 'bg-secondary' : 'bg-success' ]" :style="{ width: `${completed(book.chapters)}%` }"></div>
            <div class="status m-auto">{{ completed(book.chapters) }}%</div>
            <small class="status text-black-50 mr-auto">{{ totalListen(book.chapters) }}</small>
            <small class="status text-black-50 ml-auto">{{ totalLength(book.chapters) }}</small>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'SectionList',
        methods: {
            completed(chapters) {
                let length = 0
                let listen = 0
                for (let index = 0; index < chapters.length; index++) {
                     length += parseInt(chapters[index].length)
                     listen += parseInt(chapters[index].listen)
                }
                return parseInt(listen / length * 100)
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
                if (bookListen === 100 && this.$parent.player.listened == false)
                    return false
                else
                    return true
            }
        }
    }
</script>


