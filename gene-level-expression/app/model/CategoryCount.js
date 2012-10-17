/**
 * @class VBI.GeneExpression.model.CategoryCount
 * @extends Ext.data.Model
 * 
 * This class defines a data model for category-and-count data in order to draw a chart.
 */
Ext.define('VBI.GeneExpression.model.CategoryCount', {
	extend: 'Ext.data.Model',
	idProperty: 'rownum',
	fields: [
		{name: 'rownum', type: 'int'},
		{name: 'category', type: 'string'},
		{name: 'count', type: 'int'}
	]
});
