Ext.define('CoordView.view.Viewport', {
	extend: 'Ext.panel.Panel', 
	renderTo: 'expression_panel',
	//title: '',
	layout: 'border',
	minHeight: 600,
	minWidth: 700,
	width: 967,
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
					width: 480,
					height: 241,
					items: [
						{
							xtype: 'chart',
							title: 'Log Ratio',
							id: 'p-chartlogratio',
							store: 'LogRatios',
							axes: [
								{
									type: 'Numeric',
									position: 'left',
									fields: ['count'],
									title: 'Samples',
									minimum: 0
								},
								{
									type: 'Category',
									position: 'bottom',
									fields: ['category'],
									title: 'Log Ratio'
								}
							],
							series: [{
									type: 'column',
									yField: 'count',
									xField: 'category',
									label: {
										display: 'insideEnd',
										field: 'count'
									}
								}
							]
						},
						{
							xtype: 'chart',
							title: 'Z-score',
							id: 'p-chartzscore',
							store: 'ZScores',
							axes: [
								{
									type: 'Numeric',
									position: 'left',
									fields: ['count'],
									title: 'Samples',
									minimum: 0
								},
								{
									type: 'Category',
									position: 'bottom',
									fields: ['category'],
									title: 'Z-score'
								}
							],
							series: [{
									type: 'column',
									yField: 'count',
									xField: 'category',
									label: {
										display: 'insideEnd',
										field: 'count'
									}
								}
							]
						}
					]
				},
				{
					xtype: 'tabpanel',
					width: 485,
					height: 241,
					items: [
						{
							xtype: 'tabpanel',
							title: 'Strain',
							tabPosition: 'left',
							bodyBorder: false,
							tabBar: {
								plain: true,
								baseCls: ''
							},
							items:[{
								xtype: 'categorypiechart',
								title: 'All',
								id: 'p-chartstrain',
								store: 'Strains'
							}]
						},
						{
							xtype: 'tabpanel',
							title: 'Mutant',
							tabPosition: 'left',
							bodyBorder: false,
							tabBar: {
								plain: true,
								baseCls: ''
							},
							items: [{
								xtype: 'categorypiechart',
								title: 'All',
								id: 'p-chartmutant',
								store: 'Mutants'
							}]
						},
						{
							xtype: 'tabpanel',
							title: 'Condition',
							tabPosition: 'left',
							bodyBorder: false,
							tabBar: {
								plain: true,
								baseCls: ''
							},
							items: [
								{
									title: 'All',
									xtype: 'categorypiechart',
									id: 'p-chartcondition',
									store: 'Conditions'
								},
								{
									title: 'Top 5',
									xtype: 'categorybarchart',
									id: 'p-barchartcondition',
									store: 'Conditions2'
								}
							]
						}
					]
				}
			]
		}
	],
	dockedItems: [
		{
			xtype: 'toolbar',
			dock: 'top',
			items: [
				{
					xtype: 'tbtext',
					height: 15,
					text: '',
					id: 'filterReport'
				}
			]
		}
	]
});
