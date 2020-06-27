<template>
    <section>
        <svg @click="$parent.toggleSectionNovelist" class="mw-100 mh-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <title>Novelist</title>
            <circle fill="#D4145A" cx="128" cy="128" r="128"/>
            <path fill="#ffffff" d="M113.9,140.5c-6.2-6.9-6.6-17.3-0.6-24.6c6.6-8.1,18.7-9.3,26.7-2.7c8.2,6.6,9.4,18.7,2.7,26.7 c-6,7.4-16.3,9.1-24.3,4.3L44,235.4l3.8,2.9c2.6-3.9,31.1-42,114.1-52.8c20.1-50.6,72.5-117.3,81.8-128.8 c-15.6-25.5-39.4-45.3-67.7-56l0,0c-9,10.7-64.1,76.2-110.2,106.3c6,83.4-26.3,118.2-29.9,121.6l3.5,3.1L113.9,140.5z"/>
        </svg>
        <template v-if="$parent.isAuthenticated">
            <div></div>
            <svg v-if="$parent.isPlayerStarted && !$parent.showSectionPlayer" @click="$parent.playerShow" class="mw-100 mh-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/>
            </svg>
            <div v-else></div>
            <svg @click="$parent.toggleSectionFilters" class="mw-100 mh-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
            </svg>
            <div class="divider"></div>
            <svg @click="$parent.toggleSectionAccount" class="mw-100 mh-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
        </template>
    </section>
</template>

<script>
    export default {
        name: "SectionMenu"
    }
</script>
