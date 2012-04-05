/**
 * @class CoordView.store.Accessions
 * @extends Ext.data.Store
 *
 * This class implements the store for accessions.
 */
Ext.define('CoordView.store.Accessions', {
	extend: 'Ext.data.Store',
	model: 'CoordView.model.Accession',
	storeId: 'accessionStore',
	proxy: {
		type: 'ajax',
		url: '/portal/portal/patric/TranscriptomicsGeneExp/TranscriptomicsGeneExpWindow?action=b&cacheability=PAGE',
		extraParams: {
			featureId: '',
			figfamId: ''
		},
		reader: {
			type: 'json',
			root: 'exp_stat_accession'
		},
		noCache: false
	},
	autoLoad: true,
	pageSize: 500
	/*
	this.load({
		callback: function(records, operation, success) {
			//console.log(records);
		}
	});
	*/
});
