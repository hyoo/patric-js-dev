/**
 * @class CoordView.view.ChartCondition
 * @extends Ext.panel.Panel
 * @xtype barchartcondition
 *
 * This class implements a chart of condition types.
 */
Ext.define('CoordView.view.CategoryBarChart', {
	extend: 'Ext.chart.Chart',
	alias: 'widget.categorybarchart',
	axes: [
		{
			type: 'Numeric',
			position: 'bottom',
			fields: ['count'],
			title: 'Genes',
			minimum: 0,
			majorTickSteps: 1
		},
		{
			type: 'Category',
			position: 'left',
			fields: ['category']
		}
	],
	series: [{
			type: 'bar',
			yField: 'count',
			xField: 'category',
			label: {
				display: 'insideEnd',
				field: 'count',
				contrast: true
			}
		}
	],
	theme: 'PATRIC'
});
