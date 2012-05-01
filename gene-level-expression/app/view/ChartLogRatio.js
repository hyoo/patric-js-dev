/**
 * @class CoordView.view.ExpRatioChart
 * @extends Ext.chart.Chart
 * @xtype expratiochart
 *
 * This class implements a chart of expression ratio level.
 */
Ext.define('CoordView.view.ChartLogRatio', {
	extend: 'Ext.chart.Chart',
	alias: 'widget.expratiochart',
	id: 'p-expratiochart',
	store: 'LogRatios',
	//animate: true,
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
			fields: ['category'],
			title: 'Range'
		}
	],
	series: [{
			type: 'bar',
			column: true,
			yField: ['count'],
			xField: 'category',
			label: {
				display: 'insideEnd',
				field: 'count'
			}
		}
	]
});