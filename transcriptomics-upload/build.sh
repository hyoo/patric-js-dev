rm TrasnscriptomicsUpload.debug.js
cat app/model/* >> TrasnscriptomicsUpload.debug.js
cat app/store/* >> TrasnscriptomicsUpload.debug.js
cat app/view/* >> TrasnscriptomicsUpload.debug.js
cat app/controller/*.js >> TrasnscriptomicsUpload.debug.js
cat app.js >> TrasnscriptomicsUpload.debug.js
java -jar ../yuicompressor-2.4.7.jar TrasnscriptomicsUpload.debug.js > TrasnscriptomicsUpload.js
#cp TrasnscriptomicsUpload.debug.js ../../js/vbi/
#cp TrasnscriptomicsUpload.js ../../js/vbi/
