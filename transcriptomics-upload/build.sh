rm TranscriptomicsUpload.debug.js
cat app/model/* >> TrasnscriptomicsUpload.debug.js
cat app/store/* >> TrasnscriptomicsUpload.debug.js
cat app/view/* >> TrasnscriptomicsUpload.debug.js
cat app/controller/*.js >> TrasnscriptomicsUpload.debug.js
cat app.js >> TrasnscriptomicsUpload.debug.js
java -jar ~/Downloads/yuicompressor-2.4.6/build/yuicompressor-2.4.6.jar TrasnscriptomicsUpload.debug.js > TrasnscriptomicsUpload.js
#cp TrasnscriptomicsUpload.debug.js ../../js/vbi/
#cp TrasnscriptomicsUpload.js ../../js/vbi/
