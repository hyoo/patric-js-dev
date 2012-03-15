

Ext.onReady(function() {

	//console.log('Ext ready!');

	// create the app
	Ext.application({
		
		name: 'CoordView',
		
		appFolder: 'app',
		
		models: [
			'Genome',
			'Feature',
			'Disease',
			'GenomeType',
			'SeqStatus',
			'SeqPlatform',
			'IsoSource',
			'Pathovar'
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
			Ext.create('Ext.window.Window', {
				title: 'I Can Has E coli Plz?',
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



