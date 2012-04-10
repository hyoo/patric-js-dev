/**
 * @class CoordView.model.Accession
 * @extends Ext.data.Model
 *
 * This class defines the data model for accession.
 *
 */
Ext.define('CoordView.model.Accession', {
	extend: 'Ext.data.Model',

	idProperty: 'name',

	fields: [
		{name: 'name', type: 'string'},
		{name: 'count', type: 'int'}
	]
});

/**
 * @class CoordView.model.Genome
 * @extends Ext.data.Model
 *
 * This class defines the data model for a genome.
 *
 */
Ext.define('CoordView.model.Feature', {
	extend: 'Ext.data.Model',
	idProperty: 'rownum',
	fields: [
		'exp_accession', 'exp_samples', 'exp_platform', 'exp_name', 'exp_locustag',
		{name:'exp_pavg', type:'float', useNull:true}, {name:'exp_pratio', type:'float', useNull:true}, 'patric_locus_tag', 'figfam_id', 'rownum'
	]
});/**
 * @class CoordView.model.Accession
 * @extends Ext.data.Model
 *
 * This class defines the data model for accession.
 *
 */
Ext.define('CoordView.model.Platform', {
	extend: 'Ext.data.Model',

	idProperty: 'name',

	fields: [
		{name: 'name', type: 'string'},
		{name: 'count', type: 'int'}
	]
});

/**
 * @class CoordView.store.Accessions
 * @extends Ext.data.Store
 *
 * This class implements the store for accessions.
 */
Ext.define('CoordView.store.Accessions', {
	extend: 'Ext.data.Store',
	model: 'CoordView.model.Accession',
	storeId: 'accessionStore',
	proxy: {
		type: 'ajax',
		url: '/portal/portal/patric/TranscriptomicsGeneExp/TranscriptomicsGeneExpWindow?action=b&cacheability=PAGE',
		extraParams: {
			storeType: 'accessions',
			featureId: '',
			figfamId: ''
		},
		pageParam: undefined,
		startParam: undefined,
		limitParam: undefined,
		reader: {
			type: 'json',
			root: 'exp_stat_accession'
		},
		noCache: false
	},
	autoLoad: true,
	pageSize: 500
	/*
	this.load({
		callback: function(records, operation, success) {
			//console.log(records);
		}
	});
	*/
});
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
			featureId: '',
			figfamId: ''
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
			count=Ext.getStore('Features').getCount();
			(count==1) ? countStr=count+' record' : countStr=count+' records';
			Ext.getCmp('filterReport').setText(countStr);
		},
		single: true
	}
});
/**
 * @class CoordView.store.Platforms
 * @extends Ext.data.Store
 *
 * This class implements the store for platforms.
 */
Ext.define('CoordView.store.Platforms', {
	extend: 'Ext.data.Store',
	model: 'CoordView.model.Platform',
	storeId: 'platformStore',
	proxy: {
		type: 'ajax',
		url: '/portal/portal/patric/TranscriptomicsGeneExp/TranscriptomicsGeneExpWindow?action=b&cacheability=PAGE',
		extraParams: {
			storeType: 'platforms',
			featureId: '',
			figfamId: ''
		},
		pageParam: undefined,
		startParam: undefined,
		limitParam: undefined,
		reader: {
			type: 'json',
			root: 'exp_stat_platform'
		},
		noCache: false
	},
	autoLoad: true,
	pageSize: 500
});
/**
 * @class CoordView.view.AccessionChart
 * @extends Ext.panel.Panel
 * @xtype accessionchart
 *
 * This class implements a chart of genome types.
 */
Ext.define('CoordView.view.AccessionChart', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.accessionchart',
	id: 'p-accessionchart',
	items: [{
		xtype: 'chart',
		store: 'Accessions',
		theme: 'Base',
		animate: true,
		series: [{
			type: 'pie',
			field: 'count',
			highlight: {
				segment: {
					margin:10
				}
			},
			donut: 6,
			label: {
				field: 'name',
				display: 'rotate',
				contrast: true,
				font: '11px Arial',
				renderer:function(val){
					return Ext.String.ellipsis(val, 30, true);
				}
			},
			listeners: {
				'itemmouseup': function(item, obj){
					//console.log('heard it!');
					console.log(item.storeItem.getId());
					CoordView.filter('exp_accession', item.storeItem.getId());
					return true;
				}
			}
		}]
	}]
});
/**
 * @class CoordView.view.ExpAvgChart
 * @extends Ext.panel.Panel
 * @xtype expavgchart
 *
 * This class implements a chart of expression avg level.
 */
Ext.define('CoordView.view.ExpAvgChart', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.expavgchart',
	id: 'p-expavgchart',
	items: [{
		xtype: 'chart',
		store: 'Features',
		id: 'expavgchart',
		axes: [
			{
				type: 'Numeric',
				position: 'left',
				fields: ['exp_pavg'],
				title: 'Expression Level',
				minimum: -5
			},
			{
				type: 'Numeric',
				position: 'bottom',
				fields: ['rownum'],
				title: 'Samples',
				minimum: 0
			}/*
			{
				type: 'Category',
				position: 'bottom',
				fields: ['exp_samples'],
				title: 'Samples',
				minimum: 0
			}*/
		],
		series: [{
				type: 'scatter',
				markerConfig: {
					radius: 2,
					size: 2
				},
				axis: 'left',
				yField: 'exp_pavg',
				xField: 'rownum'
			}
		],
		listeners: {
			refresh: function(chart, eOpts) {
				chart.surface.removeAll();
				chart.redraw();
			}
		}
	}]
});/**
 * @class CoordView.view.ExpRatioChart
 * @extends Ext.panel.Panel
 * @xtype expratiochart
 *
 * This class implements a chart of expression ratio level.
 */
Ext.define('CoordView.view.ExpRatioChart', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.expratiochart',
	id: 'p-expratiochart',
	items: [{
		xtype: 'chart',
		store: 'Features',
		axes: [
			{
				type: 'Numeric',
				position: 'left',
				fields: ['exp_pratio'],
				title: 'Expression Ratio',
				minimum: -3
			},
			{
				type: 'Numeric',
				position: 'bottom',
				fields: ['rownum'],
				title: 'Samples',
				minimum: 0
			}
		],
		series: [
			{
				type: 'scatter',
				markerConfig: {
					radius: 2,
					size: 2
				},
				axis: 'left',
				yField: 'exp_pratio',
				xField: 'rownum'
			}
		]
	}]
});
/**
 * @class CoordView.view.PlatformChart
 * @extends Ext.panel.Panel
 * @xtype platformchart
 *
 * This class implements a chart of platform types.
 */
Ext.define('CoordView.view.PlatformChart', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.platformchart',
	id: 'p-platformchart',
	items: [{
		xtype: 'chart',
		store: 'Platforms',
		theme: 'Base',
		animate: true,
		series: [{
			type: 'pie',
			field: 'count',
			highlight: {
				segment: {
					margin:10
				}
			},
			donut: 6,
			label: {
				field: 'name',
				display: 'rotate',
				contrast: true,
				font: '11px Arial',
				renderer:function(val){
					return Ext.String.ellipsis(val, 30, true);
				}
			},
			listeners: {
				'itemmouseup': function(item, obj){
					//console.log('heard it!');
					console.log(item.storeItem.getId());
					CoordView.filter('exp_platform', item.storeItem.getId());
					return true;
				}
			}
		}]
	}]
});
/**
 * @class CoordView.view.GenomeGrid
 * @extends Ext.grid.Panel
 * @xtype genomegrid
 *
 * This class implements a grid of players.
 */
Ext.define('CoordView.view.FeatureGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.featuregrid',
	id: 'p-featuregrid',
	
	store: 'Features',
	
	/*
	requires: [
		'Ext.grid.PagingScroller'
	], 
	*/
	autoScroll: true, 
	
	/*
	verticalScrollerType: 'paginggridscroller', 
	invalidateScrollerOnRefresh: false, 
	//disableSelection: true, 
	*/
	
	columns: [
		{dataIndex: 'rownum',			header: 'ID',			flex: 1},
		{dataIndex: 'exp_accession',	header: 'Accession',	flex: 1},
		{dataIndex: 'exp_samples',		header: 'Samples',		flex: 1},
		{dataIndex: 'exp_platform',		header: 'Platform',		flex: 1},
		{dataIndex: 'exp_name',			header: 'Condition',	flex: 3},
		{dataIndex: 'exp_locustag',		header: 'Locus Tag',	flex: 1},
		{dataIndex: 'exp_pavg',			header: 'Avg',			flex: 1},
		{dataIndex: 'exp_pratio',		header: 'Ratio',		flex: 1}
	],
	
	/**
		* Renders hyperlinked PATRIC genomes. Returns the empty 
		* string if no value is supplied. Returns the value unformatted if no valid 
		* record is supplied.
		*
		* See {@link Ext.grid.column.Column.renderer} for full details about 
		* column renderer functions.
		*
		* @param {String} value The value to be formatted.
		* @param {Object} metaData A collection of metadata about the current cell.
		* @param {Ext.Data.Record} record The record that supplies the value.
		* @return {String} The formatted string.
	*/
	renderGenome: function(value, metaData, record){
		// handle the breaking cases
		if (typeof value == 'undefined') 
			return '';
		if (typeof record == 'undefined' || 
				!record.hasOwnProperty('data') || 
				!record.data.hasOwnProperty('genome_info_id') || 
				record.data.cId == '') 
			return value;
		
		if (value==null || value == '') 
			return Ext.String.format('<a href="Genome?cType=genome&cId={0}">cid:{0}</a>', record.data.genome_info_id);
		else 
			return Ext.String.format('<a href="Genome?cType=genome&cId={0}">{1}</a>', record.data.cId, value);
	}
});
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
Ext.onReady(function() {
	//console.log('Ext ready!');
	// create the app
	Ext.application({
		
		name: 'CoordView',
		appFolder: 'app',
		models: [
			'Genome',
			'Feature'/*,
			'Disease',
			'GenomeType',
			'SeqStatus',
			'SeqPlatform',
			'IsoSource',
			'Pathovar'*/
		],
		controllers: [
			'ViewController'
		],
		
		launch: function() {
			
			console.log('launched app!');
			
			/*
			Ext.chart.theme.CatTheme = Ext.extend(Object, {
				constructor: function(config) {
					Ext.chart.theme.call(this, config, {
						baseColor: '#FF883B'
					});
				}
			});
			*/
			var featureId = Ext.getDom('featureId').value;
			//console.log("featureId="+featureId);
			Ext.getStore('Features').getProxy().extraParams.featureId = featureId;
			Ext.getStore('Accessions').getProxy().extraParams.featureId = featureId;
			Ext.getStore('Platforms').getProxy().extraParams.featureId = featureId;
		
			CoordView.filterCall=null;
		
			CoordView.filter=function(field, value, re){
			//console.log(newValue);
				
				var store=Ext.getStore('Features');
				//store.suspendEvents();
				store.clearFilter();
				//store.resumeEvents();
				
				var countStr='';
				var count=0;
				if (value=='' || value==null || value=='Filter') {
					store.filter();
					count=Ext.getStore('Features').getCount();
					(count==1) ? countStr=count+' record' : countStr=count+' records';
					Ext.getCmp('filterReport').setText(countStr);
				} else {
					(re) ? store.filter(field, new RegExp(value, 'gi')) : store.filter(field, value);
					count=Ext.getStore('Features').getCount();
					(count==1) ? countStr=count+' record matches' : countStr=count+' records match';
					var valueStr='<i>'+value+'</i>';
					if (field!='indx_str') {
						//valueStr=field.replace('_', ' ')+' '+valueStr;
						Ext.getCmp('filterTextField').reset();
					}
					Ext.getCmp('filterReport').setText(countStr+' '+valueStr);
				}
			};
			
			/*
			 * Creates the main UI.
			*/
			//Ext.create('Ext.window.Window', {
			Ext.create('Ext.panel.Panel', {
				renderTo: 'expression_panel',
				//title: 'I Can Has E coli Plz?',
				id: 'p-genomelist-ui',
				layout: 'border',
				minHeight: 600,
				minWidth: 700,
				width: 1000,
				height: 700,
				maximizable: true,
				minimizable: false,
				closable: false,
				items: [
					{
						region: 'center',
						layout: 'border',
						items: [
							{
								region: 'center',
								xtype: 'featuregrid'
							},
							{
								region: 'south',
								height: 250,
								layout: 'fit',
								items: [
									{
										xtype: 'tabpanel',
										items: [
											{
												title: 'Avg',
												layout: 'fit',
												xtype: 'expavgchart'
											},
											{
												title: 'Ratio',
												layout: 'fit',
												xtype: 'expratiochart'
											}
										]
									}
								]
							}
						]
					},
					{
						region: 'east',
						width: 320,
						layout: {
							type: 'vbox',
							align: 'center'
						},
						items: [
							{
								xtype: 'tabpanel',
								width: 320,
								flex: 1,
								items: [
									{
										title: 'Accession',
										layout: 'fit',
										xtype: 'accessionchart'
									}/*,
									{
										title: 'Platform',
										layout: 'fit',
										xtype: 'seqplatformchart'
									}*/
								]
							},
							{
								xtype: 'tabpanel',
								width: 320,
								flex: 1,
								items: [
									{
										title: 'Platform',
										layout: 'fit',
										xtype: 'platformchart'
									}/*
									{
										title: 'Disease',
										layout: 'fit',
										xtype: 'diseasechart'
									},
									{
										title: 'Pathovar',
										layout: 'fit',
										xtype: 'pathovarchart'
									},
									{
										title: 'Isolation Source',
										layout: 'fit',
										xtype: 'isosourcechart'
									}*/
								]
							}
						]
					}
				],
				dockedItems: [
					{
						xtype: 'toolbar',
						dock: 'bottom',
						items: [
							{
								xtype: 'textfield',
								name: 'filterField',
								id: 'filterTextField',
								itemId: 'filterText',
								width: 125,
								hideLabel: true,
								allowBlank: true,
								value: '',
								emptyText: 'Filter',
								scope: this,
								listeners: {
									
									specialkey: function(field, e){
										// e.HOME, e.END, e.PAGE_UP, e.PAGE_DOWN,
										// e.TAB, e.ESC, arrow keys: e.LEFT, e.RIGHT, e.UP, e.DOWN
										if (e.getKey() == e.ENTER) {
											clearTimeout(CoordView.filterCall);
											CoordView.filterCall=null;
											var val=field.getValue();
											CoordView.filter('exp_name', val, true);
										}
									}/*,
									change: function(field, newValue, oldValue, options){
										if (newValue!=oldValue) {
											clearTimeout(CoordView.filterCall);
											CoordView.filterCall=null;
											CoordView.filterCall=setTimeout(
												"CoordView.filter('exp_name', '"+newValue+"', true)", 
												200
											);
										}
									}
									*/
								}
							},
							'->',
							{
								xtype: 'tbtext',
								text: '',
								id: 'filterReport'
							}
						]
					}
				]
			}).show();
		}
	});	
});
