ng build --prod --output-hashing none --single-bundle true --keep-polyfills
mv dist/greet-tastic/main-es2015.js demo/greet-tastic.js
mv dist/greet-tastic/polyfills-es2015.js demo/greet-tastic-polyfills.js
mv dist/greet-tastic/scripts.js  demo/greet-tastic-scripts.js
