find ./app/ -name '*.js' -exec cat {} \; > Workspace.debug.js
cat app.js >> Workspace.debug.js
java -jar ~/Downloads/yuicompressor-2.4.6/build/yuicompressor-2.4.6.jar Workspace.debug.js > Workspace.js
cp Workspace.debug.js ../../js/vbi/Workspace.debug.js
cp Workspace.js ../../js/vbi/Workspace.js
