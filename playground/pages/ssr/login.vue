<script lang="ts" setup>
const form = reactive({
  email: '',
  password: '',
})

const onLogin = async () => {
  try {
    await $fetch('/api/session', {
      method: 'POST',
      body: {
        email: form.email,
        password: form.password,
      },
    })
    await navigateTo('/ssr/protected')
  }
  catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div>
    <h1>Login</h1>

    <form @submit.prevent="onLogin">
      <input v-model.trim="form.email" type="email" placeholder="Enter your email">
      <input v-model.trim="form.password" type="password" placeholder="Enter your password">

      <button type="submit">
        Login
      </button>
    </form>
  </div>
</template>
