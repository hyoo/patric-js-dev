/**
 * @class VBI.GeneExpression.view.CategoryBarChart
 * @extends Ext.chart.Chart
 * @xtype categorybarchart
 *
 * This class implements a chart for category-and-count type data.
 * This class will be used for Top5 charts.
 */
Ext.define('VBI.GeneExpression.view.CategoryBarChart', {
	extend: 'Ext.chart.Chart',
	alias: 'widget.categorybarchart',
	axes: [{
		type: 'Numeric',
		position: 'bottom',
		fields: ['count'],
		title: 'Genes',
		minimum: 0,
		majorTickSteps: 1
	}, {
		type: 'Category',
		position: 'left',
		fields: ['category']
	}],
	series: [{
		type: 'bar',
		yField: 'count',
		xField: 'category',
		label: {
			display: 'insideEnd',
			field: 'count',
			contrast: true
		}
	}],
	theme: 'PATRIC'
});
