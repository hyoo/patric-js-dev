rm GeneExpression.debug.js
cat app/model/* >> GeneExpression.debug.js
cat app/store/* >> GeneExpression.debug.js
cat app/view/*.js >> GeneExpression.debug.js
cat app/controller/*.js >> GeneExpression.debug.js
cat app.js >> GeneExpression.debug.js
java -jar ../yuicompressor-2.4.7.jar GeneExpression.debug.js > GeneExpression.js
#cp GeneExpression.debug.js ../../js/vbi/GeneExpression.debug.js
#cp GeneExpression.js ../../js/vbi/GeneExpression.js
