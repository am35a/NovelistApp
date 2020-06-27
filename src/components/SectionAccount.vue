<template>
    <section>
        <div class="splash text-center">
            <img class="thumb rounded-circle shadow-sm" src="http://mobitoon.ru/novelist/images/users/0/preview.svg" alt="Username">
            <div class="my-1">{{ $parent.user.name }}</div>
            <div class="text-uppercase display-5">
                <div>{{ $parent.user.status }}</div>
            </div>
        </div>
            <div class="btn-so">
                <button @click="$parent.signingOut" class="button-block button-light button-scope button-round" type="button">
                    Sign Out
                </button>
            </div>
        <!--div class="body mb-3">
            <div class="row mb-1">
                <svg class="mw-100 mh-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
                </svg>
                <div>{{ (new Date($parent.user.created)).toLocaleDateString() }}</div>
            </div>
            <div class="row mb-1">
                <svg class="mw-100 mh-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <div>{{ $parent.user.phone }}</div>
            </div>
            <div class="row mb-1">
                <svg class="mw-100 mh-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57V12c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
                </svg>
                <div>{{ $parent.user.email }}</div>
            </div>
            <div class="row mb-1">
                <svg class="mw-100 mh-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <div>{{ $parent.user.location }}</div>
            </div>
            <input @click="$parent.signingOut" type="button" value="Sign Out">
        </div> -->
    </section>
</template>

<script>
    export default {
        name: 'SectionAccount'
    }
</script>