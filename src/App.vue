<template>
    <main id="app" :class="{ show: isSectionPlayer }">
        <SectionSignIn v-if="isSectionSignIn" class="signin"></SectionSignIn>
        <SectionNovelist v-if="showSectionNovelist" class="novelist"></SectionNovelist>
        <SectionAccount v-if="showSectionAccount" class="account"></SectionAccount>
        <SectionList v-if="isSectionList" class="list"></SectionList>

        <template v-if="isSectionPlayer">
            <section class="player bkg">
                <img class="rounded-lg shadow-sm" :src="`http://mobitoon.ru/novelist/images/books/${playBook.id}/cover.jpg`" :alt="playBook.title">
            </section>
            <section v-show="!isSectionShare && !isSectionRate && !isSectionDescription && !isSectionContents" class="player">
                <div class="player-menu">
                    <svg @click="toggleSectionShare" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                    </svg>
                    <svg @click="toggleSectionRate" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="14.43,10 12,2 9.57,10 2,10 8.18,14.41 5.83,22 12,17.31 18.18,22 15.83,14.41 22,10"/>
                    </svg>
                    <svg @click="toggleSectionDescription" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z"/>
                    </svg>
                    <svg @click="toggleSectionContents" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/>
                    </svg>
                    <svg class="hide" @click="playerHide" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19h12v2H6z"/>
                    </svg>
                    <svg class="close" @click="playerClose" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </div>
                <div class="player-progress">
                    <div class="player-range" :style="{width: `${Math.floor(playChapter.listen / playChapter.length * 1000)/10}%`}"></div>
                    <small class="player-range-left">{{ playChapter.listen }}</small>
                    <small class="player-range-total">{{ playChapter.length }}</small>
                    <input class="w-100 opa-0" type="range" v-model="playChapter.listen" min="0" :max="playChapter.length">
                </div>
                <div class="player-speed" @click="palyerAddSpeed">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44zm-9.79 6.84a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z"/>
                    </svg>
                    <div class="player-speed-name">
                        {{ playerSpeedName }}
                    </div>
                </div>
                <div class="player-cover">
                    <div class="vinyl overflow-hidden rounded-circle shadow">
                        <img class="m-auto w-100 spin" :class="{ running: playStartDisable}" :src="`http://mobitoon.ru/novelist/images/books/${playBook.id}/preview.jpg`" alt="">
                    </div>
                </div>
                <!-- <img class="player-cover m-auto w-100 rounded-lg shadow-sm" :src="`http://mobitoon.ru/novelist/images/books/${playBook.id}/preview.jpg`" alt=""> -->
                <div class="player-part">
                    <svg v-if="playBookPartPrevDisable" @click="palyerSelectChapter(-1)" class="part-prev" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                    </svg>
                    <svg v-else class="part-prev" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"></svg>
                    <div class="my-auto text-center">
                        {{ playChapter.title }}
                    </div>
                    <svg v-if="playBookPartNextDisable" @click="palyerSelectChapter(1)" class="part-next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                    </svg>
                    <svg v-else class="part-next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"></svg>
                </div>
                <div class="player-controls">
                    <svg v-if="playRewindBackDisable" class="rewind-back my-auto" @click="playerRewind(-1)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/>
                    </svg>
                    <svg v-else class="part-prev" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"></svg>
                    <svg v-if="playStartDisable" @click="playerPause" class="pause" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                    <svg v-else @click="playerStart" class="play" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                    <svg v-if="playRewindFrontDisable" class="rewind-front my-auto" @click="playerRewind(1)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
                    </svg>
                    <svg v-else class="part-prev" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"></svg>
                </div>
            </section>
            <section v-if="isSectionShare" class="player share">
                <div class="player-menu">
                    <span class="text-uppercase">Share</span>
                    <svg class="close" @click="toggleSectionShare" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </div>
                <div class="text-center align-self-center">
                    <ShareBook></ShareBook>
                </div>
            </section>
            <section v-if="isSectionRate" class="player rate">
                <div class="player-menu">
                    <span class="text-uppercase">Rate</span>
                    <svg class="close" @click="toggleSectionRate" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </div>
                <div class="text-center align-self-center">
                    <div>Curent rate</div>
                    <div class="display-1 mb-4">{{ playBook.rate }}</div>
                    <div class="mb-3">Your vote</div>
                    <FiveStarRate></FiveStarRate>
                </div>
            </section>
            <section v-if="isSectionDescription" class="player description">
                <div class="player-menu">
                    <span class="text-uppercase">Description</span>
                    <svg class="close" @click="toggleSectionDescription" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </div>
                <div class="px-2">
                    <div class="text-center mb-2">{{ playBook.title }}</div>
                    {{ playBook.annotation }}
                </div>
            </section>
            <section v-if="isSectionContents" class="player contents">
                <div class="player-menu">
                    <span class="text-uppercase">Contents</span>
                    <svg class="close" @click="toggleSectionContents" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </div>
                <div class="px-2">
                    <div class="text-center mb-2">{{ playBook.title }}</div>
                    <div v-for="chapter in playBook.chapters" :key="chapter.order">
                        <div class="mb-1">{{ chapter.title }}</div>
                        <small class="d-block pl-3 mb-4">
                            {{ chapter.annotation }}
                            <hr class="mb-1 mt-2 opa-20">
                            <div class="float-right">{{ chapter.length }} words</div>
                        </small>
                    </div>
                </div>
            </section>
        </template>
        
        <SectionMenu class="menu"></SectionMenu>
    </main>
</template>

<script>
    import SectionSignIn    from './components/SectionSignIn.vue'
    import SectionNovelist  from './components/SectionNovelist.vue'
    import SectionAccount   from './components/SectionAccount.vue'
    import SectionList      from './components/SectionList.vue'
    import SectionMenu      from './components/SectionMenu.vue'

    import ShareBook        from './components/ShareBook.vue'
    import FiveStarRate     from './components/FiveStarRate.vue'

    // import axios from 'axios'

    export default {
        name: 'App',
        components: {
            SectionSignIn,
            SectionNovelist,
            SectionAccount,
            SectionList,
            SectionMenu,

            ShareBook,
            FiveStarRate
        },
        data() {
            return {
                isAuthenticated: true,

                user: {},           // for data for user
                books: [],          // for data for all user books
                player: {},         // for saved player date
                playBook: {},       // for play book date
                playChapter: {},    // for play chapter date

                // sectionList: false,
                showSectionNovelist: false,
                showSectionAccount: false,
                showSectionPlayer: false,
                showSectionShare: false,
                showSectionRate: false,
                showSectionDescription: false,
                showSectionContents: false,

                // books list sort types - default, title
                sortBooksListType: "default",

                // axios catch error
                // errorGetData: false,

                // player
                isPlayerStarted: false
            }
        },
        methods: {
            // authentication
            signingIn() {
                this.isAuthenticated = true
            },
            signingOut() {
                this.isAuthenticated = false

                this.playerClose()
                this.toggleSectionAccount()
            },

            // toggle sections
            toggleSectionNovelist() {
                if(!this.isAuthenticated)
                    this.showSectionNovelist = !this.showSectionNovelist
                else {
                    if(this.showSectionAccount)
                        this.showSectionAccount = false
                    this.showSectionNovelist = !this.showSectionNovelist
                }
            },
            toggleSectionAccount() {
                if(this.showSectionNovelist)
                    this.showSectionNovelist = false

                this.showSectionAccount = !this.showSectionAccount
            },
            toggleSectionShare(){
                this.showSectionShare = !this.showSectionShare
            },
            toggleSectionRate(){
                this.showSectionRate = !this.showSectionRate
            },
            toggleSectionDescription(){
                this.showSectionDescription = !this.showSectionDescription
            },
            toggleSectionContents(){
                this.showSectionContents = !this.showSectionContents
            },

            // player
            playerOpen(playBookIndex) {
                this.getPlayBookData(playBookIndex)
                this.getPlayChapterData()

                this.showSectionPlayer = true
            },
            playerHide() {
                this.showSectionPlayer = false
            },
            playerShow() {
                this.showSectionPlayer = true
            },
            playerClose() {
                this.playerPause()
                this.playBook = {}
                this.showSectionPlayer = false
            },
            palyerAddSpeed() {
                this.player.speed >= this.player.speedName.length - 1 ? this.player.speed = 0 : this.player.speed++
            },
            palyerSelectChapter(direction) {
                this.playerPause()
                this.playBook.listening.chapter += direction
                this.getPlayChapterData()
            },
            playerRewind(direction) {
                let listen = parseInt(this.playChapter.listen) + this.player.rewind * direction
                if(listen < 0)
                    return this.playChapter.listen = 0
                if(listen > this.playChapter.length)
                    return this.playChapter.listen = this.playChapter.length
                return this.playChapter.listen = listen
            },
            playerStart() {
                this.isPlayerStarted = true

                // start - this is tmp code to simulate text-to-speech
                let timerId = setInterval(() => {
                    if(this.playChapter.listen >= this.playChapter.length || !this.isPlayerStarted){
                            clearInterval(timerId)
                            this.playerPause()
                        }
                    else
                        this.playChapter.listen++
                }, 500);
                // end
            },
            playerPause() {
                this.isPlayerStarted = false
            },
            // player gets
            getPlayBookData(playBookIndex) {
                this.playBook = this.books[playBookIndex]
            },
            getPlayChapterData() {
                this.playChapter = this.playBook.chapters[this.playBook.listening.chapter]
            }
        },
        computed: {
            // sort books list by types 
            sortBooksList() {
                if( this.sortBooksListType === "title" )
                    return [...this.books].sort((a, b) => a.title.localeCompare(b.title))

                if( this.sortBooksListType === "eltit" )
                    return [...this.books].sort((a, b) => a.title.localeCompare(b.title)).reverse()
                    

                return this.books
            },

            // hide or show sections
            isSectionSignIn() {
                if ( this.isAuthenticated )
                    return false

                if ( this.showSectionNovelist )
                    return false

                // if ( this.isSectionNovelist && this.isAuthenticated )
                //     return false

                return true
            },
            isSectionList() {
                if( !this.isAuthenticated )
                    return false

                if( this.showSectionNovelist )
                    return false

                if( this.showSectionAccount )
                    return false

                return true
            },
            isSectionPlayer() {
                return this.showSectionPlayer
            },
            isSectionShare() {
                return this.showSectionShare
            },
            isSectionRate() {
                return this.showSectionRate
            },
            isSectionDescription() {
                return this.showSectionDescription
            },
            isSectionContents() {
                return this.showSectionContents
            },

            // player
            playerSpeedName() {
                return this.player.speedName ? this.player.speedName[this.player.speed] : 'ups!'
            },
            playBookPartPrevDisable() {
                return this.playBook.listening.chapter <= 0 ? false : true
            },
            playBookPartNextDisable() {
                return this.playBook.listening.chapter >= this.playBook.chapters.length - 1 ? false : true
            },
            playRewindBackDisable() {
                return this.playChapter.listen <= 0 ? false : true
            },
            playRewindFrontDisable() {
                return this.playChapter.listen >= this.playChapter.length ? false : true
            },
            playStartDisable() {
                return this.isPlayerStarted
            }

        },
        mounted() {
            if (this.isAuthenticated)
                this.showSectionNovelist = false
            this.user = require('./api/data.json').user
            this.player = require('./api/data.json').player
            this.books = require('./api/data.json').books
            /*
            axios
                .get(require('./api/data.json'))
                .then(response => (this.books = response.data.books, this.player = response.data.player))
                .catch(error => {
                        console.error(error)
                        this.errorGetData = true
                    }
                )
            */
        }
    }
</script>