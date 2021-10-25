<template>
  <section class="section flex justify-center py-32">
    <div class="author flex flex-col justify-center items-center md:flex-row ">
    <img :src="author.avatar" class="author__avatar w-36 h-36 rounded-lg overflow-hidden shadow-md" :alt="`Image of ${username}`">
    <div class="author__info text-center md:text-left">
      <div>{{ name }}</div>
      <div>Github User: {{author.name}}</div>
      <div>Profil Url: <a :href="author.profileUrl" class="font-mono font-bold" rel="nofollow">{{author.profileUrl}}</a></div>
    </div>
  </div>
  </section>
</template>

<script>
export default {
  props: {
    provider: {
      type: String,
      default: 'github',
    },
    username: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: 'Firstname Lastname',
    },
  },
  computed: {},
  data() {
    return {
      author: {},
      providers: {
        github: {
          url: `https://api.github.com/users/${this.username}`,
          props: {
            avatar: 'avatar_url',
            name: 'name',
            profileUrl: 'html_url',
          },
        },
      },
    }
  },
  created() {
    const that = this
    const provider = this.providers[this.provider]
    this.$axios.$get(provider.url).then((data) => {
      Object.entries(provider.props).map(prop => {
        const [key,val] = prop
        that.$set(this.author,key,data[val])
      })

    })
  },
}
</script>

<style lang="postcss" scoped>
.author__avatar {
  transform: perspective(100px) rotateY(5deg);
}
.author__info{
  @apply p-4;
}
</style>
