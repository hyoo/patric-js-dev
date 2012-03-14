/**
 * @class CoordView.model.Accession
 * @extends Ext.data.Model
 *
 * This class defines the data model for accession.
 *
 */
Ext.define('CoordView.model.Accession', {
	extend: 'Ext.data.Model',

	idProperty: 'exp_stat_accession',

	fields: [
		{name: 'name', type: 'string'},
		{name: 'count', type: 'int'}
	]
});

