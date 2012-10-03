rm TranscriptomicsUpload.js
cat app/model/* >> TranscriptomicsUpload.js
cat app/store/* >> TranscriptomicsUpload.js
cat app/view/*.js >> TranscriptomicsUpload.js
cat app/controller/*.js >> TranscriptomicsUpload.js
cat app.js >> TranscriptomicsUpload.js
java -jar ../yuicompressor-2.4.7.jar TranscriptomicsUpload.js > TranscriptomicsUpload.min.js
cp TranscriptomicsUpload.js ../../js/vbi/TranscriptomicsUpload.js
cp TranscriptomicsUpload.min.js ../../js/vbi/TranscriptomicsUpload.min.js
