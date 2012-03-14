Ext.define('CoordView.controller.ViewController', {
	extend: 'Ext.app.Controller',
	id: 'ViewController',

	views: [
		'FeatureGrid',
		'AccessionChart',
		'PlatformChart',/*
		'DiseaseChart',
		'GenomeTypeChart',
		'SeqStatusChart',
		'SeqPlatformChart',
		'SizeVsGCChart',
		'IsoSourceChart',
		'PathovarChart',
		'SizeVsCDSChart',*/
		'ExpAvgChart',
		'ExpRatioChart'
	],
	
	stores: [
		'Features',
		'Accessions',
		'Platforms'/*,
		'Diseases',
		'GenomeTypes',
		'SeqStatuses',
		'SeqPlatforms',
		'IsoSources',
		'Pathovars'*/
	],
	
	models: [
		'Feature',
		'Accession',
		'Platform'/*,
		'Disease',
		'GenomeType',
		'SeqStatus',
		'SeqPlatform',
		'IsoSource',
		'Pathovar'*/
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
