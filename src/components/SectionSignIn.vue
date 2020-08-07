<template>
    <section>
        <div class="splash text-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <title>Novelist</title>
                <circle fill="#D4145A" cx="128" cy="128" r="128"/>
                <path fill="#ffffff" d="M113.9,140.5c-6.2-6.9-6.6-17.3-0.6-24.6c6.6-8.1,18.7-9.3,26.7-2.7c8.2,6.6,9.4,18.7,2.7,26.7 c-6,7.4-16.3,9.1-24.3,4.3L44,235.4l3.8,2.9c2.6-3.9,31.1-42,114.1-52.8c20.1-50.6,72.5-117.3,81.8-128.8 c-15.6-25.5-39.4-45.3-67.7-56l0,0c-9,10.7-64.1,76.2-110.2,106.3c6,83.4-26.3,118.2-29.9,121.6l3.5,3.1L113.9,140.5z"/>
            </svg>
            <div class="d-none-if-keypad-portrait text-uppercase display-5">
                <div>Book your mind</div>
                <div>to flying high!</div>
            </div>
        </div>
        <div class="inp-em">
            <div class="input-custom">
                <input type="text" value="" placeholder="eMail">
                <div class="underline"></div>
                <svg class="placeholder-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 4H2v16h20V4zm-2 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
            </div>
        </div>
        <div class="inp-pw">
            <div class="input-custom">
                <input type="password" value="" placeholder="Password">
                <div class="underline"></div>
                <svg class="placeholder-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L3 5v6c0 5.5 3.8 10.7 9 12c5.2-1.3 9-6.5 9-12V5L12 1z"/>
                </svg>
            </div>
        </div>
        <small class="errors">
            <!-- error message will be here -->
        </small>
        <div class="btn-fp">
            <a class="button button-block button-second">Forgotten pass?</a>
        </div>
        <div class="btn-su">
            <input @click="$parent.signingUp" class="button-block button-second text-opposite" value="Sign Up" type="button">
        </div>
        <div class="btn-si">
            <button @click="$parent.signingIn" class="button-block button-x-fix button-light button-round m-auto" type="button">
                Sign In
            </button>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'SectionSignIn'
    }
</script>