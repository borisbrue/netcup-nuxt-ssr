<template>
  <TheArticle v-if="article" :article="article" />
</template>

<script>
export default {
  async asyncData({ $content }) {
    const article = await $content('setup').fetch()
    return {
      article,
    }
  },
}
</script>
<style></style>
