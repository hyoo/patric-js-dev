rm Workspace.js
cat app/model/* >> Workspace.js
cat app/store/* >> Workspace.js
cat app/view/*/* >> Workspace.js
cat app/view/*.js >> Workspace.js
cat app/controller/*.js >> Workspace.js
cat app.js >> Workspace.js
java -jar ../yuicompressor-2.4.7.jar Workspace.js > Workspace.min.js
cp Workspace.js ../../js/vbi/Workspace.js
cp Workspace.min.js ../../js/vbi/Workspace.min.js
