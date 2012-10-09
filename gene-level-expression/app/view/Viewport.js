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
			xtype: 'featuregrid',
			dockedItems: [{
				xtype: 'toolbar',
				height: 20,
				dock: 'top'
			}]
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
							theme: 'Category1',
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
							theme: 'Category2',
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
								iconCls: 'icon-pie-chart',
								id: 'CategoryPieStrain',
								store: 'Strains'
							},{
								xtype: 'categorybarchart',
								title: 'Top 5',
								iconCls: 'icon-bar-chart',
								id: 'CategoryBarStrain',
								store: 'StrainsTop5'
							}]
						},
						{
							xtype: 'tabpanel',
							title: 'Gene Modification',
							tabPosition: 'left',
							bodyBorder: false,
							tabBar: {
								plain: true,
								baseCls: ''
							},
							items: [{
								xtype: 'categorypiechart',
								title: 'All',
								iconCls: 'icon-pie-chart',
								id: 'CategoryPieMutant',
								store: 'Mutants'
							},{
								xtype: 'categorybarchart',
								title: 'Top 5',
								iconCls: 'icon-bar-chart',
								id: 'CategoryBarMutant',
								store: 'MutantsTop5'
							}]
						},
						{
							xtype: 'tabpanel',
							title: 'Experimental Condition',
							tabPosition: 'left',
							bodyBorder: false,
							tabBar: {
								plain: true,
								baseCls: ''
							},
							items: [{
								xtype: 'categorypiechart',
								title: 'All',
								iconCls: 'icon-pie-chart',
								id: 'CategoryPieCondition',
								store: 'Conditions',
								theme: 'Category5'
							},{
								xtype: 'categorybarchart',
								title: 'Top 5',
								iconCls: 'icon-bar-chart',
								id: 'CategoryBarCondition',
								store: 'ConditionsTop5'
							}]
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
