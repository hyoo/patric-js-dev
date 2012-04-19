/**
 * @class CoordView.store.ExpressionRatios
 * @extends Ext.data.Store
 *
 * This class implements the store for accessions.
 */
Ext.define('CoordView.store.ExpressionRatios', {
	extend: 'Ext.data.Store',
	model: 'CoordView.model.ExpressionRatio',
	storeId: 'avgStore',
	proxy: {
		type: 'ajax',
		url: '/portal/portal/patric/TranscriptomicsGeneExp/TranscriptomicsGeneExpWindow?action=b&cacheability=PAGE',
		extraParams: {
			storeType: 'dist_ratio'
		},
		pageParam: undefined,
		startParam: undefined,
		limitParam: undefined,
		reader: {
			type: 'json',
			root: 'exp_dist_ratio'
		},
		noCache: false
	},
	autoLoad: true,
	listeners: {
		beforeload: function(store, operation, eOpts) {
			store.proxy.extraParams = Ext.Object.merge(store.proxy.extraParams, CoordView.param);
			Ext.get("p-expratiochart").mask("wait");
		},
		load: function() {
			Ext.get("p-expratiochart").unmask();
		}
	}
});
