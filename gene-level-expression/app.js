Ext.application({
	name: 'CoordView',
	controllers: ['ViewController'],
	param: {},
	launch: function() {
		
		var param = new Object();
		param.featureId = Ext.getDom('featureId').value;
		param.exp_geneId = Ext.getDom('exp_geneId').value;
		CoordView.param = param;
		
		/*
		 * Creates the main UI.
		*/
		Ext.create('Ext.panel.Panel', {
			renderTo: 'expression_panel',
			//title: 'I Can Has E coli Plz?',
			id: 'p-genomelist-ui',
			layout: 'border',
			minHeight: 600,
			minWidth: 700,
			width: 1000,
			height: 700,
			items: [
				{
					region: 'north',
					border: false,
					height: 35,
					xtype: 'filterpanel'
				},
				{
					region: 'south',
					border: false,
					height: 400,
					xtype: 'featuregrid'
				},
				{
					region: 'center',
					layout: {
						type: 'hbox'
					},
					items: [
						{
							xtype: 'tabpanel',
							width: 500,
							height: 241,
							items: [/*
								{
									title: 'Avg',
									layout: 'fit',
									xtype: 'expavgchart'
								},*/
								{
									title: 'Ratio',
									layout: 'fit',
									xtype: 'expratiochart'
								}
							]
						},
						{
							xtype: 'tabpanel',
							width: 500,
							height: 241,
							items: [
								{
									title: 'Accession',
									layout: 'fit',
									xtype: 'accessionchart'
								}/*,
								{
									title: 'Platform',
									layout: 'fit',
									xtype: 'platformchart'
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
