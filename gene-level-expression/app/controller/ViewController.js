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
		'Accessions',
		'Platforms', 
		'ExpressionAvgs',
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
		console.log('Initialized controller!');
		/*
		this.control({
			'panel > chart > pie': {
				itemmouseup: this.seriesClick
			}
		});
		*/
	},
	
	/**
	 * Handles a chart series click.
	 *
	 * @param {Ext.button.Button} button The button that was pressed.
	 * @param {Object} evtObj The event object.
	*/
	seriesClick: function(chart, obj) {
		console.log('ViewController.seriesClick');
		console.log(arguments);
	}
});
