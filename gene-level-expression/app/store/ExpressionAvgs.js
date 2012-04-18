/**
 * @class CoordView.store.ExpressionAvgs
 * @extends Ext.data.Store
 *
 * This class implements the store for accessions.
 */
Ext.define('CoordView.store.ExpressionAvgs', {
	extend: 'Ext.data.Store',
	model: 'CoordView.model.ExpressionAvg',
	storeId: 'avgStore',
	proxy: {
		type: 'ajax',
		url: '/portal/portal/patric/TranscriptomicsGeneExp/TranscriptomicsGeneExpWindow?action=b&cacheability=PAGE',
		extraParams: {
			storeType: 'dist_avg'
		},
		pageParam: undefined,
		startParam: undefined,
		limitParam: undefined,
		reader: {
			type: 'json',
			root: 'exp_dist_avg'
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
