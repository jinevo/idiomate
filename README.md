# idiomate

idiomate is an app built with Vue, Vuetify, Vuex and Typescript. The goal of the app is to offer a simple solution to test languages pronounciations or to challenge friend and family on their accent.

The app uses the SpeechRecognition Web API and is only available on Chrome Desktop and Chrome Android since Speech Recognition solutions on the cloud are limited and require paid plans to use it.

The Speech Recognition seems to work a bit differently on Android. So some bugs appear on the UI such as previous speeches.

The App can be live testes on the URL demo : https://jinevo.github.io/idiomate/

3 languages are available : French, English and Spanish. Other are coming !

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
