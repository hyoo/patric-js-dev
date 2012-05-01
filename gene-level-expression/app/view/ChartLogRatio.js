/**
 * @class CoordView.view.ExpRatioChart
 * @extends Ext.chart.Chart
 * @xtype chartlogratio
 *
 * This class implements a chart of expression ratio level.
 */
Ext.define('CoordView.view.ChartLogRatio', {
	extend: 'Ext.chart.Chart',
	alias: 'widget.chartlogratio',
	id: 'p-chartlogratio',
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