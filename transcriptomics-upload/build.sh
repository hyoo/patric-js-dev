rm TranscriptomicsUpload.debug.js
cat app/model/* >> TranscriptomicsUpload.debug.js
cat app/store/* >> TranscriptomicsUpload.debug.js
cat app/view/*.js >> TranscriptomicsUpload.debug.js
cat app/controller/*.js >> TranscriptomicsUpload.debug.js
cat app.js >> TranscriptomicsUpload.debug.js
java -jar ../yuicompressor-2.4.7.jar TranscriptomicsUpload.debug.js > TranscriptomicsUpload.js
#cp TranscriptomicsUpload.debug.js ../../js/vbi/TranscriptomicsUpload.debug.js
#cp TranscriptomicsUpload.js ../../js/vbi/TranscriptomicsUpload.js
