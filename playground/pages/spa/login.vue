<script lang="ts" setup>
const form = reactive({
  email: '',
  password: ''
})

const { account } = useAppwrite()
const onLogin = async () => {
  try {
    await account.createEmailPasswordSession(form.email, form.password)
    await navigateTo('/spa/protected')
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div>
    <h1>Login</h1>

    <form @submit.prevent="onLogin">
      <input
        v-model.trim="form.email"
        type="email"
        placeholder="Enter your email"
      />
      <input
        v-model.trim="form.password"
        type="password"
        placeholder="Enter your password"
      />

      <button type="submit">Login</button>
    </form>
  </div>
</template>
