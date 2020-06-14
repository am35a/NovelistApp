<template>
    <section>
        <div class="item" v-for="book in $parent.sortBooksList" :key="book.id" @click="$parent.playerOpen($parent.books.findIndex(object => object.id === book.id))"> <!--@click="playerOpen(index)"--> <!-- :class="[showPlayer == book.id ? 'opa-40' : '']"-->
            <img class="thumb rounded-lg shadow-sm" :src="`http://mobitoon.ru/novelist/images/books/${book.id}/preview.jpg`" :alt="`${book.title}`">
            <div class="title text-truncate">{{ book.title }}</div>
            <small class="author opa-40">{{ book.author }}</small>
            <div class="status" :class="[ completed(book.chapters) != 100 ? 'bg-warning rounded-left' : 'bg-success rounded' ]" :style="{ width: `${completed(book.chapters)}%` }"></div>
            <div class="status text-center">{{ completed(book.chapters) }}%</div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'SectionList',
        methods: {
            completed(chapters){
                let length = 0
                let listen = 0
                for (let index = 0; index < chapters.length; index++) {
                     length += parseInt(chapters[index].length)
                     listen += parseInt(chapters[index].listen)
                }
                return parseInt(listen / length * 100)
            }
        }
    }
</script>


