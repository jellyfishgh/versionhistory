# versionhistory

version history of iOS/Android app

``` sh
browserify ./src/app.js -o ./dist/bundle.js
uglifyjs ./dist/bundle.js -c -o ./dist/bundle.min.js
node server.js
```