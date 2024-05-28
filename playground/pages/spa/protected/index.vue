<script lang="ts" setup>
const { account } = useAppwrite()

const currentUser = ref<object | null>(null)

onMounted(async () => {
  try {
    const user = await account.get()
    currentUser.value = user
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div>
    protected page

    <pre>
      {{ currentUser }}
    </pre>
  </div>
</template>
