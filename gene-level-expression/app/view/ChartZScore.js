/**
 * @class CoordView.view.ZscoreChart
 * @extends Ext.chart.Chart
 * @xtype chartzscore
 *
 * This class implements a chart of expression z score.
 */
Ext.define('CoordView.view.ChartZScore', {
	extend: 'Ext.chart.Chart',
	alias: 'widget.chartzscore',
	id: 'p-chartzscore',
	store: 'ZScores',
	//animate: true,
	axes: [
		{
			type: 'Numeric',
			position: 'left',
			fields: ['count'],
			title: 'Samples',
			majorTickSteps: 1
		},
		{
			type: 'Category',
			position: 'bottom',
			fields: ['category'],
			title: 'Z Score'
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