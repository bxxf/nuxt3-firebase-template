<script lang="ts" setup>
const { signInWithGoogle } = useAuth();
</script>

<template>
  <button @click="signInWithGoogle">Sign In With Google</button>
</template>

