<template>
    <div class="rate">
        <svg v-for="(star, index) in stars" :key="index" @click="vote(index + 1)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <polygon :class="[(index + 1) > $parent.playBook.vote ? 'opa-20' : '']" points="14.43,10 12,2 9.57,10 2,10 8.18,14.41 5.83,22 12,17.31 18.18,22 15.83,14.41 22,10"/>
        </svg>
    </div>
</template>

<script>
    export default {
        name: 'FiveStarRate',
        data() {
            return {
                stars: 5
            }
        },
        methods: {
            vote(index) {
                index === this.$parent.playBook.vote && index === 1 ? this.$parent.playBook.vote = 0 : this.$parent.playBook.vote = index
            }
        }
    }
</script>