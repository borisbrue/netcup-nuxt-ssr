# nuxt als running ssr app auf netcup webhosting


## Intro

Ich mag netcup als Unternehmen. netcup ist seit mehreren Jahren ein verlässlicher Partner für alle möglichen Kundenprojekte. Allerdings finde ich es mittlerweile etwas altbacken, wie mit altueller und neuer Technologie umgegangen wird. Durch den Einsatz von Plesk ist die Konfiguration von z.B. Python-Anwendungen auf Basis von Django, Flask oder Ähnlichem aufgrund einer fehlenden Virtualisierungsmöglichkeit via venv und Co. ist es quasi garnicht möglich eine solche App sinnvoll und updatefähig zu betreiben.

Bei node.js Anwendungen sieht es zum Glück etwas anders aus. Auch wenn im Webhosting (*und ja mir ist bewusst, dass ich mit einem server alles machen kann. Will ich aber nicht. Ich möchte mich nicht um Updates von Datenbanken, Apache, Nginx und Co. kümmern.*) per SSH kein npm zur Verfügung steht und die neuste Version von node 14.xx ist, gibt es eine einfache Möglichkeit node-Anwendungen auf dem Webhosting laufen zu lassen. 
Ich mache das jetzt mal am Beispiel von nuxt.

### Nuxtprojekt anlegen und zu github übertragen

```bash
npx create-nuxt-app nuxt-ssr
```

Du findest das Repo hier: <https://github.com/borisbrue/netcup-nuxt-ssr>

Als nächstes erzeugen wir noch eine app.js (Name ist wumpe. Wird von Plesk so vorgeschlagen und ich bin faul)

```js{1,3-5}[app.js]
const nuxt = require('@nuxt/cli')
nuxt.run(['start'])
```

Die Datei ist notwendig, da Plesk eine Startdatei braucht. Wir holen uns dort das CLI für Nuxt und starten die Anwendung im Server-Modus. Gleiches erzielst du auch, wenn du `yarn start` im Terminal nutzt. Plesk müssen wir den Befehl aber anders beibringen. Zusätzlich legen wir eine `.npmrc` Datei an. Die brauchen wir, damit wir bei der Installation keine Fehlermeldungen bekommen.

```makefile [.npmrc]
scripts-prepend-node-path=true
```

Zum Schluss müssen wir noch den Port auf den Defaultport von Plesk (80) setzen. Dazu nutze ich die Nuxt Config.

```js{1,3-5}[nuxt.config.js]
...
server: {
    port: process.env.NODE_ENV !== 'production'? '3000': '80',
  },
...
```

Wir können jetzt das Repository beim Versionsverwalter unseres Vertrauens hochladen. Ich nutze dafür github. Das funktioniert recht schmerzfrei mit netcup.
