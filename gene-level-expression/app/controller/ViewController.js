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
	]
});
