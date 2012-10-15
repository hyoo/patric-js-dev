/**
 * @class CoordView.store.Strains
 * @extends Ext.data.Store
 *
 * This class implements the store for accessions.
 */
Ext.define('CoordView.store.Strains', {
	extend: 'Ext.data.Store',
	model: 'CoordView.model.CategoryCount',
	proxy: {
		type: 'ajax',
		url: '/portal/portal/patric/TranscriptomicsGeneExp/TranscriptomicsGeneExpWindow?action=b&cacheability=PAGE',
		extraParams: {
			storeType: 'strain'
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
			Ext.get("CategoryPieStrain").mask("loading");
		},
		load: function(me, records, successful, eOpts) {
			Ext.get("CategoryPieStrain").unmask();
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
				Ext.getStore('StrainsTop5').loadData(data);
				Ext.getStore('StrainsTop5').sort('count', 'ASC');
			}
		}
		
	}
});
