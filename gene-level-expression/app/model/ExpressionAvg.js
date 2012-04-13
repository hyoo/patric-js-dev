/**
 * @class CoordView.model.ExpressionAvg
 * @extends Ext.data.Model
 *
 * This class defines the data model for accession.
 *
 */
Ext.define('CoordView.model.ExpressionAvg', {
	extend: 'Ext.data.Model',
	idProperty: 'range',
	fields: [
		{name: 'range', type: 'string'},
		{name: 'count', type: 'int'}
	]
});

