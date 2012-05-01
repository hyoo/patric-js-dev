/**
 * @class CoordView.view.ZscoreChart
 * @extends Ext.chart.Chart
 * @xtype expratiochart
 *
 * This class implements a chart of expression ratio level.
 */
Ext.define('CoordView.view.ZscoreChart', {
	extend: 'Ext.chart.Chart',
	alias: 'widget.zscorechart',
	id: 'p-zscorechart',
	store: 'ZScores',
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