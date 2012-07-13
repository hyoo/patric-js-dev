/**
 * @class CoordView.store.LogRatios
 * @extends Ext.data.Store
 *
 * This class implements the store for accessions.
 */
Ext.define('CoordView.store.LogRatios', {
	extend: 'Ext.data.Store',
	model: 'CoordView.model.CategoryCount',
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
			me.proxy.extraParams = Ext.Object.merge(me.proxy.extraParams, CoordView.param);
			Ext.get("p-chartlogratio").mask("loading");
		},
		load: function() {
			Ext.get("p-chartlogratio").unmask();
		}
	}
});
