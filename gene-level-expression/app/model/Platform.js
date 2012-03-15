/**
 * @class CoordView.model.Accession
 * @extends Ext.data.Model
 *
 * This class defines the data model for accession.
 *
 */
Ext.define('CoordView.model.Platform', {
	extend: 'Ext.data.Model',

	idProperty: 'name',

	fields: [
		{name: 'name', type: 'string'},
		{name: 'count', type: 'int'}
	]
});

