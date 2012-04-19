Ext.define('CoordView.controller.ViewController', {
	extend: 'Ext.app.Controller',
	id: 'ViewController',
	views: [
		'FeatureGrid',
		'AccessionChart',
		'ExpRatioChart',
		'FilterPanel'
	],
	stores: [
		'Features',
		'Accessions',
		'ExpressionRatios'
	],
	models: [
		'Feature',
		'Accession',
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
		var param = new Object({keyword:'', threshold:'', accession:''});
		CoordView.param = Ext.Object.merge(CoordView.param, param);
		
		// reload
		Ext.getStore('Features').clearFilter();
		Ext.getStore('Features').updateRecordCount();
		Ext.getStore('ExpressionRatios').load();
		Ext.getStore('Accessions').load();
		
	},
	doFilter: function(param) {
		if (param != null) {
			CoordView.param = Ext.Object.merge(CoordView.param, param);
		}
		
		Ext.getStore('Features').filterOnFly(CoordView.param);
		Ext.getStore('ExpressionRatios').load();
		Ext.getStore('Accessions').load();
	}
});
