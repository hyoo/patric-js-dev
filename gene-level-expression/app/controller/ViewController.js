Ext.define('CoordView.controller.ViewController', {
	extend: 'Ext.app.Controller',
	id: 'ViewController',
	views: [
		'FeatureGrid',
		'AccessionChart',
		'PlatformChart',
		'ExpAvgChart',
		'ExpRatioChart',
		'FilterPanel'
	],
	stores: [
		'Features',
		'Accessions',/*
		'Platforms', 
		'ExpressionAvgs',*/
		'ExpressionRatios'
	],
	models: [
		'Feature',
		'Accession',
		'Platform',
		'ExpressionAvg',
		'ExpressionRatio'
	],
	init: function() {
		this.control({
			'filterpanel button': {
				reset: this.resetFilter,
				filter: this.doFilter
			},
			'accessionchart': {
				filter: this.doFilter
			}
		})
	},
	resetFilter: function() {
		//console.log("reset Filter");
		var param = new Object({keyword:'', threshold:'', accession:''});
		CoordView.param = Ext.Object.merge(CoordView.param, param);
		//CoordView.param = new Object();
				
		// reload
		Ext.getStore('Features').clearFilter();
		Ext.getStore('Features').updateRecordCount();
		Ext.getStore('ExpressionRatios').load();
		Ext.getStore('Accessions').load();
		
	},
	doFilter: function(param) {
		//console.log(param);
		CoordView.param = Ext.Object.merge(CoordView.param, param);
				
		Ext.getStore('Features').filterOnFly(CoordView.param);
		Ext.getStore('ExpressionRatios').load();
		Ext.getStore('Accessions').load();
	}
});
