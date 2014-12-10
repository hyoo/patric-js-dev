/**
 * @class VBI.GeneExpression.store.Mutants
 * @extends Ext.data.Store
 *
 * This class implements a store for one of metadata, Gene Modification.
 */
Ext.define('VBI.GeneExpression.store.Mutants', {
	extend: 'Ext.data.Store',
	model: 'VBI.GeneExpression.model.CategoryCount',
	proxy: {
		type: 'memory',
		reader: {
			type: 'json',
			root: 'mutant'
		}
	},
	autoLoad: false,
	listeners: {
		beforeload: function(me, operation, eOpts) {
			me.proxy.extraParams = Ext.Object.merge(me.proxy.extraParams, VBI.GeneExpression.param);
		},
		datachanged: function(me) {
			// copy top 5 data points (exclude N/A) to Top5 store

			var records = me.data.items;
			var data = new Array();
			for (i=0; i<records.length; i++) {
				if (i < 7) {
					if (records[i].get("category")!="N/A") {
						data[i] = records[i].data;
					}
				}
			}
			data = Ext.Array.splice(Ext.Array.clean(data), 0, 5);
			Ext.getStore('MutantsTop5').loadData(data);
			Ext.getStore('MutantsTop5').sort('count', 'ASC');
		}
	}
});
