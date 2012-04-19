/**
 * @class CoordView.view.ExpRatioChart
 * @extends Ext.chart.Chart
 * @xtype expratiochart
 *
 * This class implements a chart of expression ratio level.
 */
 Ext.define('CoordView.view.ExpRatioChart', {
 	extend: 'Ext.chart.Chart',
 	alias: 'widget.expratiochart',
 	id: 'p-expratiochart',
	store: 'ExpressionRatios',
	axes: [
		{
			type: 'Numeric',
			position: 'left',
			fields: ['count'],
			title: 'Records',
			majorTickSteps: 1
		},
		{
			type: 'Category',
			position: 'bottom',
			fields: ['range'],
			title: 'Range'
		}
	],
	series: [{
			type: 'bar',
			column: true,
			yField: ['count'],
			xField: 'range',
			label: {
				display: 'insideEnd',
				field: 'count'
			}
		}
	]
 });