<template>
  <article>
    <h1>{{ page.title }}</h1>
    <nuxt-content :document="page" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const page = await $content('setup').fetch()

    return {
      page,
    }
  },
}
</script>
<style lang="postcss" scoped>
article {
  @apply max-w-4xl mx-auto;
}
h1 {
  @apply font-mono antialiased  mb-16 leading-normal font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400;
}
article >>> h2{
  @apply font-sans font-bold text-2xl mt-8;
}
article >>> h3{
  @apply font-sans font-bold text-xl mt-8;
}
article >>> img{
  @apply px-8 pt-8 pb-2 ;
}
article >>> img + p{
  @apply text-center text-sm p-4 font-bold;
}
article >>> p{
  @apply font-sans leading-loose text-xl;
}
article >>> p + p {
  @apply mb-4;
}
article >>> .nuxt-content-highlight{
  @apply my-4;
}
article >>> .nuxt-content-highlight pre{
  @apply rounded-md;
}
article >>> .nuxt-content-highlight .filename {
  @apply m-2 font-mono;
}
</style>
