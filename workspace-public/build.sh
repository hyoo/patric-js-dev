rm PublicWorkspace.js
cat app/model/* >> PublicWorkspace.js
cat app/store/* >> PublicWorkspace.js
cat app/view/columns/HeaderContainer.js >> PublicWorkspace.js
cat app/view/*/* >> PublicWorkspace.js
cat app/view/*.js >> PublicWorkspace.js
cat app/controller/*.js >> PublicWorkspace.js
cat app.js >> PublicWorkspace.js
java -jar ../yuicompressor-2.4.7.jar PublicWorkspace.js > PublicWorkspace.min.js
cp PublicWorkspace.js ../../js/vbi/PublicWorkspace.js
cp PublicWorkspace.min.js ../../js/vbi/PublicWorkspace.min.js
