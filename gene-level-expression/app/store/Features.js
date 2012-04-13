/**
 * @class CoordView.store.Features
 * @extends Ext.data.Store
 *
 * This class implements the store for features.
 */
Ext.define('CoordView.store.Features', {
	extend: 'Ext.data.Store',
	model: 'CoordView.model.Feature',
	storeId: 'featureStore',
	proxy: {
		type: 'ajax',
		url: '/portal/portal/patric/TranscriptomicsGeneExp/TranscriptomicsGeneExpWindow?action=b&cacheability=PAGE',
		extraParams: {
			storeType: 'features',
			featureId: ''
		},
		pageParam: undefined,
		startParam: undefined,
		limitParam: undefined,
		reader: {
			type: 'json',
			root: 'results'
		},
		noCache: false
	},
	autoLoad: true,
	pageSize: 50,
	listeners: {
		load: function(){
			this.updateRecordCount();
		},
		single: true
	},
	updateRecordCount: function() {
		count=Ext.getStore('Features').getCount();
		(count==1) ? countStr=count+' record' : countStr=count+' records';
		Ext.getCmp('filterReport').setText(countStr);
	},
	filterByRatio: function(threshold) {
		//console.log("threshold:"+threshold);
		this.clearFilter();
		this.filter([
			Ext.create('Ext.util.Filter', {
				filterFn: function(item) {
					//console.log(item);
					//console.log(item.get("exp_pratio"));
					if (item.get("exp_pratio")>=threshold || item.get("exp_pratio")<=(-1)*threshold) {
						return true;
					} else {
						return false;
					}
				}
			})
		]);
		this.updateRecordCount();
	}
});
