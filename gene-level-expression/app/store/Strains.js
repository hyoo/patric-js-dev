/**
 * @class VBI.GeneExpression.store.Strains
 * @extends Ext.data.Store
 *
 * This class implements a store for one of metadata, Strain.
 */
Ext.define('VBI.GeneExpression.store.Strains', {
	extend: 'Ext.data.Store',
	model: 'VBI.GeneExpression.model.CategoryCount',
	proxy: {
		type: 'memory',
		reader: {
			type: 'json',
			root: 'strain'
		}
	},
	listeners: {
		beforeload: function(me, operation, eOpts) {
			me.proxy.extraParams = Ext.Object.merge(me.proxy.extraParams, VBI.GeneExpression.param);
			Ext.get("CategoryPieStrain").mask("loading");
		},
		datachanged: function(me) {
			Ext.get("CategoryPieStrain").unmask();
			
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
			Ext.getStore('StrainsTop5').loadData(data);
			Ext.getStore('StrainsTop5').sort('count', 'ASC');
		}
		
	}
});
