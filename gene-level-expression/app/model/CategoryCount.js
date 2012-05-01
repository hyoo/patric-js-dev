/**
 * @class CoordView.model.CategoryCount
 * @extends Ext.data.Model
 *
 * This class defines the data model for category-and-count in order to feed data to draw a chart.
 *
 */
Ext.define('CoordView.model.CategoryCount', {
	extend: 'Ext.data.Model',
	idProperty: 'category',
	fields: [
		{name: 'category', type: 'string'},
		{name: 'count', type: 'int'}
	]
});
