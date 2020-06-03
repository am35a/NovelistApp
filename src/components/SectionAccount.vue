<template>
    <section>
        <div class="text-center mb-3">
            <img class="thumb rounded-lg shadow-sm" src="https://ak.picdn.net/shutterstock/videos/1033560494/thumb/4.jpg" alt="Username">
            <div>
                <b>Username</b>
            </div>
        </div>
        <input @click="$parent.signingOut" type="button" value="Sign Out">
    </section>
</template>

<script>
    export default {
        name: 'SectionAccount'
    }
</script>