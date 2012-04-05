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
			featureId: '',
			figfamId: ''
		},
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
			count=Ext.getStore('Features').getCount();
			(count==1) ? countStr=count+' record' : countStr=count+' records';
			Ext.getCmp('filterReport').setText(countStr);
		},
		single: true
	}
});
