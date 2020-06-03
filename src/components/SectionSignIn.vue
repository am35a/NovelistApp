<template>
    <section>
        <div class="mb-3">
            <label for="login">EMail</label>
            <input id="login" type="text" value="your@email.com">
        </div>
        <div class="mb-5">
            <label for="password">Password</label>
            <input type="password" value="123456">
        </div>
        <input @click="$parent.signingIn" type="button" value="Sign In">
    </section>
</template>

<script>
    export default {
        name: 'SectionSignIn'
    }
</script>