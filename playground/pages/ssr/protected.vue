<script lang="ts" setup>
const { data: currentUser, pending, error } = useFetch('/api/account')
</script>

<template>
  <div>
    protected page

    <p v-if="pending">
      loading...
    </p>

    <p v-else-if="error">
      There has been an error
    <pre>
        {{ error }}
      </pre>
    </p>

    <pre v-else>{{ currentUser }}</pre>
  </div>
</template>
