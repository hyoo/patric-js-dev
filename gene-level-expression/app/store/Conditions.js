/**
 * @class CoordView.store.Conditions
 * @extends Ext.data.Store
 *
 * This class implements the store for accessions.
 */
Ext.define('CoordView.store.Conditions', {
	extend: 'Ext.data.Store',
	model: 'CoordView.model.CategoryCount',
	proxy: {
		type: 'ajax',
		url: '/portal/portal/patric/TranscriptomicsGeneExp/TranscriptomicsGeneExpWindow?action=b&cacheability=PAGE',
		extraParams: {
			storeType: 'condition'
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
		},
		load: function(me, records, successful, eOpts) {
			if (successful) {
				var data = new Array();
				for (i=0; i<records.length; i++) {
					if (records[i].get("rownum") < 7) {
						if (records[i].get("category")!="N/A") {
							data[i] = records[i].data;
						}
					}
				}
				data = Ext.Array.splice(Ext.Array.clean(data), 0, 5);
				//console.log("loading to top5 store:", data);
				Ext.getStore('ConditionsTop5').loadData(data);
				Ext.getStore('ConditionsTop5').sort('count', 'ASC');
			}
		}
	}
});