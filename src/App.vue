<template>
    <main id="app" :class="{ show: isSectionPlayer }">
        <SectionSignIn v-if="isSectionSignIn" class="signin"></SectionSignIn>
        <SectionNovelist v-if="showSectionNovelist" class="novelist"></SectionNovelist>
        <SectionAccount v-if="showSectionAccount" class="account"></SectionAccount>
        <SectionList v-if="isSectionList" class="list"></SectionList>
        <transition name="fade">
            <SectionFilters v-show="isSectionFilters" class="filters"></SectionFilters>
        </transition>

        <template v-if="isSectionPlayer">
            <section class="player bkg">
                <img class="rounded-lg shadow-sm" :src="`http://mobitoon.ru/novelist/images/books/${playBook.id}/cover.jpg`" :alt="playBook.title">
            </section>
            <transition name="fade">
                <section v-show="!isSectionShare && !isSectionRate && !isSectionDescription && !isSectionContents" class="player">
                    <div class="player-header">
                        <span class="text-uppercase">{{ playBook.title }}</span>
                        <svg v-if="isPlayerStarted" @click="playerHide" class="hide player-button-on" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 19h12v2H6z"/>
                        </svg>
                        <svg v-else class="hide player-button-off" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 19h12v2H6z"/>
                        </svg>
                        <svg class="close" @click="playerClose" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </div>
                    <div class="player-progress">
                        <!-- <input class="w-100 opa-0" type="range" v-model="playChapter.listen" min="0" :max="playChapter.length"> -->
                        <div class="player-range opa-20"></div>
                        <div class="player-range player-chapter-range" :style="{width: `${(playBookChapterCurrentDuration() + audio.currentTime) / playBookChapterTotalDuration() * 100}%`}"></div>
                        <div class="player-range" :style="{width: `${parseInt((playBookCurrentDuration + audio.currentTime) / playBookTotalDuration * 100)}%`}"></div>
                        <small class="mt-auto mr-auto">{{ playBookChapterCurrentDuration() + audio.currentTime | timeFormatHHMMSS }}</small>
                        <small class="mt-auto ml-auto">{{ playBookChapterTotalDuration() | timeFormatHHMMSS }}</small>
                        <!-- <small class="mt-auto mr-auto">{{ playBookCurrentDuration + audio.currentTime | timeFormatHHMMSS }} &bull; {{ playBookChapterCurrentDuration() + audio.currentTime | timeFormatHHMMSS }}</small>
                        <small class="mt-auto ml-auto">{{ playBookChapterTotalDuration() | timeFormatHHMMSS }} &bull; {{ playBookTotalDuration | timeFormatHHMMSS }}</small> -->
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
                            <img class="m-auto w-100 spin" :class="[{ running: playStartDisable}, player.speedName[player.speed]]" :src="`http://mobitoon.ru/novelist/images/books/${playBook.id}/preview.jpg`" :alt="playBook.title">
                        </div>

                        <svg v-if="playRewindBackEnable" @click="playerRewind(-1)" class="rewind-back player-button-on" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/>
                        </svg>
                        <svg v-else class="rewind-back player-button-off" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/>
                        </svg>
                        
                        <template v-if="playerPlayPauseEnable">
                            <svg v-if="playStartDisable" @click="playerPause" class="pause text-first" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                            </svg>
                            <svg v-else @click="playerStart" class="play player-button-on text-first" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                        </template>
                        <svg v-else @click="resetPlayChapterData" class="play player-button-on text-first" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12,5V1.5L7.6,5.9l4.4,4.4V6.8c2.9,0,5.3,2.4,5.3,5.3s-2.4,5.3-5.3,5.3S6.8,14.9,6.8,12H5c0,3.8,3.1,7,7,7s7-3.2,7-7S15.8,5,12,5z"/>
                        </svg>
                        <!--svg v-else class="play player-button-off text-first" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                        </svg-->

                        <svg v-if="playRewindFrontEnable" @click="playerRewind(1)" class="rewind-front player-button-on" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
                        </svg>
                        <svg v-else class="rewind-front player-button-off" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
                        </svg>
                    </div>
                    <div class="player-part">
                        <svg v-if="playBookPartPrevEnable" @click="palyerSwitchChapter(-1)" class="part-prev player-button-on" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                        </svg>
                        <svg v-else class="part-prev player-button-off" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                        </svg>

                        <div class="my-auto text-center">
                            {{ playChapter.title ? playChapter.title : playBook.title }}
                        </div>

                        <svg v-if="playBookPartNextEnable" @click="palyerSwitchChapter(1)" class="part-next player-button-on" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                        </svg>
                        <svg v-else class="part-next player-button-off" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                        </svg>
                    </div>
                    <div class="player-menu">
                        <div></div>
                        <svg @click="toggleSectionShare" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                        </svg>
                        <div></div>
                        <svg @click="toggleSectionRate" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="14.43,10 12,2 9.57,10 2,10 8.18,14.41 5.83,22 12,17.31 18.18,22 15.83,14.41 22,10"/>
                        </svg>
                        <div></div>
                        <svg class="opa-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22 18V2H6v16h16zm-11-6l2.03 2.71L16 11l4 5H8l3-4zM2 6v16h16v-2H4V6H2z"/>
                        </svg>
                        <div></div>
                        <svg @click="toggleSectionDescription" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z"/>
                        </svg>
                        <div></div>
                        <svg @click="toggleSectionContents" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/>
                        </svg>
                        <div></div>
                    </div>
                </section>
            </transition>
            <transition name="fade">
                <section v-if="isSectionShare" v-touch:swipe.bottom="toggleSectionShare" class="player share">
                    <div class="player-header">
                        <span class="text-uppercase">Share</span>
                        <svg class="close" @click="toggleSectionShare" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </div>
                    <div class="text-center align-self-center slide-bottom-to-top slide-top-to-bottom">
                        <ShareBook></ShareBook>
                    </div>
                </section>
                <section v-if="isSectionRate" v-touch:swipe.bottom="toggleSectionRate" class="player rate">
                    <div class="player-header">
                        <span class="text-uppercase">Rate</span>
                        <svg class="close" @click="toggleSectionRate" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </div>
                    <div class="text-center align-self-center slide-bottom-to-top slide-top-to-bottom">
                        <div>Curent rate</div>
                        <div class="display-1 mb-4">{{ playBook.rate }}</div>
                        <div class="mb-3">Your vote</div>
                        <FiveStarRate></FiveStarRate>
                    </div>
                </section>
                <section v-if="isSectionDescription" v-touch:swipe.bottom="toggleSectionDescription" class="player description">
                    <div class="player-header">
                        <span class="text-uppercase">Description</span>
                        <svg class="close" @click="toggleSectionDescription" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </div>
                    <div class="px-2 slide-bottom-to-top slide-top-to-bottom">
                        <p class="text-center">
                            {{ playBook.title }}
                        </p>
                        <p>
                            <small>
                                Author: {{ playBook.author }}
                                <br>
                                Genres: {{ playBook.genres }}
                            </small>
                        </p>
                        {{ playBook.annotation }}
                    </div>
                </section>
                <section v-if="isSectionContents" v-touch:swipe.bottom="toggleSectionContents" class="player contents">
                    <div class="player-header">
                        <span class="text-uppercase">Contents</span>
                        <svg class="close" @click="toggleSectionContents" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </div>
                    <div class="px-2 slide-bottom-to-top slide-top-to-bottom">
                        <div class="text-center mb-3">{{ playBook.title }}</div>
                        <div
                            v-for="chapter in playBook.chapters"
                            :key="chapter.order"
                            :class="{'text-first': playChapter.order === chapter.order}"
                            @click="palyerChangeChapter(chapter.order)"
                        >
                            <div class="mb-1">{{ chapter.title }}</div>
                            <small class="d-block pl-3 mb-4">
                                {{ chapter.annotation }}
                                <hr class="mb-1 mt-2 opa-20">
                                <div class="float-right">{{ playBookChapterCurrentDuration(chapter.order) | timeFormatHHMMSS }} out of {{ playBookChapterTotalDuration(chapter.order) | timeFormatHHMMSS }}</div>
                            </small>
                        </div>
                    </div>
                </section>
            </transition>
        </template>
        
        <SectionMenu class="menu"></SectionMenu>
    </main>
</template>

<script>
    import SectionSignIn    from './components/SectionSignIn.vue'
    import SectionNovelist  from './components/SectionNovelist.vue'
    import SectionAccount   from './components/SectionAccount.vue'
    import SectionList      from './components/SectionList.vue'
    import SectionFilters   from './components/SectionFilters.vue'
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
            SectionFilters,
            SectionMenu,

            ShareBook,
            FiveStarRate
        },
        data() {
            return {
                isAuthenticated: true,

                user: {},               // for data for user
                books: [],              // for data for all user books
                player: {},             // for saved player date
                playBook: {},           // for play book date
                playChapter: {},        // for play chapter date

                selectedBookId: null,   // currently playing book

                audio: {
                    src: '',
                    object: null,
                    currentTime: null,
                    duration: null
                },

                // sectionList: false,
                showSectionNovelist: false,
                showSectionAccount: false,
                showSectionFilters: false,
                showSectionPlayer: false,
                showSectionShare: false,
                showSectionRate: false,
                showSectionDescription: false,
                showSectionContents: false,

                // books list sort types - default, title
                sortBooksListType: 'default',

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
                if (this.showSectionFilters)
                    this.toggleSectionFilters()
            },
            signingUp() {
                window.open('http://noveli.st', '_blank')
            },

            // toggle sections
            toggleSectionNovelist() {
                if (!this.isAuthenticated)
                    this.showSectionNovelist = !this.showSectionNovelist
                else {
                    if (this.showSectionAccount)
                        this.showSectionAccount = false
                    this.showSectionNovelist = !this.showSectionNovelist
                }
            },
            toggleSectionAccount() {
                if (this.showSectionNovelist)
                    this.showSectionNovelist = false

                this.showSectionAccount = !this.showSectionAccount
            },
            toggleSectionFilters() {
                this.showSectionFilters = !this.showSectionFilters
            },
            toggleSectionShare() {
                this.showSectionShare = !this.showSectionShare
            },
            toggleSectionRate() {
                this.showSectionRate = !this.showSectionRate
            },
            toggleSectionDescription() {
                this.showSectionDescription = !this.showSectionDescription
            },
            toggleSectionContents() {
                this.showSectionContents = !this.showSectionContents
            },

            // player
            playerHide() {
                this.showSectionPlayer = false
            },
            playerShow() {
                this.showSectionPlayer = true
            },
            playerClose() {
                this.playerPause()
                this.playBook = {}
                this.selectedBookId = null
                this.resetAudioObject()
                this.showSectionPlayer = false
            },
            palyerAddSpeed() {
                this.player.speed >= this.player.speedName.length - 1 ? this.player.speed = 0 : this.player.speed++
                if (this.audio.object)
                    this.audio.object.playbackRate = this.audioSpeed
            },
            palyerSwitchChapter(direction) {
                this.playerPause()
                this.playBook.listeningChapter += direction
                this.setPlayChapterData()
                // this.playBook.listening.paragraph = 0
            },
            palyerChangeChapter(order) {
                if (this.playBook.listeningChapter != order) {
                    this.playerPause()
                    this.playBook.listeningChapter = order
                    this.setPlayChapterData()
                }
            },
            playerRewind(direction) {

                if (direction < 0 && this.playChapter.lastListenedParagraph >= 0 || direction > 0 && this.playChapter.lastListenedParagraph < this.playChapter.paragraphs.length - 1) {
                    this.playChapter.lastListenedParagraph += direction
                    this.audioPause()
                    this.setAudioObject()
                    if (this.isPlayerStarted)
                        this.audioPlay()
                }

                // let listen = parseInt(this.playChapter.listen) + this.player.rewind * direction
                // if( listen < 0 )
                //     return this.playChapter.listen = 0
                // if( listen > this.playChapter.length )
                //     return this.playChapter.listen = this.playChapter.length
                // return this.playChapter.listen = listen
            },
            playerStart() {
                if (!this.isPlayBookChapterEnded) {
                    this.isPlayerStarted = true
                    this.audioPlay()
                }
            },
            playerPause() {
                this.isPlayerStarted = false
                this.audioPause()
            },

            // player sets
            setPlayBookData(playBookIndex) {
                this.playBook = this.books[playBookIndex]
            },
            setPlayChapterData() {
                this.resetAudioObject()
                this.playChapter = this.playBook.chapters[this.playBook.listeningChapter]
            },
            resetPlayChapterData() {
                this.resetAudioObject()
                this.playChapter.lastListenedParagraph = -1
            },
            // player gets
            getCurrentParagraphTime() {
                return this.audio.object ? this.audio.object.currentTime : 0
            },
            playBookChapterCurrentDuration(chapterOrder = this.playBook.listeningChapter) {
                let curentDuration = 0
                let chapter = this.playBook.chapters[chapterOrder]
                for (var order in chapter.paragraphs) {
                    if (chapter.lastListenedParagraph >= 0 && order <= chapter.lastListenedParagraph) {
                        if (chapter.paragraphs[order].type === 'text')
                            curentDuration += chapter.paragraphs[order].duration
                    } else break
                }

                curentDuration /= 1000  /* convert millisecond to second */
                if (chapter.order === this.playBook.listeningChapter)
                    curentDuration += this.audio.currentTime
                return curentDuration
            },
            playBookChapterTotalDuration(chapterOrder = this.playBook.listeningChapter) {
                let chapterDuration = 0
                for (let paragraph of this.playBook.chapters[chapterOrder].paragraphs)
                    if (paragraph.type === 'text')
                        chapterDuration += paragraph.duration
                return chapterDuration / 1000    /* convert millisecond to second */
            },

            // audio
            audioPlay() {
                if (this.setAudioObject())
                    this.audio.object.play()
            },
            audioPause() {
                if(this.audio.object)
                    this.audio.object.pause()
            },

            // audio sets
            setAudioObject() {
                if (this.audio.src != this.audioSrc) {
                    this.resetAudioObject()
                    this.audio.src = this.audioSrc
                    this.audio.object = new Audio(this.audio.src)
                    // this.audio.duration = this.playChapter.paragraphs[this.playChapter.lastListenedParagraph + 1].duration / 1000
                    this.audio.object.addEventListener('loadedmetadata', () => this.audio.duration = this.audio.object.duration)
                    this.audio.object.addEventListener('timeupdate', this.audioUpdater)
                    this.audio.object.addEventListener('ended', this.audioEnded)
                    this.audio.object.playbackRate = this.audioSpeed

                    // this.audio.duration = parseInt(this.audio.object.duration)
                }
                return this.audio.object ? true : false
            },
            resetAudioObject() {
                    this.audio.src = ""
                    this.audio.object = this.audio.currentTime =  this.audio.duration = null
            },

            // audio events
            audioEnded() {
                this.playChapter.lastListenedParagraph ++

                if (this.playChapter.lastListenedParagraph < this.playChapter.paragraphs.length - 1) {
                    this.setAudioObject()
                    this.audio.object.play()
                } else
                    this.playerPause()

                    this.audio.currentTime = 0

                // if (this.playBook.listening.paragraph < this.playChapter.paragraphs.length - 1) {
                //     this.playBook.listening.paragraph++
                //     this.setAudioObject()
                //     this.audio.object.play()
                // } else {
                //     this.playerPause()
                // }
            },
            audioUpdater() {
                this.audio.currentTime = this.getCurrentParagraphTime()
            }
        },
        filters: {
            timeFormatHHMMSS: (s) => new Date(s * 1000).toISOString().substr( s < 3600 ? 14 : 11, s < 3600 ? 5 : 8)
        },
        computed: {
            // sort books list by types 
            sortBooksList() {
                if (this.sortBooksListType === 'title')
                    return [...this.books].sort((a, b) => a.title.localeCompare(b.title))

                if (this.sortBooksListType === 'eltit')
                    return [...this.books].sort((a, b) => a.title.localeCompare(b.title)).reverse()

                return this.books
            },

            // hide or show sections
            isSectionSignIn() {
                if (this.isAuthenticated || this.showSectionNovelist)
                    return false

                // if ( this.isSectionNovelist && this.isAuthenticated )
                //     return false

                return true
            },
            isSectionList() {
                if (!this.isAuthenticated || this.showSectionNovelist || this.showSectionAccount)
                    return false

                return true
            },
            isSectionFilters() {
                // || this.isSectionPlayer
                if (this.showSectionNovelist || this.showSectionAccount)
                    return false
                    
                return this.showSectionFilters
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
            playBookPartPrevEnable() {
                return this.playBook.listeningChapter <= 0 ? false : true
            },
            playBookPartNextEnable() {
                return this.playBook.listeningChapter >= this.playBook.chapters.length - 1 ? false : true
            },
            playRewindBackEnable() {
                // return this.playBookCurrentDuration + ( this.audio.object ? this.audio.currentTime : 0 ) <= 0 ? false : true    // depend on curent time
                return this.playBookCurrentParagraph <= 0 ? false : true     // depend on paragraphs
                // return this.playChapter.listen <= 0 ? false : true           // old
            },
            playRewindFrontEnable() {
                return this.playBookCurrentParagraph >= this.playChapter.paragraphs.length - 1 ? false : true // depend on paragraphs
                // return this.playChapter.listen >= this.playChapter.length ? false : true // old
            },
            playStartDisable() {
                return this.isPlayerStarted
            },
            playerPlayPauseEnable() {
                // return this.playRewindFrontEnable
                return !this.isPlayBookChapterEnded
            },
            playBookCurrentParagraph() {
                return this.playChapter.lastListenedParagraph + 1
            },
            playBookCurrentDuration() {
                let curentDuration = 0
                for (let chapter of this.playBook.chapters) {
                    for (var order in chapter.paragraphs) {
                        if (chapter.lastListenedParagraph >= 0 && order <= chapter.lastListenedParagraph) {
                            if (chapter.paragraphs[order].type === 'text')
                                curentDuration += chapter.paragraphs[order].duration
                        } else break
                    }
                }
                return curentDuration / 1000    /* convert millisecond to second */
            },
            playBookTotalDuration() {
                let totalDuration = 0
                for (let chapter of this.playBook.chapters)
                    for (let paragraph of chapter.paragraphs)
                        if (paragraph.type === 'text')
                            totalDuration += paragraph.duration
                return totalDuration / 1000    /* convert millisecond to second */
            },
            isPlayBookChapterEnded() {
                return this.playChapter.lastListenedParagraph === this.playChapter.paragraphs.length - 1 ? true : false
            },
            audioSrc() {
                // let paragraph = this.playChapter.paragraphs[this.playBook.listening.paragraph]
                // if ( this.playChapter.lastListenedParagraph < this.playChapter.paragraphs.length ) {
                    let paragraph = this.playChapter.paragraphs[this.playBookCurrentParagraph]
                    return `http://mobitoon.ru/novelist/app/books/${this.selectedBookId}/${this.selectedBookId}_${this.playChapter.id}_${paragraph.id}.${paragraph.extension}`
                // } else
                // return false

            },
            audioSpeed() {
                return 1 + this.player.speed * .25
            },
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