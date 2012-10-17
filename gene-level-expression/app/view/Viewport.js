/**
 * This defines a PATRIC theme for pie/bar charts.
 */
Ext.chart.theme.PATRIC = Ext.extend(Ext.chart.theme.Base, {
	constructor: function(config) {
		Ext.chart.theme.Base.prototype.constructor.call(this, Ext.apply({
			colors: ['rgb(56, 93, 117)','rgb(109,156,47)','rgb(246, 218, 98)','rgb(147, 181, 208)','rgb(172, 233, 93)','rgb(206, 192, 142)']
		}, config));
	}
});

/**
 * @class VBI.GeneExpression.view.Viewport
 * @extends Ext.panel.Panel
 *
 * This class implements a viewport.
 */
 
Ext.define('VBI.GeneExpression.view.Viewport', {
	extend: 'Ext.panel.Panel', 
	renderTo: 'expression_panel',
	layout: 'border',
	minHeight: 600,
	minWidth: 700,
	width: 967,
	height: 700,
	items: [ {
		region: 'north',
		border: false,
		height: 35,
		xtype: 'filterpanel',
		id: 'p-filterpanel'
	}, {
		region: 'south',
		border: false,
		height: 400,
		xtype: 'featuregrid',
		dockedItems: [{
			xtype: 'toolbar',
			height: 20,
			dock: 'top',
			items: ['->', {
				xtype: 'button',
				
			}]
		}]
	}, {
		region: 'center',
		layout: {
			type: 'hbox'
		},
		items: [
		// bar chart for log ratio & z score
		{
			xtype: 'tabpanel',
			width: 480,
			height: 241,
			items: [{
				xtype: 'chart',
				title: 'Log Ratio',
				id: 'p-chartlogratio',
				store: 'LogRatios',
				theme: 'PATRIC',
				axes: [{
					type: 'Numeric',
					position: 'left',
					fields: ['count'],
					title: 'Comparisons',
					minimum: 0
				}, {
					type: 'Category',
					position: 'bottom',
					fields: ['category'],
					title: 'Log Ratio'
				}],
				series: [{
					type: 'column',
					yField: 'count',
					xField: 'category',
					label: {
						display: 'insideEnd',
						field: 'count',
						contrast: true
					}
				}]
			}, {
				xtype: 'chart',
				title: 'Z-score',
				id: 'p-chartzscore',
				store: 'ZScores',
				theme: 'PATRIC',
				axes: [{
					type: 'Numeric',
					position: 'left',
					fields: ['count'],
					title: 'Comparisons',
					minimum: 0
				}, {
					type: 'Category',
					position: 'bottom',
					fields: ['category'],
					title: 'Z-score'
				}],
				series: [{
					type: 'column',
					yField: 'count',
					xField: 'category',
					label: {
						display: 'insideEnd',
						field: 'count',
						contrast: true
					}
				}]
			}]
		}, 
		// pie/bar chart for meta data
		{
			xtype: 'tabpanel',
			width: 485,
			height: 241,
			items: [{
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
			}, {
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
			}, {
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
					store: 'Conditions'
				},{
					xtype: 'categorybarchart',
					title: 'Top 5',
					iconCls: 'icon-bar-chart',
					id: 'CategoryBarCondition',
					store: 'ConditionsTop5'
				}]
			}]
		}]
	}],
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'top',
		items: [{
			xtype: 'tbtext',
			height: 15,
			text: '',
			id: 'filterReport'
		}]
	}]
});
