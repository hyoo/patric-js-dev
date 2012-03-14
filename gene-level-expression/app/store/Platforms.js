/**
 * @class CoordView.store.GenomeTypes
 * @extends Ext.data.Store
 *
 * This class implements the store for genome types.
 */
Ext.define('CoordView.store.Platforms', {
	extend: 'Ext.data.Store',
	model: 'CoordView.model.Platform',
  
	storeId: 'platformStore',
	
	proxy: {
		type: 'ajax',
		url: '/portal/portal/patric/TranscriptomicsGeneExp/TranscriptomicsGeneExpWindow?action=b&cacheability=PAGE',
		reader: {
			type: 'json',
			root: 'exp_stat_platform'
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
