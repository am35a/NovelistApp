<template>
    <main id="app" :class="{ show: isSectionPlayer }">
        <section v-if="isSectionSignIn" class="signin">
            <div class="mb-3">
                <label for="login">EMail</label>
                <input id="login" type="text" value="your@email.com">
            </div>
            <div class="mb-5">
                <label for="password">Password</label>
                <input type="password" value="123456">
            </div>
            <input @click="signingIn" type="button" value="Sign In">
        </section>
        <section v-if="showSectionNovelist" class="novelist">
            <img src="http://mobitoon.ru/novelist/images/logo/logoname.svg" alt="Novelist">
            <div class="pt-3 text-center">
                <span class="m-2">&copy; 2020</span>
                <a class="m-2 text-uppercase text-decoration-none text-primary" href="http://noveli.st" target="_blank">www.noveli.st</a>
                <span class="m-2">TX USA</span>
            </div>
        </section>
        <section v-if="showSectionAccount" class="account">
            <div class="text-center mb-3">
                <img class="thumb rounded-lg shadow-sm" src="https://ak.picdn.net/shutterstock/videos/1033560494/thumb/4.jpg" alt="Username">
                <div>
                    <b>Username</b>
                </div>
            </div>
            <input @click="signingOut" type="button" value="Sign Out">
        </section>
        <section v-if="isSectionList" class="list">
            <div class="item" v-for="(book, index) in books" :key="index" @click="playerOpen(0)"> <!--@click="playerOpen(index)"--> <!-- :class="[showPlayer == book.id ? 'opa-40' : '']"-->
                <img class="thumb rounded-lg shadow-sm" :src="`http://mobitoon.ru/novelist/images/books/${book.id}/preview.jpg`" :alt="`${book.title}`">
                <div class="title text-truncate">{{ book.title }}</div>
                <div class="author opa-40">{{ book.author }}</div>
                <div class="status opa-60">XX% read</div>
            </div>
        </section>
        <template v-if="isSectionPlayer">
            <section class="player bkg">
                <img class="rounded-lg shadow-sm" :src="`http://mobitoon.ru/novelist/images/books/${playBook.id}/cover.jpg`" alt="">
            </section>
            <section v-show="!this.isSectionShare && !this.isSectionRate && !this.isSectionDescription && !this.isSectionContents" class="player">
                <div class="player-menu">
                    <svg @click="toggleSectionShare" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                    </svg>
                    <svg @click="toggleSectionRate" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
                    </svg>
                    <svg @click="toggleSectionDescription" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z"/>
                    </svg>
                    <svg @click="toggleSectionContents" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/>
                    </svg>
                    <svg class="hide" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
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
                <img class="player-cover m-auto w-100 rounded-lg shadow-sm" :src="`http://mobitoon.ru/novelist/images/books/${playBook.id}/preview.jpg`" alt="">
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
                <div>
                    ...
                </div>
            </section>
            <section v-if="isSectionRate" class="player rate">
                <div class="player-menu">
                    <span class="text-uppercase">Rate</span>
                    <svg class="close" @click="toggleSectionRate" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </div>
                <div>
                    <div class="text-center">Curent rate</div>
                    <div class="text-center">Your vote</div>
                    <div class="rate">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
                        </svg>
                    </div>
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
        <section class="menu">
            <svg @click="toggleSectionNovelist" class="mw-100 mh-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <title>Novelist</title>
                <circle fill="#D4145A" cx="128" cy="128" r="128"/>
                <path fill="#ffffff" d="M113.9,140.5c-6.2-6.9-6.6-17.3-0.6-24.6c6.6-8.1,18.7-9.3,26.7-2.7c8.2,6.6,9.4,18.7,2.7,26.7 c-6,7.4-16.3,9.1-24.3,4.3L44,235.4l3.8,2.9c2.6-3.9,31.1-42,114.1-52.8c20.1-50.6,72.5-117.3,81.8-128.8 c-15.6-25.5-39.4-45.3-67.7-56l0,0c-9,10.7-64.1,76.2-110.2,106.3c6,83.4-26.3,118.2-29.9,121.6l3.5,3.1L113.9,140.5z"/>
            </svg>
            <template v-if="isAuthenticated">
                <div></div>
                <svg :type="'tap'" :call="() => { isAuthenticated = false}" class="mw-100 mh-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.94 4.66h-4.72l2.36-2.36zm-4.69 14.71h4.66l-2.33 2.33zM6.1 6.27L1.6 17.73h1.84l.92-2.45h5.11l.92 2.45h1.84L7.74 6.27H6.1zm-1.13 7.37l1.94-5.18 1.94 5.18H4.97zm10.76 2.5h6.12v1.59h-8.53v-1.29l5.92-8.56h-5.88v-1.6h8.3v1.26l-5.93 8.6z"/>
                </svg>
                <div class="divider"></div>
                <svg @click="toggleSectionAccount" class="mw-100 mh-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"/>
                </svg>
            </template>
        </section>

        <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    </main>
</template>

<script>
    // import HelloWorld from './components/HelloWorld.vue'

    // import axios from 'axios'

    export default {
        name: 'App',
        components: {
            // HelloWorld
        },
        data() {
            return {
                isAuthenticated: false,

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

                // axios catch error
                errorGetData: false,

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
                let listen = this.playChapter.listen + this.player.rewind * direction
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
            },



            // .find(obj => obj.id == 3)
        },
        computed: {

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
            this.books = require('./api/data.json').books
            this.player = require('./api/data.json').player
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