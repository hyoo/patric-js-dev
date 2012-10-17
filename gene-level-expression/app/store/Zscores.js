/**
 * @class VBI.GeneExpression.store.ZScores
 * @extends Ext.data.Store
 *
 * This class implements a store for Z score.
 */
Ext.define('VBI.GeneExpression.store.ZScores', {
	extend: 'Ext.data.Store',
	model: 'VBI.GeneExpression.model.CategoryCount',
	proxy: {
		type: 'ajax',
		url: '/portal/portal/patric/TranscriptomicsGeneExp/TranscriptomicsGeneExpWindow?action=b&cacheability=PAGE',
		extraParams: {
			storeType: 'z_score'
		},
		pageParam: undefined,
		startParam: undefined,
		limitParam: undefined,
		reader: {
			type: 'json',
			root: 'exp_stat'
		},
		noCache: false
	},
	autoLoad: true,
	listeners: {
		beforeload: function(store, operation, eOpts) {
			store.proxy.extraParams = Ext.Object.merge(store.proxy.extraParams, VBI.GeneExpression.param);
		}
	}
});
