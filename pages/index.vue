<script lang="ts" setup>
const { signInWithGoogle, signOut, user } = useAuth();
</script>

<template>
  <div>
    <div v-if="user">
      Welcome back, {{ user?.email }} <button @click="signOut">Sign Out</button>
    </div>
    <button @click="signInWithGoogle" v-else>Sign In With Google</button>
  </div>
</template>

