Ext.onReady(function() {
	// create the app
	Ext.application({
		name: 'CoordView',
		appFolder: 'app',
		models: [
			'Genome',
			'Feature'
		],
		controllers: [
			'ViewController'
		],
		launch: function() {
			var featureId = Ext.getDom('featureId').value;
			Ext.getStore('Features').getProxy().extraParams.featureId = featureId;
			Ext.getStore('Accessions').getProxy().extraParams.featureId = featureId;
			Ext.getStore('Platforms').getProxy().extraParams.featureId = featureId;
			Ext.getStore('ExpressionAvgs').getProxy().extraParams.featureId = featureId;
			Ext.getStore('ExpressionRatios').getProxy().extraParams.featureId = featureId;
		
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
						region: 'north',
						border: 0,
						items: [
							{
								xtype: 'filterpanel',
								height: 35
							}
						]
					},
					{
						region: 'south',
						xtype: 'featuregrid',
						height: 400
					},
					{
						region: 'center',
						height: 250,
						border: 0,
						layout: {
							type: 'hbox'
						},
						items: [
							{
								height: 250,
								width: 500,
								layout: 'fit',
								border: 0,
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
							},
							{
								xtype: 'tabpanel',
								width: 500,
								height: 250,
								items: [
									{
										title: 'Accession',
										layout: 'fit',
										xtype: 'accessionchart'
									},
									{
										title: 'Platform',
										layout: 'fit',
										xtype: 'platformchart'
									}
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
							'->',
							{
								xtype: 'tbtext',
								height: 15,
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
