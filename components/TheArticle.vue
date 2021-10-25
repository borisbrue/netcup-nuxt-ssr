<template>

    <article v-if="article.body">
      <div class="hero py-40 md:py-4">
        <h1>{{ article.title }}</h1>
      </div>
      <nuxt-content :document="article" />
    </article>

</template>

<script>
  export default {
    props: {
      article: {
        type: Object,
        default:() => ({})
      }
    }
  }
</script>

<style lang="postcss" scoped>
article {
  @apply max-w-sm px-8 md:px-4 md:max-w-2xl lg:max-w-4xl mx-auto;
}
h1 {
  @apply font-mono antialiased  mb-16 leading-normal font-extrabold text-transparent text-3xl md:text-4xl lg:text-6xl bg-clip-text bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400;
}
article >>> h2{
  @apply font-sans font-bold text-2xl mt-8;
}
article >>> h3{
  @apply font-sans font-bold text-xl mt-8;
}
article >>> img.image{
  @apply px-8 pt-8 pb-2 ;
}
article >>> img.image + p{
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
article >>> a {
  @apply font-mono font-bold text-green-400 hover:text-green-500;
}
article >>> p code {
  @apply text-yellow-500 px-2 text-sm;
}

</style>
