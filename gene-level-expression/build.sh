rm GeneExpression.js
cat app/model/* >> GeneExpression.js
cat app/store/* >> GeneExpression.js
cat app/view/*.js >> GeneExpression.js
cat app/controller/*.js >> GeneExpression.js
cat app.js >> GeneExpression.js
java -jar ../yuicompressor-2.4.7.jar GeneExpression.js > GeneExpression.min.js
cp GeneExpression.js ../../js/vbi/GeneExpression.js
cp GeneExpression.min.js ../../js/vbi/GeneExpression.min.js
