find ./app/ -name '*.js' -exec cat {} \; > Workspace.debug.js
cat app.js >> Workspace.debug.js
java -jar ../yuicompressor-2.4.7.jar Workspace.debug.js > Workspace.js
#cp Workspace.debug.js ../../js/vbi/Workspace.debug.js
#cp Workspace.js ../../js/vbi/Workspace.js
