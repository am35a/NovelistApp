<template>
    <section>
        <div class="item" v-for="(book, index) in $parent.sortBooksList" :key="index" @click="$parent.playerOpen(0)"> <!--@click="playerOpen(index)"--> <!-- :class="[showPlayer == book.id ? 'opa-40' : '']"-->
            <img class="thumb rounded-lg shadow-sm" :src="`http://mobitoon.ru/novelist/images/books/${book.id}/preview.jpg`" :alt="`${book.title}`">
            <div class="title text-truncate">{{ book.title }}</div>
            <div class="author opa-40">{{ book.author }}</div>
            <div class="status opa-60">XX% read</div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'SectionList'
    }
</script>