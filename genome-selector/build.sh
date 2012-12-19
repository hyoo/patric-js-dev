rm GenomeSelector.js
cat app/model/* >> GenomeSelector.js
cat app/store/* >> GenomeSelector.js
cat app/view/* >> GenomeSelector.js
java -jar ../yuicompressor-2.4.7.jar GenomeSelector.js > GenomeSelector.min.js
#cp GenomeSelector.js ../../js/vbi/GenomeSelector.js
#cp GenomeSelector.min.js ../../js/vbi/GenomeSelector.min.js
