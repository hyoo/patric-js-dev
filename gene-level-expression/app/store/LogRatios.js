/**
 * @class VBI.GeneExpression.store.LogRatios
 * @extends Ext.data.Store
 *
 * This class implements a store for Log Ratios.
 */
Ext.define('VBI.GeneExpression.store.LogRatios', {
	extend: 'Ext.data.Store',
	model: 'VBI.GeneExpression.model.CategoryCount',
	proxy: {
		type: 'ajax',
		url: '/portal/portal/patric/TranscriptomicsGeneExp/TranscriptomicsGeneExpWindow?action=b&cacheability=PAGE',
		extraParams: {
			storeType: 'log_ratio'
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
		beforeload: function(me, operation, eOpts) {
			me.proxy.extraParams = Ext.Object.merge(me.proxy.extraParams, VBI.GeneExpression.param);
			Ext.get("p-chartlogratio").mask("loading");
		},
		load: function() {
			Ext.get("p-chartlogratio").unmask();
		}
	}
});
