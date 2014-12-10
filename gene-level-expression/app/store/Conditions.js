/**
 * @class VBI.GeneExpression.store.Conditions
 * @extends Ext.data.Store
 *
 * This class implements a store for one of metadata, Experimental Condition.
 */
Ext.define('VBI.GeneExpression.store.Conditions', {
	extend: 'Ext.data.Store',
	model: 'VBI.GeneExpression.model.CategoryCount',
	proxy: {
		type: 'memory',
		reader: {
			type: 'json',
			root: 'condition'
		}
	},
	listeners: {
		beforeload: function(me, operation, eOpts) {
			me.proxy.extraParams = Ext.Object.merge(me.proxy.extraParams, VBI.GeneExpression.param);
		},
		datachanged: function(me) {
			// copy top 5 data points (exclude N/A) to ConditionsTop5 store
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
			Ext.getStore('ConditionsTop5').loadData(data);
			Ext.getStore('ConditionsTop5').sort('count', 'ASC');
		}
	}
});