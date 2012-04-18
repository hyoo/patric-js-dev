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
			storeType: 'accessions'
		},
		pageParam: undefined,
		startParam: undefined,
		limitParam: undefined,
		reader: {
			type: 'json',
			root: 'exp_stat_accession'
		},
		noCache: false
	},
	autoLoad: true,
	pageSize: 500,
	listeners: {
		beforeload: function(store, operation, eOpts) {
			store.proxy.extraParams = Ext.Object.merge(store.proxy.extraParams, CoordView.param);
		}
	}
});
