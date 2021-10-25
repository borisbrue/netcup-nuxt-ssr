const spawn = require('child_process').spawn;

const nuxt = require('@nuxt/cli')
const build = nuxt.run(['build'])
build.then(() => {
  process.on('exit', () => {
    const child = spawn('node', ['./app.js'], {
      detached: true,
      stdio: 'ignore'
   });
 });
}).finally(() => {
  process.exit(1)
})


//
