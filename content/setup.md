---
title: NUXT als SSR App auf einem netcup Webhosting-Tarif
description: Kleiner Beitrag von mir.
---

## Intro

Ich mag netcup als Unternehmen. Netcup ist seit Langem ein Partner für alle möglichen Kundenprojekte. Allerdings finde ich es mittlerweile etwas altbacken, wie mit altueller und neuer Technologie umgegangen wird. Durch den Einsatz von Plesk ist die Konfiguration von z.B. Python-Anwendungen auf Basis von Django, Flask oder Ähnlichem aufgrund einer fehlenden Virtualisierungsmöglichkeit via venv und Co. quasi garnicht möglich eine solche App sinnvoll und updatefähig zu betreiben. Bei node.js Anwendungen sieht es etwas anders aus. Auch wenn im Webhosting (und ja mir ist bewusst, dass ich mit einem server alles machen kann. Will ich aber nicht. Ich möchte mich nicht um Updates von Datenbanken, Apache, Nginx und Co. kümmern. ) per SSH kein npm zur Verfügung steht und die neuste Version von node 14. irgendwas ist, gib es eine einfache Möglichkeit node-Anwendungen auf dem Webspace laufen zu lassen. Ich mache das jetzt mal am Beispiel von nuxt. 

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

Wir können jetzt das Repository beim Versionsverwalter unseres Vertrauens hochladen. Ich nutze dafür github. Das funktioniert recht schmerzfrei mit Netcup.

### netcup konfigurieren
Die Konfiguration auf dem Netcup-Server ist relativ einfach. Wenn man denn weiß wie es geht. Legt zunächst eine Domain an. Im anschließenden Fester könnt ihr node für diese domain aktivieren.

<nuxt-img class="image" src="/images/netcup_01.png"></nuxt-img>

Image 1 Unterschrift 

Das sieht dann in etwa so aus. Hier sehen wir auch, dass Plesk eine app.js erwartet.

<nuxt-img class="image" src="/images/netcup_02.png"></nuxt-img>

Unterschrift

Die Daten kommen idealerweise vom Repository, das ihr vorher eingerichtet habt. Plesk ist in der Lage automatisch Daten via git zu holen. Hinterlegt das Repo und nutzt bei Github die Möglicheit die Webhook-URL zu hinterlegen. Du findest die Einstellungen dafür in den Settings des Repositories. Immer wenn dann etwas committet wird, wird von Netcup aus der Pull-Request ausgeführt.

<nuxt-img src="/images/netcup_git_01.png"></nuxt-img>

Plesks Git Funktion zum automatischen Deploy

Jetzt können wir die Daten vom System holen. Und die App das erste Mal deployen und starten. Geht dazu zurück in den Reiter Node.js App. Hier führen wir den `npm install` mit Hilfe der UI aus. Das dauert mitunter mehrerer Minuten und sollte in einem Warnhinweis enden. Wenn ihr einen Error bekommt, dann schaut nochmal ob eine .npmrc Datei im Root des Repos enthalten ist. Zum Schluss führen wir über die UI noch ein Skript aus.

<nuxt-img class="image" src="/images/netcup_build.png"></nuxt-img>

npm run build auf dem Plesk-Server von netcup

Damit die App funktioniert, muss der `build` Befehl ausgeführt werden, der die App baut. Auch das dauert ein wenig und man bekommt nicht wirklich mit, was in der Zwischenzeit passiert. Sollte aber durchgehen, solange sich die App auch lokal bauen lässt. Wenn der Prozess abgeschlossen ist, können wir die App neu starten.

*DONE*

Soweit so gut. Ich habe allerdings ein Problem noch nicht lösen können. Nachdem der Pull automatisch von GitHub geholt wurde, muss man manuell in die Plesk UI und dort die Schritte build und neustarten durchführen. Auf dem Bild 3 siehst du den Ort, an dem sich diese Schritte automatisieren lassen könnten. Zumindest der Neustart funktioniert auf diese Weise. Ohne den `build` Befehl ist das allerdings nicht wirklich zu gebrauchen. Solange npm nicht verfügbar ist wird man das wohl in Kauf nehmen müssen. Wenn jemand eine Lösung hat, freue ich mich natürlich über jede Anregung.

Vielen Dank & *happy 🖖 code*! 
