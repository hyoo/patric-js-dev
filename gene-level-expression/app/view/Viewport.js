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
							title: 'Log Ratio',
							layout: 'fit',
							xtype: 'chartlogratio'
						},
						{
							title: 'Z Score',
							layout: 'fit',
							xtype: 'chartzscore'
						}
					]
				},
				{
					xtype: 'tabpanel',
					width: 485,
					height: 241,
					items: [
						{
							title: 'Strain',
							layout: 'fit',
							xtype: 'chartstrain'
						},
						{
							title: 'Mutant',
							layout: 'fit',
							xtype: 'chartmutant'
						},
						{
							title: 'Condition',
							layout: 'fit',
							xtype: 'chartcondition'
						},
						{
							title: 'Condition-Bar',
							layout: 'fit',
							xtype: 'barchartcondition'
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
});
