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
			storeType: 'dist_ratio',
			featureId: ''
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
	pageSize: 500
	/*
	this.load({
		callback: function(records, operation, success) {
			//console.log(records);
		}
	});
	*/
});
